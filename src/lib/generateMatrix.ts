import type { IPrng } from "@stores/prng.slice";
import type { IBreachConfigParsed } from "@typings/Breach.types";
import {
  type IMatrixCode,
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import { getColRowFromIdx, makeCodeId, swapSelectionDirection } from "./matrix";

type IGenerateMatrixOpts = {
  prng: IPrng;
  config: IBreachConfigParsed;
};

type IGenerateMatrixResult = {
  matrix: IMatrixCode[];
  selection: IMatrixSelection;
  solution: IMatrixCode[];
};

export const generateMatrix = ({
  prng,
  config,
}: IGenerateMatrixOpts): IGenerateMatrixResult => {
  const matrix: IMatrixCode[] = Array.from(
    Array(config.matrixCols * config.matrixRows),
    (_, idx): IMatrixCode => {
      const code = prng.randomMatrixCode();
      return {
        ...getColRowFromIdx(idx, config),
        id: makeCodeId(code, idx),
        code: code,
      };
    },
  );

  const initDirection: MatrixSelectionDirection =
    prng.randomFloat() > 0.5
      ? MatrixSelectionDirection.COL
      : MatrixSelectionDirection.ROW;

  const usedIdxs: Set<number> = new Set([]);
  const solution: IMatrixCode[] = [];

  let row = 0;
  let col = 0;
  let backtrackedAmt = 0;
  let direction: MatrixSelectionDirection = initDirection;

  const currentPath: number[] = [];
  let bestPath: number[] = [];

  interface IBlockedIdx {
    step: number;
    idx: number;
    dir: MatrixSelectionDirection;
  }
  const blockedIdxs: IBlockedIdx[] = [];

  const clearBlockedIdxs = () => {
    for (const [i, block] of blockedIdxs.entries()) {
      if (block.step > currentPath.length) {
        blockedIdxs.splice(i, 1);
      }
    }
  };

  const blockIdx = (blocked: IBlockedIdx) => {
    if (
      !blockedIdxs.find(
        (e) =>
          e.idx === blocked.idx &&
          e.dir === blocked.dir &&
          e.step === blocked.step,
      )
    ) {
      blockedIdxs.push(blocked);
    }
  };

  const isIdxFree = (idx: number): boolean => {
    return (
      !usedIdxs.has(idx) &&
      !blockedIdxs.find((e) => e.idx === idx && e.dir === direction)
    );
  };

  const pickIdx = (freeIdxs: number[]) => {
    const idx = freeIdxs[prng.randomInt({ min: 0, max: freeIdxs.length - 1 })];

    usedIdxs.add(idx);
    currentPath.push(idx);

    const coord = getColRowFromIdx(idx, config);
    col = coord.col;
    row = coord.row;

    if (currentPath.length > bestPath.length) {
      bestPath = [...currentPath];
    }

    if (currentPath.length < config.solutionSize) {
      direction = swapSelectionDirection(direction);
    }
  };

  const backtrackStep = () => {
    backtrackedAmt++;

    const idx = currentPath.pop();
    if (idx == null) return;

    usedIdxs.delete(idx);
    blockIdx({
      idx,
      step: currentPath.length,
      dir: swapSelectionDirection(direction),
    });

    const coord = getColRowFromIdx(idx, config);
    col = coord.col;
    row = coord.row;

    direction = swapSelectionDirection(direction);
  };

  while (currentPath.length < config.solutionSize && backtrackedAmt < 1000) {
    clearBlockedIdxs();

    const freeIdxs: number[] = [];
    if (direction === MatrixSelectionDirection.COL) {
      for (let i = 0; i < config.matrixRows; i++) {
        const cellIdx = i * config.matrixCols + col;
        if (isIdxFree(cellIdx)) freeIdxs.push(cellIdx);
      }
    } else {
      for (let i = 0; i < config.matrixCols; i++) {
        const cellIdx = row * config.matrixCols + i;
        if (isIdxFree(cellIdx)) freeIdxs.push(cellIdx);
      }
    }

    if (freeIdxs.length > 0) {
      pickIdx(freeIdxs);
    } else {
      backtrackStep();
    }
  }

  for (const [_, pathIdx] of bestPath.entries()) {
    const code = {
      ...matrix[pathIdx],
      code: prng.randomMatrixCode(),
    };
    matrix[pathIdx] = code;
    solution.push(code);
  }

  return {
    matrix,
    solution,
    selection: { direction: initDirection, value: 0 },
  };
};
