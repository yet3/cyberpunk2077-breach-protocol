import { type FileRoutesByPath, Link } from "@tanstack/react-router";
import clsx from "clsx";
import type { ReactNode } from "react";

export enum RouterLinkVariant {
  PRIMARY = "PRIMARY",
  DANGER = "DANGER",
  SUCCESS = "SUCCESS",
}

interface IProps {
  className?: string;
  content: ReactNode;
  variant?: RouterLinkVariant;

  to: keyof FileRoutesByPath;
}

export const RouterLink = ({
  className,
  content,
  to,
  variant = RouterLinkVariant.PRIMARY,
}: IProps) => {
  return (
    <Link
      to={to}
      className={clsx(className, {
        "button-base": true,
        "button-primary": variant === RouterLinkVariant.PRIMARY,
        "button-success": variant === RouterLinkVariant.SUCCESS,
        "button-danger": variant === RouterLinkVariant.DANGER,
      })}
    >
      {content}
    </Link>
  );
};
