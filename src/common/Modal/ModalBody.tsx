import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

type IProps = PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>;

export const ModalBody = ({ children, ...props }: IProps) => {
  return <main {...props}>{children}</main>;
};
