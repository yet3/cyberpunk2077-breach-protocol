import type { ISequence, SequenceStatus } from "@typings/Sequences.types";
import type { TStoreSlice } from "./root.store";

interface ISequencesState {
  sequences: ISequence[];
}

interface ISequencesActions {
  setSequenceStatus: (id: string, status: SequenceStatus) => void;
  setSequences: (sequences: ISequence[]) => void;
  resetSequences: () => void;
}

export type ISequencesSlice = ISequencesState & ISequencesActions;

const initialState: ISequencesState = {
  sequences: [],
};

export const createSequencesSlice: TStoreSlice<ISequencesSlice> = (set) => ({
  ...initialState,
  resetSequences: () => set(initialState),

  setSequences: (sequences) => {
    set((s) => {
      s.sequences = sequences;
    });
  },

  setSequenceStatus: (id, status) => {
    set((s) => {
      const seq = s.sequences.find((el) => el.id === id);
      if (seq) {
        seq.status = status;
      }
    });
  },
});
