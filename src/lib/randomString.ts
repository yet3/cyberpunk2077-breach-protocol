const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const AMT_OF_CHARS = CHARS.length;

export const randomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * (AMT_OF_CHARS - 1)));
  }
  return result;
};
