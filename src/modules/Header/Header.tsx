import { Buffer } from "./Buffer";
import { Timer } from "./Timer";

export const Header = () => {
  return (
    <header
      className="grid justify-start py-2 border-b border-primary-500/40 relative"
      style={{
        gridTemplateColumns: "var(--matrix-width) 1fr",
        columnGap: "var(--breach-content-x-gap)",
        marginBottom: "var(--breach-content-y-gap)",
        paddingLeft: "var(--breach-inner-pl)",
        paddingRight: "var(--breach-inner-pr)",
      }}
    >
      <div
        className="absolute top-0 w-screen h-full bg-primary-500/10"
        style={{
          left: "calc(var(--breach-outer-px) * -1 - 1px)",
        }}
      />
      <Timer />
      <Buffer />
    </header>
  );
};
