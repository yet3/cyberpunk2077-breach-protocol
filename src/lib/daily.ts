import { BreachDailyStatus } from "@typings/Breach.types";
import { DAILY_BREACH_STATUS_KEY, DAILY_BREACH_TIMESTAMP_KEY } from "./consts";
import { getStartOfDayTimestamp } from "./date";

export const saveDailyBreachFinish = (isSuccess: boolean) => {
  localStorage.setItem(
    DAILY_BREACH_TIMESTAMP_KEY,
    getStartOfDayTimestamp().toString(),
  );

  localStorage.setItem(
    DAILY_BREACH_STATUS_KEY,
    isSuccess ? BreachDailyStatus.SOLVED : BreachDailyStatus.FAILED,
  );
};

export const isSavedDailyBreachValidNow = () => {
  return (
    getStartOfDayTimestamp().toString() ===
    localStorage.getItem(DAILY_BREACH_TIMESTAMP_KEY)
  );
};

export const isDailyBreach = () => {
  return window.location.pathname.includes("/daily");
};
