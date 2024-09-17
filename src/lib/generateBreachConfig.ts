import { DEFAULT_BREACH_CONFIG } from "@stores/config.slice";
import type { IPrng } from "@stores/prng.slice";
import type { IBreachConfig, IBreachConfigParsed } from "@typings/Breach.types";

interface IGenerateBreachConfigOpts {
  prng: IPrng;
  userConfig?: IBreachConfig;
}

export const generateBreachConfig = ({
  prng,
  userConfig,
}: IGenerateBreachConfigOpts): IBreachConfigParsed => {
  const timeIdx = prng.randomInt({ min: 1, max: 6 });

  let matrixSize = prng.randomInt({ min: 4, max: 7 });

  if (timeIdx === 1) matrixSize = 4;
  else if (timeIdx === 2) matrixSize = Math.min(matrixSize, 5);
  else if (timeIdx >= 3) matrixSize = Math.min(matrixSize, 6);
  else if (timeIdx >= 4) matrixSize = Math.max(matrixSize, 6);

  const bufferSize = prng.randomInt({ min: 4, max: timeIdx <= 2 ? 6 : 10 });

  const solutionSize = prng.randomInt({
    min: timeIdx <= 2 ? 4 : Math.max(bufferSize - 2, 4),
    max: bufferSize,
  });

  const minSequenceSize = prng.randomInt({
    min: 2,
    max: Math.max(Math.ceil(solutionSize * 0.4), 2),
  });

  const maxSequenceSize = prng.randomInt({
    min: Math.min(
      minSequenceSize + Math.ceil(solutionSize * 0.3),
      solutionSize,
    ),
    max: solutionSize,
  });

  return {
    ...DEFAULT_BREACH_CONFIG,
    time: timeIdx * 15,
    matrixCols: matrixSize,
    matrixRows: matrixSize,
    bufferSize,
    solutionSize,

    minSequenceSize,
    maxSequenceSize,

    ...userConfig,
  };
};
