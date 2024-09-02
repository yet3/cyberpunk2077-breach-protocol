import type { IPrngCtx } from "@contexts/PrngCtx";
import type { IBreachConfigParsed } from "@typings/Breach.types";
import {
  type IMatrixCode,
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import { randomString } from "./randomString.lib";

export const isNodeACode = (node: Node | EventTarget): boolean =>
  node instanceof HTMLLIElement && node.classList.contains("matrix__code");

export const isCodeSelectable = (
  sel: IMatrixSelection,
  code: IMatrixCode,
): boolean => {
  if (sel.direction === MatrixSelectionDirection.ROW) {
    return sel.value === code.row;
  }
  return sel.value === code.col;
};

export const makeCodeId = (code: string, idx: number) =>
  `${code}${idx}${randomString(4)}`;

export const swapSelectionDirection = (
  direction: MatrixSelectionDirection,
): MatrixSelectionDirection =>
  direction === MatrixSelectionDirection.ROW
    ? MatrixSelectionDirection.COL
    : MatrixSelectionDirection.ROW;

type IGenerateMatrixResult =
  | {
      error: string;
    }
  | {
      data: {
        matrix: IMatrixCode[];
        selection: IMatrixSelection;
      };
    };

export const generateEmptyMatrix = (config: IBreachConfigParsed) => {
  return Array.from(
    Array(config.matrixCols * config.matrixRows),
    (_, idx): IMatrixCode => {
      return {
        id: makeCodeId("empty", idx),
        code: "",
        row: Math.floor(idx / config.matrixCols),
        col: idx % config.matrixCols,
      };
    },
  );
};

export const generateMatrix = (
  prng: IPrngCtx,
  config: IBreachConfigParsed,
  solvedCodes: string[],
): IGenerateMatrixResult => {
  const matrix: IMatrixCode[] = Array.from(
    Array(config.matrixCols * config.matrixRows),
    (_, idx): IMatrixCode => {
      const code = prng.randomMatrixCode();
      return {
        id: makeCodeId(code, idx),
        code: code,
        row: Math.floor(idx / config.matrixCols),
        col: idx % config.matrixCols,
      };
    },
  );

  let initDirection: MatrixSelectionDirection = MatrixSelectionDirection.COL;
  const usedIdxs: number[] = [];

  const generateSolvedPath = () => {
    initDirection =
      prng.randomFloat() > 0.5
        ? MatrixSelectionDirection.ROW
        : MatrixSelectionDirection.COL;
    let direction = initDirection;
    let col = 0;
    let row = 0;

    for (const code of solvedCodes) {
      let idx = -1;
      let tries = 0;

      // TODO: handle the bad case
      while (idx < 0 || (usedIdxs.includes(idx) && tries < 10)) {
        if (direction === MatrixSelectionDirection.ROW) {
          col = prng.randomInt({ min: 0, max: config.matrixCols - 1 });
        } else {
          row = prng.randomInt({ min: 0, max: config.matrixRows - 1 });
        }
        idx = row * config.matrixCols + col;

        tries++;
      }

      usedIdxs.push(idx);
      matrix[idx] = { ...matrix[idx], code: code };

      direction = swapSelectionDirection(direction);
    }
  };

  generateSolvedPath();

  return {
    data: { matrix, selection: { direction: initDirection, value: 0 } },
  };
};
