import { BreachRun } from "@modules/BreachRun/BreachRun";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/daily")({
  component: () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const timestamp = startOfDay.getTime() / 10000;
    return (
      <BreachRun
        config={{
          seed: timestamp
        }}
      />
    );
  },
});
