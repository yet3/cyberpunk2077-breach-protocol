import type { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content?: ReactNode | string;
}

export const ModalButton = ({ content, className, ...props }: IProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "py-2 px-5 text-red-400 tracking-wider font-medium",
        "ribbon-[0px,0px,14px] ribbon-border rb-accent-500 rb-bg-modal",
        className,
      )}
    >
      {content}
    </button>
  );
};
