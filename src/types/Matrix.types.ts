export interface IMatrixCode {
  id: string;
  code: string;
  row: number;
  col: number;
}

export enum MatrixSelectionDirection {
  ROW = "ROW",
  COL = "COL",
}

export interface IMatrixSelection {
  direction: MatrixSelectionDirection;
  value: number;
}
