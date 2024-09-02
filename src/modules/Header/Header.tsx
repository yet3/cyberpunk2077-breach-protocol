import { Timer } from "./Timer";
import { Buffer } from "./Buffer";

export const Header = () => {
  return (
    <header
      className="grid grid-cols-[500px_1fr] justify-start gap-x-12 mb-10 py-2 border-b border-primary-500/40 relative"
      style={{
        paddingLeft: "var(--breach-inner-pl)",
        paddingRight: "var(--breach-inner-pr)",
      }}
    >

      <div
        className="absolute top-0 w-screen h-full bg-primary-500/10"
        style={{
          left: "calc((100vw - var(--breach-wdith)) / -2 - 4px)",
        }}
      />
      <Timer />
      <Buffer />
    </header>
  );
};
