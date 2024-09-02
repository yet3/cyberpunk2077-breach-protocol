import { AVAILABLE_CODES } from "@lib/const.lib";
import { warning } from "@tanstack/react-router";
import type { IBreachConfig, IBreachConfigParsed } from "@typings/Breach.types";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

const A = 1103515245;
const C = 12345;
const M = 2 ** 31;

type IRandomInt = (opts: { min: number; max: number }) => number;

export interface IPrngCtx {
  setSeed: (seed: number) => void;
  randomFloat: () => number;
  randomInt: IRandomInt;
  randomMatrixCode: () => string;
  generateBreachConfig: (userConfig: IBreachConfig) => IBreachConfigParsed;
}

const PrngCtx = createContext<IPrngCtx | null>(null);

type IProps = PropsWithChildren<{
  seed: number;
  availableCodes: string[];
}>;

export const PrngCtxProvider = ({ seed, availableCodes, children }: IProps) => {
  const state = useRef<number>(seed);

  useEffect(() => {
    state.current = seed;
  }, [seed]);

  const randomFloat = (): number => {
    state.current = (A * state.current + C) % M;
    return state.current / M;
  };

  const randomInt: IRandomInt = (opts) => {
    const max = opts.max;
    const min = opts.min;

    return Math.floor(randomFloat() * (max - min + 1)) + min;
  };

  // TODO: maybe take this out of here?
  const randomMatrixCode = (): string => {
    return availableCodes[
      randomInt({ min: 0, max: availableCodes.length - 1 })
    ];
  };

  // TODO: make sure it's needed
  const setSeed = (newSeed: number) => {
    state.current = newSeed;
  };

  // TODO: maybe make a hook out of it?
  const generateBreachConfig = (
    userConfig: IBreachConfig,
  ): IBreachConfigParsed => {
    setSeed(userConfig.seed)

    const timeIdx = randomInt({ min: 1, max: 4 });

    const matrixSize = randomInt({ min: 4, max: 7 });

    const bufferSize = randomInt({ min: 4, max: 8 });

    console.log(userConfig.seed, matrixSize)

    return {
      time: timeIdx * 20,
      availableCodes: AVAILABLE_CODES,
      matrixCols: matrixSize,
      matrixRows: matrixSize,
      bufferSize: bufferSize,
      minSequenceSize: 2,
      maxSequenceSize: bufferSize - 1,
      maxNumberOfSequences: 3,
      ...userConfig,
    };
  };

  return (
    <PrngCtx.Provider
      value={{
        setSeed,
        generateBreachConfig,
        randomMatrixCode,
        randomFloat,
        randomInt,
      }}
    >
      {children}
    </PrngCtx.Provider>
  );
};

export const usePrng = () => {
  const ctx = useContext(PrngCtx);
  if (!ctx) {
    throw new Error("usePrng: PrngCtxProvider is undefined");
  }
  return ctx;
};
