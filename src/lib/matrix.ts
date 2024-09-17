import type { IBreachConfigParsed } from "@typings/Breach.types";
import {
  type IMatrixCode,
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import { randomString } from "./randomString";

export const isNodeACode = (node: Node | EventTarget): boolean => {
  return (
    node instanceof HTMLLIElement && node.classList.contains("matrix__code")
  );
};

export const isCodeSelectable = (
  sel: IMatrixSelection,
  code: IMatrixCode,
): boolean => {
  if (sel.direction === MatrixSelectionDirection.ROW) {
    return sel.value === code.row;
  }
  return sel.value === code.col;
};

export const makeCodeId = (code: string, idx: number) => {
  return `${code}${idx}${randomString(4)}`;
};

export const getColRowFromIdx = (idx: number, config: IBreachConfigParsed) => {
  return {
    col: idx % config.matrixCols,
    row: Math.floor(idx / config.matrixCols),
  };
};

export const swapSelectionDirection = (
  direction: MatrixSelectionDirection,
): MatrixSelectionDirection => {
  return direction === MatrixSelectionDirection.ROW
    ? MatrixSelectionDirection.COL
    : MatrixSelectionDirection.ROW;
};
