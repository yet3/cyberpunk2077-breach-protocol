import { BreachRun } from "@modules/BreachRun/BreachRun";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <BreachRun
        config={{
          seed: 481,
        }}
      />
    );
  },
});
