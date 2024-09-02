export interface IBreachConfig {
  seed: number;
  time?: number; // seconds

  availableCodes?: string[];

  matrixCols?: number;
  matrixRows?: number;
  bufferSize?: number;

  maxSequenceSize?: number;
  minSequenceSize?: number;
  maxNumberOfSequences?: number;
}

export type IBreachConfigParsed = Required<IBreachConfig>;

export enum BreachDailyStatus {
  SOLVED = "SOLVED",
  FAILED = "FAILED",
}

export enum BreachFinishStauts {
  TIMED_OUT = "TIMED_OUT",
  BUFFER_FULL = "BUFFER_FULL",
  DAEMONS_UPLOADED = "DAEMONS_UPLOADED",
  ALL_DAEMONS_UPLOADED = "ALL_DAEMONS_UPLOADED",
}
