import { BufferIcon } from "@modules/Header/Buffer/BufferIcon";
import clsx from "clsx";

export const BufferTitle = () => {
  return (
    <div
      className={clsx({
        "animate-scale-from-left flex items-center text-2xl text-primary-500 tracking-wide": true,
        "lg:absolute lg:left-0": true,
      })}
      style={{
        bottom: "calc(100% + 0.5rem)",
        height: "var(--breach-inner-pt)",
      }}
    >
      <BufferIcon className="w-auto h-full lg:py-1.5 lg:mr-3 mr-4" />
      <span className="lg:inline hidden">BUFFER</span>
    </div>
  );
};
