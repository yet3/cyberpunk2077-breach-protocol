import clsx from "clsx";

interface IProps {
  className?: string;
}

export const MatrixIcon = ({ className }: IProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 314 314"
    className={clsx("fill-black", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Matrix icon</title>
    <path d="M0 162.815H11.6296L104.667 314H0V162.815Z" fill="black" />
    <path
      d="M0 7.20962e-06H11.6296L104.667 151.185H0V7.20962e-06Z"
      fill="inherit"
    />
    <path
      d="M139.556 314H127.926L34.8889 162.815L139.556 162.815L139.556 314Z"
      fill="inherit"
    />
    <path
      d="M174.444 162.815H186.074L279.111 314H174.444V162.815Z"
      fill="inherit"
    />
    <path
      d="M314 314H302.37L209.333 162.815L314 162.815L314 314Z"
      fill="inherit"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M127.926 128.995L55.7009 11.6296L127.926 11.6296L127.926 128.995ZM127.926 151.185H139.556L139.556 9.15025e-06L34.8889 0L127.926 151.185Z"
      fill="inherit"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M302.37 128.995L230.145 11.6296L302.37 11.6296L302.37 128.995ZM302.37 151.185H314L314 9.15025e-06L209.333 0L302.37 151.185Z"
      fill="inherit"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M186.074 22.1898L258.299 139.556H186.074V22.1898ZM186.074 7.20962e-06H174.444V151.185H279.111L186.074 7.20962e-06Z"
      fill="inherit"
    />
  </svg>
);
