import "./Buffer.scss";
import { useAppStoreShallow } from "@contexts/AppStoreCtx";
import clsx from "clsx";
import { BufferCaret } from "./BufferCaret";
import { BufferCodesDashedBorder } from "./BufferCodeDashedBorder";
import { BufferTitle } from "./BufferTitle";

export const Buffer = () => {
  const { bufferSize, selectedCodes, hoveredCode } = useAppStoreShallow(
    (s) => ({
      bufferSize: s.config.bufferSize,
      selectedCodes: s.selectedCodes,
      hoveredCode: s.hoveredCode,
    }),
  );

  return (
    <div className="flex relative items-center lg:mt-0 lg:mx-0 mt-5 mx-auto">
      <BufferTitle />
      <div
        className="animate-scale-from-left w-fit p-3 border border-primary-500 flex bg-page/80"
        data-2ed-delay={true}
      >
        <ul className="flex items-center gap-2">
          {Array(bufferSize)
            .fill(null)
            .map((_, idx) => {
              const isActive = selectedCodes.length === idx && !!hoveredCode;
              const isFilled = selectedCodes.length > idx;
              return (
                <li
                  key={`${bufferSize}-${idx}`}
                  className={clsx({
                    "buffer-code w-8 h-8 text-lg grid place-items-center relative text-primary-500": true,
                    "pb-1": !isFilled,
                    //
                    // Active
                    "outline outline-accent-500 -outline-offset-1 text-accent-500 pb-1 code-glow animate-code-glow-pulse":
                      isActive,
                    //
                    // Filled
                    "buffer-code--filled outline outline-primary-500/60 -outline-offset-1":
                      isFilled,
                  })}
                >
                  <BufferCaret isActive={isActive} />
                  {!isFilled && <BufferCodesDashedBorder isActive={isActive} />}
                  {isActive ? hoveredCode?.code : selectedCodes[idx]?.code}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
