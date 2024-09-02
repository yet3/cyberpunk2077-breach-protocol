import clsx from "clsx";

interface IProps {
  isSuccess: boolean;
  content: string;
  onClick: () => void;
}

export const MatrixFinishButton = ({ isSuccess, content, onClick }: IProps) => {
  return (
    <button
      type="button"
      className={clsx({
        "uppercase py-2 px-4 text-lg ribbon-br ribbon-border ": true,
        "text-success-400 rb-bg-success-700 rb-success-400 hover:rb-bg-success-500 hover:text-success-900":
          isSuccess,
        "text-danger-400 rb-bg-danger-700 rb-danger-400 hover:rb-bg-danger-500 hover:text-danger-900":
          !isSuccess,
      })}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
