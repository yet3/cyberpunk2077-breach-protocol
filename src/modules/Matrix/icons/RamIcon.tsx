import clsx from "clsx";

interface IProps {
  className?: string;
}

const AMT_OF_TEETH = 7;

const makeRamCliPath = () => {
  const T = (base: number) => {
    return `${base + 5}% 75%, ${base + 10}% 100%`;
  };

  const base = 100 - AMT_OF_TEETH * 10;
  let teeth = "";
  for (let i = 0; i < AMT_OF_TEETH; i++) {
    teeth += `${T(base + i * 10)},`;
  }

  return `polygon(0 0, 0 100%, ${base}% 100%, ${teeth} 100% 0)`;
};

const ICON_CLIP_PATH = makeRamCliPath();

export const RamIcon = ({ className }: IProps) => {
  return (
    <div className={clsx("relative w-fit h-min", className)}>
      <div
        className="text-primary-900 text-7px font-medium leading-none w-full pl-0.5 pb-0.5 pr-2 bg-primary-500 rounded-tr-[1px]"
        style={{
          clipPath: ICON_CLIP_PATH,
        }}
      >
        00033 05 64 0B CP
      </div>

      <div className="relative w-full ml-0.5 mt-0.5 flex">
        <div className="flex space-x-0.5">
          <div className="bg-primary-500 w-0.5 h-1 rounded-xs" />
          <div className="border-[0.5px] border-primary-500/50 w-1 h-1 relative after:absolute after:w-1 after:h-1px after:bg-primary-500/60 after:rotate-45 after:-top-[0.5px] after:left-0 after:origin-top-left" />
          <div className="bg-primary-500 w-0.5 h-1 rounded-xs" />
        </div>

        <div className="bg-primary-500 w-0.5 h-1 rounded-xs ml-1.5" />

        <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs mt-0.5 ml-1.5" />

        <div className="bg-primary-500 w-0.5 h-1 rounded-xs ml-0.5" />
        <div className="ml-0.5">
          <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs" />
          <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs" />
        </div>

        <div className="bg-primary-500 w-0.5 h-1 rounded-xs ml-2.5" />
        <div className="ml-0.5">
          <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs" />
          <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs" />
        </div>

        <div className="bg-primary-500 w-0.5 h-0.5 rounded-xs ml-1" />
      </div>
    </div>
  );
};
