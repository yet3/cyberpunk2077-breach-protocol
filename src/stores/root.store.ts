import { BreachFinishStatus } from "@typings/Breach.types";
import { SequenceStatus } from "@typings/Sequences.types";
import { type StateCreator, create } from "zustand";
import { mutative } from "zustand-mutative";
import { subscribeWithSelector } from "zustand/middleware";
import { type IBufferSlice, createBufferSlice } from "./buffer.slice";
import { type IConfigSlice, createConfigSlice } from "./config.slice";
import { type IGeneralSlice, createGeneralSlice } from "./general.slice";
import { type IMatrixSlice, createMatrixSlice } from "./matrix.slice";
import { type IPrngSlice, createPrngSlice } from "./prng.slice";
import { type ISequencesSlice, createSequencesSlice } from "./sequences.slice";

export interface IRootStore
  extends IBufferSlice,
    ISequencesSlice,
    IConfigSlice,
    IMatrixSlice,
    IPrngSlice,
    IGeneralSlice {
  resetStore: () => void;
}

export type TStoreSlice<T> = StateCreator<
  IRootStore,
  [["zustand/mutative", never]],
  [],
  T
>;

export const createAppStore = () => {
  return create<
    IRootStore,
    [["zustand/subscribeWithSelector", never], ["zustand/mutative", never]]
  >(
    subscribeWithSelector(
      mutative((set, get, ...a) => ({
        ...createGeneralSlice(set, get, ...a),
        ...createConfigSlice(set, get, ...a),
        ...createPrngSlice(set, get, ...a),
        ...createBufferSlice(set, get, ...a),
        ...createSequencesSlice(set, get, ...a),
        ...createMatrixSlice(set, get, ...a),

        resetStore: () => {
          get().resetSequences();
          get().resetBuffer();
          get().resetGeneral();
          get().prng.reset();
        },
      })),
    ),
  );
};

export type IAppStore = ReturnType<typeof createAppStore>;

export const selectBreachFinishDetails = (
  s: IRootStore,
): { isSuccess: boolean; status: BreachFinishStatus } | null => {
  if (s.breachFinishedAt == null) {
    return null;
  }

  let amtOfUploaded = 0;
  let amtOfSolved = 0;
  for (const sequence of s.sequences) {
    if (sequence.status !== SequenceStatus.IN_PROGRESS) {
      if (sequence.status === SequenceStatus.SOLVED) amtOfSolved++;
      amtOfUploaded++;
    }
  }

  const hasAnyInProgress = amtOfUploaded < s.sequences.length;

  if (amtOfSolved >= s.sequences.length) {
    return { isSuccess: true, status: BreachFinishStatus.ALL_DAEMONS_UPLOADED };
  }

  if (!hasAnyInProgress && amtOfSolved > 0) {
    return {
      isSuccess: true,
      status: BreachFinishStatus.DAEMONS_UPLOADED,
    };
  }

  if (
    s.selectedCodes.length >= s.config.bufferSize ||
    (!hasAnyInProgress && amtOfSolved === 0)
  ) {
    return { isSuccess: false, status: BreachFinishStatus.BUFFER_FULL };
  }

  if (s.breachFinishedAt != null) {
    return { isSuccess: amtOfSolved > 0, status: BreachFinishStatus.TIMED_OUT };
  }

  return null;
};

export const selectIsBreachFinished = (s: IRootStore): boolean => {
  return !!selectBreachFinishDetails(s);
};
