import clsx from "clsx";
import type { ReactNode } from "react";

export enum ButtonVariant {
  PRIMARY = "PRIMARY",
  DANGER = "DANGER",
  SUCCESS = "SUCCESS",
}

interface IProps {
  content: ReactNode;
  variant?: ButtonVariant;

  onClick: () => void;
}

export const Button = ({
  content,
  onClick,
  variant = ButtonVariant.PRIMARY,
}: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx({
        "ribbon-br ribbon-border rb-bg-page px-4 py-2": true,
        "rb-primary-500 text-primary-500": variant === ButtonVariant.PRIMARY,
        "rb-success-500 text-success-500": variant === ButtonVariant.SUCCESS,
        "rb-danger-500 text-danger-500": variant === ButtonVariant.DANGER,
      })}
    >
      {content}
    </button>
  );
};
