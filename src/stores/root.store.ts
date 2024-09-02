import {
  BreachFinishStauts,
  type IBreachConfigParsed,
} from "@typings/Breach.types";
import { SequenceStatus } from "@typings/Sequences.types";
import { type StateCreator, create } from "zustand";
import { mutative } from "zustand-mutative";
import { subscribeWithSelector } from "zustand/middleware";
import { type IBufferSlice, createBufferSlice } from "./buffer.slice";
import { type IConfigSlice, createConfigSlice } from "./config.slice";
import { type IGeneralSlice, createGeneralSlice } from "./general.slice";
import { type ISequencesSlice, createSequencesSlice } from "./sequences.slice";

export type IRootStore = IBufferSlice &
  ISequencesSlice &
  IConfigSlice &
  IGeneralSlice & {
    resetBreach: () => void;
    newBreach: () => void;
    setSeed: (seed: number) => void;
    setConfig: (config: IBreachConfigParsed) => void;
  };

export type TStoreSlice<T> = StateCreator<
  IRootStore,
  [["zustand/mutative", never]],
  [],
  T
>;

export const createAppStore = (config: IBreachConfigParsed) => {
  return create<
    IRootStore,
    [["zustand/subscribeWithSelector", never], ["zustand/mutative", never]]
  >(
    subscribeWithSelector(
      mutative((set, get, ...a) => ({
        ...createGeneralSlice(set, get, ...a),
        ...createBufferSlice(set, get, ...a),
        ...createSequencesSlice(set, get, ...a),

        ...createConfigSlice(config),

        setSeed: (seed) => {
          set((s) => {
            s.config.seed = seed;
          });
        },
        setConfig: (newConfig) => {
          set((s) => {
            s.config = newConfig;
          });
        },

        newBreach: () => {
          set((s) => {
            s.resetBreach();
            s.config.seed = new Date().getTime();
          });
        },

        resetBreach: () => {
          get().resetSequences();
          get().resetBuffer();

          // Must be called last
          get().resetGeneral();
        },
      })),
    ),
  );
};

export type IAppStore = ReturnType<typeof createAppStore>;

export const selectBreachFinishDetials = (
  s: IRootStore,
): { isSuccess: boolean; status: BreachFinishStauts } | null => {
  if (s.breachFinishedAt == null) {
    return null;
  }

  let hasAnyInProgress = false;
  let amtOfDaemonsUploaded = 0;
  let amtOfSolved = 0;
  for (const sequence of s.sequences) {
    if (sequence.status !== SequenceStatus.IN_PROGRESS) {
      if (sequence.status === SequenceStatus.SOLVED) amtOfSolved++;
      amtOfDaemonsUploaded++;
    } else hasAnyInProgress = true;
  }

  // Order of if statements matters here
  if (amtOfSolved >= s.sequences.length) {
    return { isSuccess: true, status: BreachFinishStauts.ALL_DAEMONS_UPLOADED };
  }

  if (!hasAnyInProgress && amtOfSolved > 0) {
    return {
      isSuccess: true,
      status: BreachFinishStauts.DAEMONS_UPLOADED,
    };
  }

  if (s.selectedCodes.length >= s.config.bufferSize) {
    return { isSuccess: false, status: BreachFinishStauts.BUFFER_FULL };
  }

  // TODO: change status, must check in game
  if (!hasAnyInProgress && amtOfSolved === 0) {
    return { isSuccess: false, status: BreachFinishStauts.DAEMONS_UPLOADED };
  }

  if (s.breachFinishedAt != null) {
    return { isSuccess: amtOfSolved > 0, status: BreachFinishStauts.TIMED_OUT };
  }

  return null;
};

export const selectIsBreachFinished = (s: IRootStore): boolean =>
  !!selectBreachFinishDetials(s);
