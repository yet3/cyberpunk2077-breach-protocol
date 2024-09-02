import { Button } from "@common/Button";
import { DailyBtn } from "./DailyBtn";

export const BreachNav = () => {
  const isOnDaily = window.location.pathname.includes("/daily");

  return (
    <nav
      className="self-end flex space-x-4"
      style={{
        paddingRight: "var(--breach-outer-px)",
      }}
    >
      {!isOnDaily ? (
        <DailyBtn />
      ) : (
        <Button
          content="NEW BREACH"
          onClick={() => {
            window.location.replace("/");
          }}
        />
      )}
      {/* <Button */}
      {/*   content="CUSTOM BREACH" */}
      {/*   onClick={() => { */}
      {/*     window.location.replace("/daily"); */}
      {/*   }} */}
      {/* /> */}
    </nav>
  );
};
