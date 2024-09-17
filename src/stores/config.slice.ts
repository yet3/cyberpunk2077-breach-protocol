import { AVAILABLE_CODES } from "@lib";
import type { IBreachConfigParsed } from "@typings/Breach.types";
import type { TStoreSlice } from "./root.store";

interface IConfigState {
  config: IBreachConfigParsed;
}

export type IConfigSlice = IConfigState;

export const DEFAULT_BREACH_CONFIG: IBreachConfigParsed = {
  time: 30,

  availableCodes: AVAILABLE_CODES,

  matrixCols: 5,
  matrixRows: 5,
  bufferSize: 5,
  solutionSize: 5,

  numberOfSequences: 3,
  minSequenceSize: 2,
  maxSequenceSize: 4,
};

export const createConfigSlice: TStoreSlice<IConfigSlice> = () => ({
  config: {
    ...DEFAULT_BREACH_CONFIG,
  },
});
