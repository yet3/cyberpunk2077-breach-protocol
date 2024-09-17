import clsx from "clsx";

interface IProps {
  className?: string;
}

export const ModelLineTextDecoration = ({ className }: IProps) => {
  return (
    <div className={clsx("text-7px", className)}>
      MODEL LINE <span className="xl:ml-4 ml-2">12.12AA</span>
    </div>
  );
};
