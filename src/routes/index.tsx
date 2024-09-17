import { BreachRun } from "@modules/Breach";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return <BreachRun seed={new Date().getTime()} />;
  },
});
