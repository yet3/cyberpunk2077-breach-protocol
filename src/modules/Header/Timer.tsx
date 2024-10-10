import { useAppStoreShallow } from "@contexts/AppStoreCtx";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Timer = () => {
  const { time, startedAt, finishedAt, finishBreach } = useAppStoreShallow(
    (s) => ({
      time: s.config.time,
      startedAt: s.breachStartedAt,
      finishedAt: s.breachFinishedAt,
      finishBreach: s.finishBreach,
    }),
  );
  const [, setRerender] = useState({});
  const rerender = () => setRerender({});

  const totalMs = time * 1000;
  let totalMsLeft = totalMs;
  if (startedAt) {
    let now: number;
    if (finishedAt != null) now = finishedAt;
    else now = new Date().getTime();

    totalMsLeft = totalMs - (now - startedAt);
    totalMsLeft = Math.max(0, totalMsLeft);
  }

  useEffect(() => {
    if (startedAt == null || finishedAt != null || totalMs === 0) {
      return;
    }

    const interval = setInterval(() => {
      if (new Date().getTime() - startedAt >= totalMs) {
        clearInterval(interval);
        finishBreach();
      }
      rerender();
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [startedAt, finishedAt, totalMs]);

  const sLeft = Math.floor(totalMsLeft / 1000);
  const msLeft = totalMsLeft - sLeft * 1000;

  const displayTime = `${sLeft.toString().padStart(2, "0")}:${Math.floor(
    msLeft / 10,
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="animate-scale-from-left grid text-primary-500 breach-timer">
      <div className="absolute -top-1 text-4px text-primary-500/50 w-full border-b border-primary-500/50 pb-0.5">
        ONLY CC35 CERTIFIED AND DHSF 5TH CLASS OFFICERS ARE ALLOWED TO
        MANIPULATE, ACCESS OR DISABLE THIS DEVICE.
      </div>

      <div className="grid grid-cols-[1fr_auto] items-start pt-3 pb-1">
        <h2 className="sm:text-2xl text-xl self-center">
          BREACH TIME REMAINING
        </h2>
        <div className="flex justify-center border border-primary-500 py-1 w-20 tabular-nums lg:text-base text-lg">
          {time === 0 ? "NaN" : displayTime}
        </div>
      </div>
      <div
        className={clsx(
          "h-3 w-full border border-primary-500 relative",
          "after:absolute after:top-0 after:left-0 after:bg-primary-500",
          "after:h-full after:w-full after:origin-left after:scale-x-[var(--sx)]",
        )}
        style={{
          // @ts-expect-error: custom css var
          "--sx": totalMsLeft / totalMs,
        }}
      />
    </div>
  );
};
