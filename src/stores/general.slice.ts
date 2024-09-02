import type { TStoreSlice } from "./root.store";

interface IGeneralState {
  gameId: string;
  breachStartedAt: number | null;
  breachFinishedAt: number | null;
}

interface IGeneralActions {
  resetGeneral: () => void;

  startBreach: () => void;
  finishBreach: () => void;
}

export type IGeneralSlice = IGeneralState & IGeneralActions;

const initialState: IGeneralState = {
  gameId: "def-id",
  breachStartedAt: null,
  breachFinishedAt: null,
};

export const createGeneralSlice: TStoreSlice<IGeneralSlice> = (set, _, a) => ({
  ...initialState,
  resetGeneral: () => {
    set({ ...initialState, gameId: Math.random().toString() });
  },
  startBreach: () => {
    set((s) => {
      s.breachStartedAt = new Date().getTime();
      s.breachFinishedAt = null;
    });
  },

  finishBreach: () => {
    set((s) => {
      s.breachFinishedAt = new Date().getTime();
    });
  },
});
