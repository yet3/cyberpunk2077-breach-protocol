// TODO: make this maybe?
enum SEED_TOKEN {
  TIME = "T",
  BUFFER_SIZE = "B",
  MATRIX_COLS = "X",
  MATRIX_ROWS = "Y",
  CODES = "K",
  SEQUENCE = "S",
}

const safeParseInt = (
  str: string,
  min: number,
  max: number,
  def: number,
): number => {
  const parsed = Number.parseInt(str, 10);
  if (!Number.isNaN(parsed)) return Math.max(min, Math.min(max, parsed));
  return def;
};

export const makeGameFromSeed = (seed: string) => {
  let time = 20;
  let matrixCols = 5;
  let matrixRows = 5;
  let bufferSize = 5;
  let codes = ["55", "BD", "1C", "E9", "7A"];
  const sequences: Array<string[]> = [];

  let result = "";
  for (const char of seed) {
    let canAddChar = true;
    switch (char) {
      case SEED_TOKEN.TIME: {
        time = safeParseInt(result, 0, 999, 20);
        result = "";
        canAddChar = false;
        break;
      }
      case SEED_TOKEN.BUFFER_SIZE: {
        bufferSize = safeParseInt(result, 4, 12, 5);
        result = "";
        canAddChar = false;
        break;
      }
      case SEED_TOKEN.MATRIX_COLS: {
        matrixCols = safeParseInt(result, 3, 12, 5);
        result = "";
        canAddChar = false;
        break;
      }
      case SEED_TOKEN.MATRIX_ROWS: {
        matrixRows = safeParseInt(result, 3, 12, 5);
        result = "";
        canAddChar = false;
        break;
      }
      case SEED_TOKEN.CODES: {
        const newCodes: string[] = [];
        for (let i = 0; i < result.length; i += 4) {
          let str = "";
          str += String.fromCharCode(
            Number.parseInt(result.substring(i, i + 2), 16),
          );
          str += String.fromCharCode(
            Number.parseInt(result.substring(i + 2, i + 4), 16),
          );
          newCodes.push(str);
        }
        codes = newCodes;

        result = "";
        canAddChar = false;
        break;
      }
      case SEED_TOKEN.SEQUENCE: {
        const seq: string[] = [];
        for (let i = 0; i < result.length; i += 2) {
          const idx = safeParseInt(result.substring(i, i + 2), 0, 99, 0);
          const code = codes[idx];
          if (code) {
            seq.push(code);
          }
        }

        sequences.push(seq);

        result = "";
        canAddChar = false;
      }
    }

    if (canAddChar) {
      result += char;
    }
  }

  return {
    time,
    codes,
    matrixCols,
    matrixRows,
    bufferSize,
    sequences,
  };
};
// console.log(
//   makeGameFromSeed(
//     "9X07Y25T08B45354244314345393741K01030104S0301S04040102S8745789",
//   ),
// );
