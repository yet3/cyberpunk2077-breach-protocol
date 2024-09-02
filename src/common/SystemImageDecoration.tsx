import clsx from "clsx";

interface IProps {
  className?: string;
}

export const SystemImageDecoration = ({ className }: IProps) => {
  return (
    <div className={clsx("text-[3px] font-medium", className)}>
      <p>IMAGE NAME: IMX6-3.10.53</p>
      <p>IMAGE TYPE: ARM LINUX KERNEL</p>
      <p>LZO-COMPRESSED</p>
      <p>LOAD ADDRESS: 0x12000000</p>
    </div>
  );
};
