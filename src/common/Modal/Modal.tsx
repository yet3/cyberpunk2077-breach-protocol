import type { ReactNode } from "@tanstack/react-router";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

interface IProps {
  width?: string;
  header?: null | ReactNode;
  body?: null | ReactNode;
  footer?: null | ReactNode;

  noBackdrop?: boolean;

  topClass?: string;
}

export const Modal = ({
  width,
  header,
  body,
  footer,
  noBackdrop,
  topClass,
}: IProps) => {
  const modalsRoot = document.querySelector("#modals");
  if (!modalsRoot) throw Error("#modals element is not defined!");

  return createPortal(
    <div
      className={clsx(
        "absolute w-full h-full grid place-items-center",
        topClass,
      )}
    >
      {!noBackdrop && (
        <div className="absolute inset-0 w-full h-full before:w-full before:h-full before:absolute before:bg-[url('@assets/noise.webp')] before:opacity-[0.03] after:absolute after:inset-0 after:w-full after:h-full after:bg-accent-300/10" />
      )}

      <aside className="flex flex-col" style={{ width }}>
        <div className="relative">
          <div
            className={clsx(
              "absolute left-[calc(100%-1.5px)] top-1/2 -translate-y-1/2 bg-accent-500 w-2 h-1/2 ribbon-[0px,6px,6px]",
              "before:absolute before:w-[calc(100%-1.5px)] before:h-[calc(100%-3px)] before:top-[1.5px] before:left-[0px] before:bg-modal before:ribbon-[0px,5px,5px] before:-z-1",
            )}
          />

          <div
            className={clsx(
              "p-6 ribbon-br",
              "ribbon-border rb-accent-500 rb-bg-modal",
            )}
          >
            {header && <ModalHeader>{header}</ModalHeader>}
            {body && <ModalBody>{body}</ModalBody>}
          </div>
        </div>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </aside>
    </div>,
    modalsRoot,
  );
};
