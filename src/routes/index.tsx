import { BreachRun } from "@modules/BreachRun/BreachRun";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log();
    return (
      <BreachRun
        config={{
          // seed: new Date().getTime(),
          seed: Number(searchParams.get('seed') ?? '481'),
          time: 50,
        }}
      />
    );
  },
});
