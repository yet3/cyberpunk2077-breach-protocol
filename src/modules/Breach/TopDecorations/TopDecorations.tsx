import { Anchor } from "@common/Anchor";
import { GitHubIcon } from "@common/Icons/GitHubIcon";
import { ShareBreachButton } from "@common/ShareBreachButton";
import { GITHUB_REPO_HREF, PORTFOLIO_HREF } from "@lib";
import clsx from "clsx";
import { BreachNeonTitle } from "./NeonTitle";
import { BreachSquaresDecoration } from "./Squares";
import { PortfolioIcon } from "@common/Icons/PortfolioIcon";

export const BreachTopDecorations = () => {
  return (
    <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 lg:gap-x-4 w-full md:h-14 relative">
      <div className="h-full self-end grid grid-cols-[min-content_auto_auto]">
        <BreachNeonTitle />

        <BreachSquaresDecoration delay="0.2s" />
        <BreachSquaresDecoration />
      </div>

      <div
        className="relative grid grid-cols-[1fr_auto] md:ml-4 md:mt-0 mt-6"
        style={{
          marginRight: "var(--breach-outer-px)",
        }}
      >
        <div className="absolute w-full h-full bg-primary-500 -z-1 -top-2" />

        <div
          className={clsx({
            "w-full grid text-primary-900 p-1 relative -top-2": true,
            "2xl:grid-cols-[120px_1fr_auto] 2xl:gap-x-8": true,
            "xl:grid-cols-[85px_1fr_auto] xl:gap-x-6": true,
            "lg:grid-cols-[65px_1fr_auto] lg:gap-x-2": true,
            "md:grid-cols-[auto_auto_auto] gap-x-2": true,
            "grid-cols-[auto_1fr_auto]": true,
          })}
        >
          <p className="xl:text-4px md:text-3px text-4px sm:inline hidden self-end text-justify">
            ONLY CC35 CERTIFIED AND DHSF 5TH CLASS OFFICERS ARE ALLOWED TO
            MANIPULATE, ACCESS OR DISABLE THIS DEVICE.
          </p>
          <p className="2xl:text-9px xl:text-7px md:text-5px text-6px">
            BREACH PROTOCOL INTERFACE
          </p>
          <p className="2xl:text-9px xl:text-7px md:text-5px text-6px place-self-end sm:inline hidden">
            EKUMER 62UZ-FFLH-9YLT-E3Z7
          </p>
        </div>
        <div className="bg-page flex space-x-2 pl-2 pt-2">
          <ShareBreachButton className="text-sm sm:text-base" />
          <Anchor
            className="px-3"
            ariaLabel="Github (opens in a new tab)"
            href={GITHUB_REPO_HREF}
            content={<GitHubIcon className="fill-primary-500" />}
          />
          {/* <Anchor */}
          {/*   className="px-3" */}
          {/*   ariaLabel="Portfolio (opens in a new tab)" */}
          {/*   href={PORTFOLIO_HREF} */}
          {/*   content={<PortfolioIcon className="fill-primary-500" />} */}
          {/* /> */}
        </div>
      </div>
    </div>
  );
};
