import { useAppStore } from "@contexts/AppStoreCtx";
import { selectIsBreachFinished } from "@stores/root.store";
import { Buffer } from "./Buffer";
import { Timer } from "./Timer";

export const Header = () => {
  const isBreachFinished = useAppStore(selectIsBreachFinished);

  return (
    <header
      className="breach-layout-px border-b border-primary-500/40 relative"
      style={{
        marginBottom: "var(--breach-content-y-gap)",
      }}
    >
      <div
        className="absolute top-0 w-screen h-full bg-primary-500/10"
        style={{
          left: "calc(var(--breach-outer-px) * -1 - 1px)",
        }}
      />
      <div
        className="breach-layout-grid grid justify-start py-2"
        style={{
          opacity: isBreachFinished ? 0.4 : 1,
          transition: "opacity var(--duration-header-fade-out) ease",
        }}
      >
        <Timer />
        <Buffer />
      </div>
    </header>
  );
};
