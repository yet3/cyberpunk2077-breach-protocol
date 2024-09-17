import { RouterLink } from "@common/RouterLink";
import { DailyBtn } from "./DailyBtn";

export const BreachBottomActions = () => {
  const isOnDaily = window.location.pathname.includes("/daily");

  return (
    <nav
      className="self-end flex space-x-4"
      style={{
        paddingRight: "var(--breach-outer-px)",
      }}
    >
      {!isOnDaily ? <DailyBtn /> : <RouterLink to="/" content="NEW BREACH" />}

      {/* <Button */}
      {/*   content="CUSTOM BREACH" */}
      {/*   onClick={() => { */}
      {/*     window.location.replace("/daily"); */}
      {/*   }} */}
      {/* /> */}
    </nav>
  );
};
