import clsx from "clsx";
import { type ReactNode, useMemo } from "react";

interface IProps {
  delay?: string;
}

export const BreachSquaresDecoration = ({ delay }: IProps) => {
  const squares = useMemo(() => {
    const els: ReactNode[] = [];
    for (let i = 0; i < 18; i++) {
      els.push(
        <div
          key={`squares-left-${i}`}
          className="w-1 h-0.5 border border-primary-500/40"
        />,
      );
    }
    return els;
  }, []);

  return (
    <div
      className={clsx({
        "animate-breach-top-decoration-squares grid-cols-6 content-between h-14": true,
        "2xl:ml-4 ml-2 lg:grid md:hidden sm:grid 2xl:gap-x-4 gap-x-3 hidden": true,
      })}
      style={{
        // @ts-expect-error: custom css var
        "--delay": delay,
      }}
    >
      {squares}
    </div>
  );
};
