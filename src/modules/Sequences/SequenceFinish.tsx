import { SequenceStatus } from "@typings/Sequences.types";
import clsx from "clsx";

interface IProps {
  status: SequenceStatus;
}

export const SequenceFinish = ({ status }: IProps) => {
  const isInProgress = status === SequenceStatus.IN_PROGRESS;
  const isSolved = status === SequenceStatus.SOLVED;
  return (
    <div
      className={clsx({
        "ribbon-br flex items-center pl-4 w-full h-full !absolute z-10 origin-top font-medium ribbon-border": true,
        "scale-y-0": isInProgress,
        "scale-y-100": !isInProgress,
        "rb-bg-success-500 rb-success-600 text-success-900": isSolved,
        "rb-bg-danger-500 rb-danger-600 text-danger-900": !isSolved,
      })}
      style={{
        boxShadow: `0px 0px 10px 0px hsl(var(--${status === "solved" ? "success-500" : "danger-500"}) / 40%)`,
        transition: "transform 300ms ease",
      }}
    >
      {status === "solved" ? "INSTALLED" : "FAILED"}
    </div>
  );
};
