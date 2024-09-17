import { swapSelectionDirection } from "@lib";
import {
  type IMatrixCode,
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import type { TStoreSlice } from "./root.store";

interface IMatrixState {
  matrixSelection: IMatrixSelection;
  matrixSolution: IMatrixCode[];
  matrixCodes: IMatrixCode[];
}

interface IMatrixActions {
  setSelectionToCode: (code: IMatrixCode) => void;
  resetMatrix: () => void;
}

export type IMatrixSlice = IMatrixState & IMatrixActions;

const initialState: IMatrixState = {
  matrixCodes: [],
  matrixSelection: { direction: MatrixSelectionDirection.ROW, value: 0 },
  matrixSolution: [],
};

export const createMatrixSlice: TStoreSlice<IMatrixSlice> = (set, get) => ({
  ...initialState,
  resetMatrix: () => set(initialState),

  setSelectionToCode: (code) => {
    set((s) => {
      const prevDirection = s.matrixSelection.direction;
      s.matrixSelection.direction = swapSelectionDirection(prevDirection);
      s.matrixSelection.value =
        prevDirection === MatrixSelectionDirection.COL ? code.row : code.col;
    });
  },
});
