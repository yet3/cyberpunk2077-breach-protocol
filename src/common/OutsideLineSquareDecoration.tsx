import clsx from "clsx";

interface IProps {
  className?: string;
  rectPos: "left-top" | "left-bottom" | "right-top";
}

export const OutsideLineSquareDecoration = ({ className, rectPos }: IProps) => {
  return (
    <div className={clsx("bg-primary-500 w-[3px] rounded-[1px] absolute z-1", className)}>
      <div
        className={clsx({
          "w-[5px] h-[5px] bg-primary-500/40 absolute": true,
          "left-full ml-1 top-0": rectPos === 'right-top',
          "right-full mr-1 top-0": rectPos === 'left-top',
          "right-full mr-1 bottom-0": rectPos === 'left-bottom',
        })}
      />
    </div>
  );
};
