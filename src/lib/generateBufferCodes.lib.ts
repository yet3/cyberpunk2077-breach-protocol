import type { IPrngCtx } from "@contexts/PrngCtx";
import type { IBreachConfigParsed } from "@typings/Breach.types";

export const generateBufferCodes = (prng: IPrngCtx, config: IBreachConfigParsed): string[] => {
  const result: string[] = [];

  const max = config.availableCodes.length - 1;
  for (let i = 0; i < config.bufferSize; i++) {
    result.push(config.availableCodes[prng.randomInt({ min: 0, max })]);
  }

  return result;
};
