import { useAppStore } from "@contexts/AppStoreCtx";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonVariant } from "./Button";

export const ShareBreachButton = () => {
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
      content={
        status === "ok"
          ? "URL in Memory"
          : status === "fail"
            ? "Transfer Error"
            : "Share via URL"
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
