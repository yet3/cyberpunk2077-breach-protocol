import { ExternalLinkIcon } from "@common/Icons/ExternalLinkIcon";
import { type ReactNode, useMemo } from "react";
import { isDailyBreach } from "../../../lib/daily";

export const BreachNeonTitle = () => {
  const neons = useMemo(() => {
    const els: ReactNode[] = [];
    for (let i = 0; i < 8; i++) {
      els.push(<div key={`neons-${i}`} className="h-1px bg-primary-300" />);
    }
    return els;
  }, []);

  return (
    <div className="2xl:w-96 w-[340px] h-14 md:mr-auto relative">
      <div className="animate-breach-top-decoration-neons grid gap-y-1 items-start relative h-full">
        {neons}
      </div>

      <a
        href="https://www.cyberpunk.net"
        rel="noopener noreferrer"
        target="_blank"
      >
        <h1 className="absolute text-xl tracking-wider bg-page text-primary-500 px-2 top-1/2 left-3 -translate-y-1/2 flex items-center">
          CYBERPUNK 2077
          <ExternalLinkIcon className="ml-2 fill-current" />
          {isDailyBreach() && <span className="ml-2">{" / Daily"}</span>}
        </h1>
      </a>
    </div>
  );
};
