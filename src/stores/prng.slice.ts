import type { TStoreSlice } from "./root.store";

const A = 1103515245;
const C = 12345;
const M = 2 ** 31;

export interface IPrng {
  seed: number;

  reset: () => void;

  setSeed: (seed: number) => void;
  randomFloat: () => number;
  randomInt: (opts: { min: number; max: number }) => number;

  randomMatrixCode: () => string;
}

export type IPrngSlice = {
  prngState: number;
  prng: IPrng;
};

const DEFAULT_SEED = new Date().getTime();

export const createPrngSlice: TStoreSlice<IPrngSlice> = (set, get) => ({
  prngState: DEFAULT_SEED,
  prng: {
    seed: DEFAULT_SEED,
    randomFloat: () => {
      const state = get().prngState;
      const newState = (A * state + C) % M;

      set((s) => {
        s.prngState = newState;
      });

      return newState / M;
    },

    randomInt: (opts) => {
      const max = opts.max;
      const min = opts.min;

      return Math.floor(get().prng.randomFloat() * (max - min + 1)) + min;
    },

    randomMatrixCode: () => {
      const store = get();
      return store.config.availableCodes[
        store.prng.randomInt({
          min: 0,
          max: store.config.availableCodes.length - 1,
        })
      ];
    },

    setSeed: (seed) => {
      set((s) => {
        s.prng.seed = seed;
        s.prngState = seed;
      });
    },

    reset: () => {
      set((s) => {
        s.prngState = s.prng.seed;
      });
    },
  },
});
