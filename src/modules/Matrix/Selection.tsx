import { useAppStore } from "@contexts/AppStoreCtx";
import {
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import clsx from "clsx";

interface IProps {
  direction: MatrixSelectionDirection;
  selection: IMatrixSelection;
}

export const MatrixSelection = ({ direction, selection }: IProps) => {
  const hoveredCode = useAppStore((s) => s.hoveredCode);

  let topMulti = 0;
  let leftMulti = 0;
  let marginTopMulti = 1;
  let width = "100%";
  let height = "var(--matrix-code-size)";

  if (direction === MatrixSelectionDirection.ROW) {
    if (selection.direction === MatrixSelectionDirection.ROW)
      topMulti = selection.value;
    else if (hoveredCode) topMulti = hoveredCode.row;
  } else {
    width = "var(--matrix-code-size)";
    height = "calc(100% + var(--matrix-inner-py) * 2)";
    marginTopMulti = -1;
    if (selection.direction === MatrixSelectionDirection.COL) {
      leftMulti = selection.value;
    } else if (hoveredCode) leftMulti = hoveredCode.col;
  }

  const isSupporting = direction !== selection.direction;
  return (
    <div
      className={clsx({
        "absolute pointer-events-none": true,
        "bg-matrix-primary-selection": !isSupporting,
        "bg-matrix-secondary-selection": isSupporting,
      })}
      style={{
        marginTop: `calc(var(--matrix-inner-py) * ${marginTopMulti})`,
        top: `calc(${topMulti} * var(--matrix-code-size))`,
        left: `calc(${leftMulti} * var(--matrix-code-size))`,
        width,
        height,
        opacity: !isSupporting ? 1 : hoveredCode != null ? 1 : 0,
      }}
    />
  );
};
