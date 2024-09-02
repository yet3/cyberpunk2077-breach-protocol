import { useAppStore } from "@contexts/AppStoreCtx";
import { isCodeSelectable } from "@lib/Matrix.lib";
import { selectIsCodeSelected } from "@stores/buffer.slice";
import type { IMatrixCode, IMatrixSelection } from "@typings/Matrix.types";
import clsx from "clsx";

interface IProps {
  data: IMatrixCode;
  selection: IMatrixSelection;
}

export const Code = ({ data, selection }: IProps) => {
  const { id, code } = data;
  const isSelected = useAppStore(selectIsCodeSelected(data.id));
  const isSelectable = !isSelected && isCodeSelectable(selection, data);

  return (
    <li
      id={id}
      data-code={code}
      className={clsx({
        "matrix__code grid place-items-center cursor-not-allowed relative text-primary-500 leading-none": true,
        //
        "matrix__code--selectable": isSelectable,
        //
        "matrix__code--selected border-2 border-transparent": isSelected,
      })}
      style={{
        fontSize: "var(--matrix-code-font-size)",
        width: "var(--matrix-code-size)",
        height: "var(--matrix-code-size)",
      }}
    />
  );
};
