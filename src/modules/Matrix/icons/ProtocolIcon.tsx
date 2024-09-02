import clsx from "clsx";

interface IProps {
  className?: string;
}

export const ProtocolIcon = ({ className }: IProps) => (
  <svg
    height="28"
    viewBox="0 0 140 82"
    className={clsx("fill-primary-500", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Protocol icon</title>
    <path d="M0 0H34.1463V6.83333H0V0Z" fill="inherit" />
    <path d="M0 13.6667H34.1463V20.5H0V13.6667Z" fill="inherit" />
    <path
      d="M34.1463 6.83333H68.2927V13.6667H34.1463V6.83333Z"
      fill="inherit"
    />
    <path d="M105.854 0H140V6.83333H105.854V0Z" fill="inherit" />
    <path d="M105.854 10.25H140V17.0833H105.854V10.25Z" fill="inherit" />
    <path
      d="M71.7073 17.0833H105.854V23.9167H71.7073V17.0833Z"
      fill="inherit"
    />
    <path
      d="M34.1463 27.3333H68.2927V34.1667H34.1463V27.3333Z"
      fill="inherit"
    />
    <path d="M105.854 27.3333H140V34.1667H105.854V27.3333Z" fill="inherit" />
    <path
      d="M71.7073 68.3333H105.854V75.1667H71.7073V68.3333Z"
      fill="inherit"
    />
    <path d="M0 75.1667H34.1463V82H0V75.1667Z" fill="inherit" />
    <path d="M105.854 75.1667H140V82H105.854V75.1667Z" fill="inherit" />
    <path d="M0 34.1667H34.1463V68.3333H0V34.1667Z" fill="inherit" />
  </svg>
);
