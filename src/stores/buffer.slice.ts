import type { IMatrixCode } from "@typings/Matrix.types";
import type { IRootStore, TStoreSlice } from "./root.store";

interface IBufferState {
  hoveredCode: IMatrixCode | null;
  selectedCodes: IMatrixCode[];
}

interface IBufferActions {
  addCodeToBuffer: (code: IMatrixCode) => void;
  resetBuffer: () => void;
  setHoveredCode: (id: string, code: IMatrixCode | null) => void;
  clearHoveredCode: () => void;
}

export type IBufferSlice = IBufferState & IBufferActions;

const initialState: IBufferState = {
  hoveredCode: null,
  selectedCodes: [],
};

export const createBufferSlice: TStoreSlice<IBufferSlice> = (set) => ({
  ...initialState,
  resetBuffer: () => set(initialState),

  addCodeToBuffer: (code) => {
    set((s) => {
      s.selectedCodes.push(code);
    });
  },

  setHoveredCode: (id, code) => {
    set((s) => {
      if (!code) {
        if (s.hoveredCode?.id === id) {
          s.hoveredCode = null;
        }
        return;
      }

      s.hoveredCode = code;
    });
  },

  clearHoveredCode: () => {
    set((s) => {
      s.hoveredCode = null;
    });
  },
});

export const selectIsCodeSelected = (codeId: string) => {
  return (state: IRootStore) =>
    !!state.selectedCodes.find((e) => e.id === codeId);
};
