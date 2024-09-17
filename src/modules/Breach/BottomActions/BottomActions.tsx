import { Button } from "@common/Button";
import { RouterLink } from "@common/RouterLink";
import { useAppStore } from "@contexts/AppStoreCtx";
import { DailyBtn } from "./DailyBtn";

export const BreachBottomActions = () => {
  const newBreach = useAppStore((s) => s.newBreach);
  const isOnDaily = window.location.pathname.includes("/daily");

  return (
    <nav
      className="self-end flex space-x-4"
      style={{
        paddingRight: "var(--breach-outer-px)",
      }}
    >
      {!isOnDaily ? (
        <>
          <Button
            content="NEW BREACH"
            onClick={() => {
              window.history.pushState({}, document.title, "/");
              newBreach({
                seed: new Date().getTime(),
              });
            }}
          />
          <DailyBtn />
        </>
      ) : (
        <RouterLink to="/" content="NEW BREACH" />
      )}
    </nav>
  );
};
