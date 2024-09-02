import { ModelLineTextDecoration } from "@common/ModelLineTextDecoration";
import { SystemImageDecoration } from "@common/SystemImageDecoration";
import clsx from "clsx";
import { MatrixIcon } from "../icons/MatrixIcon";

interface IProps {
  isSuccess: boolean;
}

export const MatrixFinishHeader = ({ isSuccess }: IProps) => {
  return (
    <header
      className={clsx({
        "h-9 relative pl-4 flex items-center ": true,
        "drop-shadow-danger-500 text-danger-900": !isSuccess,
        "drop-shadow-success-500 text-success-900": isSuccess,
      })}
    >
      <MatrixIcon className="matrix-finish__header-icon" />
      <div
        className={clsx({
          "matrix-finish__header": true,
          "w-full h-full ribbon-tl top-0 left-0 -z-1 ribbon-border !absolute": true,
          "rb-bg-success-500 rb-success-400": isSuccess,
          "rb-bg-danger-500 rb-danger-400": !isSuccess,
        })}
      >
        <div className="matrix-finish__header-decoration h-full absolute right-0 mr-3 flex space-x-16">
          <ModelLineTextDecoration className="mt-1.5" />
          <SystemImageDecoration className="self-center" />
        </div>
      </div>
    </header>
  );
};
