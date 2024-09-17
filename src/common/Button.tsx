import clsx from "clsx";
import type { ReactNode } from "react";

export enum ButtonVariant {
  PRIMARY = "PRIMARY",
  DANGER = "DANGER",
  SUCCESS = "SUCCESS",
}

interface IProps {
  className?: string;
  content: ReactNode;
  variant?: ButtonVariant;

  onClick: () => void;
}

export const Button = ({
  className,
  content,
  onClick,
  variant = ButtonVariant.PRIMARY,
}: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(className, {
        "button-base": true,
        "button-primary": variant === ButtonVariant.PRIMARY,
        "button-success": variant === ButtonVariant.SUCCESS,
        "button-danger": variant === ButtonVariant.DANGER,
      })}
    >
      {content}
    </button>
  );
};
