export const getStartOfDayTimestamp = (date?: Date): number => {
  const copiedDate = !date ? new Date() : new Date(date);
  copiedDate.setHours(0, 0, 0, 0);
  return copiedDate.getTime();
};
