import { getStartOfDayTimestamp } from "@lib";
import { BreachRun } from "@modules/Breach";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/daily")({
  component: () => {
    return <BreachRun seed={getStartOfDayTimestamp()} />;
  },
});
