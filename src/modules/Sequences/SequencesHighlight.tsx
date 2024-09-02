import { useAppStoreShallow } from "@contexts/AppStoreCtx";

export const SequencesHighlight = () => {
  const { isHidden, amtOfCodes } = useAppStoreShallow((s) => ({
    amtOfCodes: s.selectedCodes.length,
    isHidden:
      s.sequences.filter((seq) => seq.status === "in-progress").length === 0,
  }));

  if (isHidden) return null;
  return (
    <div
      className="bg-sequences-highlight absolute"
      style={{
        top: "var(--sequences-inner-py)",
        left: "var(--sequences-inner-px)",
        width: "var(--sequences-code-size)",
        height: "calc(100% - (var(--sequences-inner-py) * 2))",
        transform: `translateX(calc(${amtOfCodes} * (var(--sequences-codes-gap) + var(--sequences-code-size))))`,
        transition: "transform 300ms ease",
      }}
    />
  );
};
