import { useRerender } from "@common/useRerender";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { SetStateAction } from "react";
import {
  CARET_CHARS,
  FAILURE_CODE,
  FINISH_CODE_DUR,
  SUCCESS_CODE,
} from "./consts";

interface IProps {
  isSuccess: boolean;
  isCodeFinished: boolean;
  setIsCodeFinished: (s: SetStateAction<boolean>) => void;
}

export const MatrixFinishCode = ({
  isSuccess,
  isCodeFinished,
  setIsCodeFinished,
}: IProps) => {
  const rerender = useRerender();
  const codeContent = useRef<string>("");
  const caretChar = useRef<string>("");

  useEffect(() => {
    const isMounted = { value: true };

    const FPS_INTERVAL = 1000 / 30;

    const CODE = isSuccess ? SUCCESS_CODE : FAILURE_CODE;
    const start = new Date().getTime();
    let then = start;
    let charsToWrite = 8;
    const animateText = () => {
      if (!isMounted.value) return;
      if (codeContent.current.length >= CODE.length) {
        caretChar.current = "";
        setIsCodeFinished(true);
        return;
      }

      const now = new Date().getTime();
      const elapsed = now - then;

      if (elapsed > FPS_INTERVAL) {
        if (codeContent.current.length > 24) charsToWrite = 16;
        then = now - (elapsed % FPS_INTERVAL);
        codeContent.current += CODE.substring(
          codeContent.current.length,
          codeContent.current.length + charsToWrite,
        );

        caretChar.current =
          CARET_CHARS[Math.floor(Math.random() * CARET_CHARS.length)];
        rerender();
      }

      requestAnimationFrame(animateText);
    };

    const timeout = setTimeout(() => {
      then = new Date().getTime();

      requestAnimationFrame(animateText);
    }, FINISH_CODE_DUR + 150);

    return () => {
      isMounted.value = false;
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <div
      className={clsx({
        "matrix-finish__code font-medium w-full border-l border-r py-4 2xl:px-8 px-4 whitespace-pre-line leading-tight text-base": true,
        "border-success-400 bg-success-500 text-success-400": isSuccess,
        "border-danger-400 bg-danger-500 text-danger-300": !isSuccess,
      })}
    >
      <span
        className={clsx({
          absolute: true,
          "matrix-finish__code-blink": isCodeFinished,
        })}
      >
        {codeContent.current}
        {caretChar.current}
      </span>
      <span className="opacity-0 pointer-events-none">{SUCCESS_CODE}</span>
    </div>
  );
};
