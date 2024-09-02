import { InnerLinesDecoration } from "@common/InnerLinesDecoration";
import { OutsideLineSquareDecoration } from "@common/OutsideLineSquareDecoration";

export const BreachDecorations = () => {
  return (
    <>
      <InnerLinesDecoration animateTo="right" />
      <InnerLinesDecoration animateTo="left" />

      <div className="breach-inner-decoration-rect absolute border border-primary-500/40" />

      <OutsideLineSquareDecoration
        className="h-36 top-[15%] -left-3"
        rectPos="left-bottom"
      />
      <OutsideLineSquareDecoration
        className="h-10 top-[55%] -left-3"
        rectPos="left-top"
      />
      <OutsideLineSquareDecoration
        className="h-6 top-3/4 -right-3"
        rectPos="right-top"
      />
    </>
  );
};
