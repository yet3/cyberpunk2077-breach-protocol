import { RouterLink, RouterLinkVariant } from "@common/RouterLink";
import { DAILY_BREACH_STATUS_KEY } from "@lib";
import { BreachDailyStatus } from "@typings/Breach.types";
import { isSavedDailyBreachValidNow } from "../../../lib/daily";

interface IProps {
  className?: string;
}

export const DailyBtn = ({ className }: IProps) => {
  let variant = RouterLinkVariant.PRIMARY;

  if (isSavedDailyBreachValidNow()) {
    const dailyStatus = localStorage.getItem(DAILY_BREACH_STATUS_KEY);
    if (dailyStatus === BreachDailyStatus.SOLVED) {
      variant = RouterLinkVariant.SUCCESS;
    } else if (dailyStatus === BreachDailyStatus.FAILED) {
      variant = RouterLinkVariant.DANGER;
    }
  }

  return (
    <RouterLink
      to="/daily"
      content="DAILY BREACH"
      variant={variant}
      className={className}
    />
  );
};
