import clsx from "clsx";

interface IProps {
  isActive: boolean;
}

export const BufferCodesDashedBorder = ({ isActive }: IProps) => (
  <svg
    width="100%"
    viewBox="0 0 262 262"
    className={clsx(
      "absolute pointer-events-none",
      isActive ? "fill-transparent" : "fill-primary-500/60",
    )}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Buffer code dashed border</title>
    <path
      d="M7.15775e-07 2.14732e-06H8.1875V49.125H7.15775e-07V2.14732e-06Z"
      fill="inherit"
    />
    <path
      d="M49.125 2.14732e-06V8.1875L0 8.1875L7.15775e-07 2.14732e-06H49.125Z"
      fill="inherit"
    />
    <path
      d="M3.57888e-07 90.0625H8.1875V171.938H3.57888e-07V90.0625Z"
      fill="inherit"
    />
    <path
      d="M2.50521e-06 262L2.14732e-06 253.812H49.125V262H2.50521e-06Z"
      fill="inherit"
    />
    <path
      d="M3.57888e-07 212.875H8.1875V262H2.50521e-06L3.57888e-07 212.875Z"
      fill="inherit"
    />
    <path d="M262 2.14732e-06H253.812V49.125H262V2.14732e-06Z" fill="inherit" />
    <path
      d="M212.875 2.14732e-06V8.1875L262 8.1875V2.14732e-06H212.875Z"
      fill="inherit"
    />
    <path d="M262 90.0625H253.812V171.938H262V90.0625Z" fill="inherit" />
    <path d="M171.938 0H90.0625V8.1875H171.938V0Z" fill="inherit" />
    <path d="M171.938 253.812H90.0625V262H171.938V253.812Z" fill="inherit" />
    <path d="M262 262V253.812H212.875V262H262Z" fill="inherit" />
    <path d="M262 212.875H253.812V262H262V212.875Z" fill="inherit" />
  </svg>
);
