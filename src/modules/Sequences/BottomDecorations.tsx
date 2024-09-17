import { CustomGlitchesTextDecoration } from "@common/CustomGlitchesTextDecoration";
import { KeyDecoration } from "@common/KeyDecoration";

export const SequencesBottomDecorations = () => {
  return (
    <div className="animate-blink-in mt-2 grid grid-cols-[1fr_auto]">
      <CustomGlitchesTextDecoration />
      <KeyDecoration />
    </div>
  );
};
