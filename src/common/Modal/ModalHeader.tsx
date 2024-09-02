import type { PropsWithChildren } from "react";

type IProps = PropsWithChildren<{}>;

export const ModalHeader = ({ children }: IProps) => {
  return (
    <header className="border-b-2 border-accent-500 pb-1.5 mb-4">
      <h2 className="font-semibold text-2xl text-accent-500">{children}</h2>
    </header>
  );
};
