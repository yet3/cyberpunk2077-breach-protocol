import type { IPrngCtx } from "@contexts/PrngCtx";
import type { IBreachConfigParsed } from "@typings/Breach.types";
import { type ISequence, SequenceStatus } from "@typings/Sequences.types";

interface IOpts {
  prng: IPrngCtx;
  config: IBreachConfigParsed;
  solvedBufferCodes: string[];
}

interface IRes {
  sequences: ISequence[];
  error?: string | null;
}

// TODO: make better
export const generateSequences = ({
  prng,
  config,
  solvedBufferCodes,
}: IOpts): IRes => {
  const sequences: ISequence[] = [];

  const totalLength = solvedBufferCodes.length;
  const ranges: {
    start: number;
    length: number;
    ogIdx: number;
  }[] = [];

  for (let m = 0; m < 3; m++) {
    let randomIdx = prng.randomInt({ min: 0, max: totalLength - 1 });
    let length = prng.randomInt({
      min: config.minSequenceSize,
      max: config.maxSequenceSize,
    });

    let tries = 0;

    // I don't like this *_*
    while (
      ranges.find((e) => e.start === randomIdx && e.length === length) &&
      tries < 10
    ) {
      tries++;
      randomIdx = prng.randomInt({ min: 0, max: totalLength - 1 });
      length = prng.randomInt({
        min: config.minSequenceSize,
        max: config.maxSequenceSize,
      });
    }

    ranges.push({
      start: randomIdx,
      length: length,
      ogIdx: m,
    });
  }

  for (const range of ranges) {
    const codes = solvedBufferCodes.slice(
      range.start,
      range.start + range.length,
    );
    const amtOutside = Math.max(0, range.start + range.length - totalLength);
    if (amtOutside > 0) {
      // codes.unshift(...solvedBufferCodes.slice(0, amtOutside));
    }
    sequences.push({
      id: Math.random().toString(),
      status: SequenceStatus.IN_PROGRESS,
      codes: codes,
    });
  }

  return { sequences };
};
