import type { IPrng } from "@stores/prng.slice";
import type { IBreachConfigParsed } from "@typings/Breach.types";
import type { IMatrixCode } from "@typings/Matrix.types";
import { type ISequence, SequenceStatus } from "@typings/Sequences.types";

interface IOpts {
  prng: IPrng;
  config: IBreachConfigParsed;
  solution: IMatrixCode[];
}

export const generateSequences = ({
  prng,
  config,
  solution,
}: IOpts): ISequence[] => {
  const sequences: ISequence[] = [];

  let possibleSequences: Array<IMatrixCode[]> = [];
  for (let z = 0; z < solution.length; z++) {
    for (let i = config.minSequenceSize; i <= solution.length - z; i++) {
      const opt = solution.slice(z, i + z);
      if (opt.length <= config.maxSequenceSize) {
      }
      possibleSequences.push(opt);
    }
  }

  for (let i = 0; i < config.numberOfSequences; i++) {
    const optIdx = prng.randomInt({
      min: 0,
      max: possibleSequences.length - 1,
    });
    const seq = possibleSequences.splice(optIdx, 1)[0];

    possibleSequences = possibleSequences.filter((e) => seq[0] !== e[0]);

    if (seq) {
      sequences.push({
        id: Math.random().toString(),
        status: SequenceStatus.IN_PROGRESS,
        codes: seq,
      });
    }
  }

  return sequences;
};
