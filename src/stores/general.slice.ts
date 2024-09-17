import { generateBreachConfig, generateMatrix, generateSequences } from "@lib";
import type { IBreachConfig } from "@typings/Breach.types";
import type { TStoreSlice } from "./root.store";

interface IGeneralState {
  gameId: number | null;
  breachStartedAt: number | null;
  breachFinishedAt: number | null;
}

interface IGeneralActions {
  resetGeneral: () => void;

  startBreach: () => void;
  finishBreach: () => void;

  newBreach: (opts?: { seed?: number; config?: IBreachConfig }) => void;
  restartBreach: () => void;
}

export type IGeneralSlice = IGeneralState & IGeneralActions;

const initialState: IGeneralState = {
  gameId: null,
  breachStartedAt: null,
  breachFinishedAt: null,
};

export const createGeneralSlice: TStoreSlice<IGeneralSlice> = (set, get) => ({
  ...initialState,
  resetGeneral: () => {
    set({ ...initialState, gameId: Math.random() });
  },

  newBreach: ({ seed: _seed, config: userConfig } = {}) => {
    get().resetStore();

    const prng = get().prng;
    if (_seed != null) {
      prng.setSeed(_seed);
    }

    const config = generateBreachConfig({
      prng,
      userConfig,
    });

    const { matrix, solution, selection } = generateMatrix({
      prng,
      config,
    });

    const sequences = generateSequences({
      prng,
      config,
      solution,
    });

    set((s) => {
      s.matrixCodes = matrix;
      s.matrixSolution = solution;
      s.matrixSelection = selection;
      s.sequences = sequences;
      s.config = config;
      s.gameId = Math.random();
    });
  },

  restartBreach: () => {
    get().newBreach();
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
