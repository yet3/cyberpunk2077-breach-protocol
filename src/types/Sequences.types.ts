import type { IMatrixCode } from "./Matrix.types";

export enum SequenceStatus {
  SOLVED = "solved",
  FAILED = "failed",
  IN_PROGRESS = "in-progress",
}

export interface ISequence {
  id: string;
  codes: IMatrixCode[];
  status: SequenceStatus;
}
