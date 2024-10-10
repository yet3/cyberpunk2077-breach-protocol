import { ModelLineTextDecoration } from "@common/ModelLineTextDecoration";
import clsx from "clsx";

export const SequencesHeader = () => {
  return (
    <header
      className={clsx({
        sequences__header: true,
        "text-primary-500 flex items-center xl:pr-8 pr-4 bg-primary-500/70 relative ribbon-tl h-10 pl-4": true,
      })}
    >
      <div className="ml-1 w-6 h-6 border border-primary-500 mr-3 grid grid-cols-[1fr_1fr] gap-[2px] pb-[3px]">
        <span className="text-7px col-span-full">A S51</span>
        <div className="w-2 h-2 bg-primary-500 rounded-full justify-self-end" />
        <div className="w-2 h-2 bg-primary-500 rounded-full justify-self-start" />
      </div>
      <h3 className="2xl:text-lg xl:text-base xs:text-sm text-xs">
        SEQUENCE REQUIRED TO UPLOAD DAEMON
      </h3>
      <ModelLineTextDecoration className="2xl:ml-24 xl:ml-12 ml-6 2xl:text-9px text-7px self-end mb-1 xs:inline hidden" />
    </header>
  );
};
