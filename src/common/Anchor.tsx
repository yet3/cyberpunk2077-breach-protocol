import clsx from "clsx";
import type { ReactNode } from "react";

export enum AnchorKind {
  TEXT = "TEXT",
  BUTTON = "BUTTON",
}

export enum AnchorVariant {
  PRIMARY = "PRIMARY",
  DANGER = "DANGER",
  SUCCESS = "SUCCESS",
}

interface IProps {
  className?: string;
  content: ReactNode;
  variant?: AnchorVariant;
  kind?: AnchorKind;
  openInNewTab?: boolean;
  href: string;
}

export const Anchor = ({
  className,
  kind = AnchorKind.BUTTON,
  content,
  variant = AnchorVariant.PRIMARY,
  href,
  openInNewTab = true,
}: IProps) => {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target={openInNewTab ? "_blank" : "_self"}
      className={clsx(
        className,
        kind === AnchorKind.BUTTON
          ? {
              "button-base": true,
              "button-primary": variant === AnchorVariant.PRIMARY,
              "button-success": variant === AnchorVariant.SUCCESS,
              "button-danger": variant === AnchorVariant.DANGER,
            }
          : kind === AnchorKind.TEXT && "anchor-text",
      )}
    >
      {content}
    </a>
  );
};
