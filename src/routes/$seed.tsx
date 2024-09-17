import { BreachRun } from "@modules/Breach";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$seed")({
  component: () => {
    const { seed } = Route.useParams();

    let parsedSeed = Number.parseInt(seed, 10);
    if (Number.isNaN(parsedSeed)) {
      parsedSeed = new Date().getTime();
    }

    return <BreachRun seed={parsedSeed} />;
  },
});
