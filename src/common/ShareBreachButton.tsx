import { useAppStore } from "@contexts/AppStoreCtx";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonVariant } from "./Button";

interface IProps {
  className?: string;
}

export const ShareBreachButton = ({ className }: IProps) => {
  const seed = useAppStore((s) => s.prng.seed);
  const [status, setStatus] = useState<"ok" | "fail" | "idle">("idle");

  const timeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timeout.current != null) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    try {
      const url = new URL(window.location.origin);
      url.pathname += `${seed}`;

      await navigator.clipboard.writeText(url.toString());
      setStatus("ok");
    } catch (e) {
      setStatus("fail");
    }

    timeout.current = setTimeout(() => {
      setStatus("idle");
      timeout.current = null;
    }, 1000);
  };

  return (
    <Button
      className={className}
      content={
        status === "ok"
          ? "URL IN MEMORY"
          : status === "fail"
            ? "TRANSFER ERROR"
            : "SHARE VIA URL"
      }
      variant={
        status === "ok"
          ? ButtonVariant.SUCCESS
          : status === "fail"
            ? ButtonVariant.DANGER
            : ButtonVariant.PRIMARY
      }
      onClick={handleCopy}
    />
  );
};
