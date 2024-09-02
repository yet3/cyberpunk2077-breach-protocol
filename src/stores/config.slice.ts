import type { IBreachConfigParsed } from "@typings/Breach.types";

interface IConfigState {
  config: IBreachConfigParsed;
}

export type IConfigSlice = IConfigState;

export const createConfigSlice = (parsedConfig: IBreachConfigParsed) => ({
  config: {
    ...parsedConfig,
  },
});
