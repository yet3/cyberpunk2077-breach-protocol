import { OutsideLineSquareDecoration } from "@common/OutsideLineSquareDecoration";
import { useAppStore } from "@contexts/AppStoreCtx";
import { SequencesBottomDecorations } from "./BottomDecorations";
import { SequencesColHighlight } from "./ColHighlight";
import { SequencesHeader } from "./Header";
import { Sequence } from "./Sequence";

export const Sequences = () => {
  const sequences = useAppStore((s) => s.sequences);

  return (
    <div className="sequences-wrapper relative lg:order-none -order-1">
      <OutsideLineSquareDecoration
        className="h-28 bottom-full right-4"
        rectPos="right-top"
      />

      <div className="animate-scale-from-left flex flex-col relative">
        <div className="drop-shadow-primary-500">
          <SequencesHeader />
          <ul
            className="anim__scale-form-top grid border border-primary-500/70 border-t-0 bg-page relative"
            data-2ed-delay="true"
            style={{
              padding: "var(--sequences-inner-py) var(--sequences-inner-px)",
            }}
          >
            <SequencesColHighlight />
            {sequences.map((sequence) => (
              <Sequence key={sequence.id} sequence={sequence} />
            ))}
          </ul>
        </div>

        <SequencesBottomDecorations />
      </div>
    </div>
  );
};
