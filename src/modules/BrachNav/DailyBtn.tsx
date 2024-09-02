import { Button, ButtonVariant } from "@common/Button";
import {
  DAILY_BREACH_STATUS_KEY,
  DAILY_BREACH_TIMESTAMP_KEY,
} from "@lib/const.lib";
import { BreachDailyStatus } from "@typings/Breach.types";

export const DailyBtn = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  let variant = ButtonVariant.PRIMARY;

  if (
    startOfDay.getTime().toString() ===
    localStorage.getItem(DAILY_BREACH_TIMESTAMP_KEY)
  ) {
    const dailyStatus = localStorage.getItem(DAILY_BREACH_STATUS_KEY);
    if (dailyStatus === BreachDailyStatus.SOLVED) {
      variant = ButtonVariant.SUCCESS;
    } else if (dailyStatus === BreachDailyStatus.FAILED) {
      variant = ButtonVariant.DANGER;
    }
  }

  return (
    <Button
      content="DAILY BREACH"
      variant={variant}
      onClick={() => {
        window.location.replace("/daily");
      }}
    />
  );
};
