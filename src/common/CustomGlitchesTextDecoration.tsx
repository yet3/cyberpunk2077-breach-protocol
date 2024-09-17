import clsx from "clsx";

interface IProps {
  className?: string;
}

export const CustomGlitchesTextDecoration = ({ className }: IProps) => {
  return (
    <div className={clsx("text-primary-500 text-8px leading-[1.6]", className)}>
      <p>CUSTOM GLITCHES ON UI MAY APPEAR, BASED ON THIS ANALYSIS.</p>
      <p>DOCUMENT/D/1IIJTZLABKET3JDHXCDQDTCIIHWMIZ8ZZ7VBTDESD900</p>
      <p>TYPE: CYBERSPACE</p>
    </div>
  );
};
