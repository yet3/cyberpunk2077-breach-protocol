export interface IBreachConfig {
  time?: number; // seconds

  availableCodes?: string[];

  matrixCols?: number;
  matrixRows?: number;
  bufferSize?: number;
  solutionSize?: number;

  maxSequenceSize?: number;
  minSequenceSize?: number;
  numberOfSequences?: number;
}

export type IBreachConfigParsed = Required<IBreachConfig>;

export enum BreachDailyStatus {
  SOLVED = "SOLVED",
  FAILED = "FAILED",
}

export enum BreachFinishStatus {
  TIMED_OUT = "TIMED_OUT",
  BUFFER_FULL = "BUFFER_FULL",
  DAEMONS_UPLOADED = "DAEMONS_UPLOADED",
  ALL_DAEMONS_UPLOADED = "ALL_DAEMONS_UPLOADED",
}
