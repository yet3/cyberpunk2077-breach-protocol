import { KeyDecoration } from "@common/KeyDecoration";
import { OutsideLineSquareDecoration } from "@common/OutsideLineSquareDecoration";
import { useAppStore } from "@contexts/AppStoreCtx";
import { Sequence } from "./Sequence";
import { SequencesHighlight } from "./SequencesHighlight";

export const Sequences = () => {
  const sequences = useAppStore((s) => s.sequences);

  // TODO: remove
  const setSeed = useAppStore((s) => s.setSeed);

  return (
    <div className="sequences-wrapper relative">
      <OutsideLineSquareDecoration
        className="h-28 bottom-full right-4"
        rectPos="right-top"
      />

      <div className="animate-sequences opacity-0 origin-left scale-x-0 flex flex-col relative">
        <div className="drop-shadow-primary-500">
          <header className="sequences__header text-primary-500 flex items-center pr-8 bg-primary-500/70 relative ribbon-tl h-10 pl-4">
            <div className="ml-1 w-6 h-6 border border-primary-500 mr-3 grid grid-cols-[1fr_1fr] gap-[2px] pb-[3px]">
              <span className="text-[7px] col-span-full">A S51</span>
              <div className="w-2 h-2 bg-primary-500 rounded-full justify-self-end" />
              <div className="w-2 h-2 bg-primary-500 rounded-full justify-self-start" />
            </div>
            <h3 className="mr-24 font-light text-lg">
              SEQUENCE REQUIRED TO UPLOAD DAEMON
            </h3>
            <p className="text-[9px] self-end mb-1">
              MODEL LINE <span className="ml-4">12.12AA</span>
            </p>
          </header>
          <ul
            className="sequences__body origin-top scale-y-0 grid border border-primary-500/70 border-t-0 bg-page relative"
            style={{
              padding: "var(--sequences-inner-py) var(--sequences-inner-px)",
            }}
          >
            <SequencesHighlight />
            {sequences.map((sequence) => (
              <Sequence key={sequence.id} sequence={sequence} />
            ))}
          </ul>
        </div>

        {/* <div className="sequences__decorations opacity-0 mt-2 grid grid-cols-[1fr_auto]"> */}
        <div className="sequences__decorations opacity-0 mt-2 grid grid-cols-[1fr_auto_auto_auto]">
          <div className="text-primary-500 text-[8px] leading-[1.6]">
            <p>CUSTOM GLITCHES ON UI MAY APPEAR, BASED ON THIS ANLAYSIS.</p>
            <p>DOCUMENT/D/1IIJTZLABKET3JDHXCDQDTCIIHWMIZ8ZZ7VBTDESD900</p>
            <p>TYPE: CYERSPACE</p>
          </div>

          {/* TODO: remove */}
          <button
            type="button"
            className="ml-4 px-2 border border-primary-500 mr-8"
            onClick={() => {
              window.history.replaceState({}, document.title, window.location.href.replace(/\?.*$/, ''));
              setSeed(new Date().getTime());
            }}
          >
            NEW BREACH (just seed)
          </button>

          <KeyDecoration />
        </div>
      </div>
    </div>
  );
};
