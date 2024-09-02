import clsx from "clsx";
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

type IProps = PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>;

export const ModalFooter = ({ children, className, ...props }: IProps) => {
  return (
    <footer {...props} className={clsx("flex justify-end mt-2", className)}>
      {children}
    </footer>
  );
};
