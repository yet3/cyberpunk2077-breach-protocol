import { ModelLineTextDecoration } from "@common/ModelLineTextDecoration";
import { SystemImageDecoration } from "@common/SystemImageDecoration";
import { useAppStore, useAppStoreShallow } from "@contexts/AppStoreCtx";
import { selectBreachFinishDetials } from "@stores/root.store";
import clsx from "clsx";
import { useState } from "react";
import { MatrixFinishButton } from "./Button";
import { MatrixFinishCode } from "./Code";
import { MatrixFinishHeader } from "./Header";
import {
  FINISH_BODY_DUR,
  FINISH_CONTENT_DUR,
  FINISH_DELAY,
  FINISH_HEADER_DUR,
} from "./const";

export const MatrixFinish = () => {
  const finishDetails = useAppStoreShallow(selectBreachFinishDetials);
  const resetStore = useAppStore((s) => s.resetStore);
  const [isCodeFinished, setIsCodeFinished] = useState(false);

  if (!finishDetails) return null;
  const { isSuccess, status } = finishDetails;
  return (
    <div
      className="absolute z-10 w-full flex flex-col"
      style={{
        // @ts-expect-error: custom css vars
        "--finish_delay": `${FINISH_DELAY}ms`,
        "--finish_header_dur": `${FINISH_HEADER_DUR}ms`,
        "--finish_body_dur": `${FINISH_BODY_DUR}ms`,
        "--finish_content_dur": `${FINISH_CONTENT_DUR}ms`,
        //
        "--start-bg": `hsl(var(--${isSuccess ? "success" : "danger"}-500))`,
        "--end-bg": `hsl(var(--${isSuccess ? "success" : "danger"}-800))`,
      }}
    >
      <MatrixFinishHeader isSuccess={isSuccess} />

      <div className="matrix-finish__body w-full flex flex-col">
        <div
          className={clsx({
            "drop-shadow-danger-500 text-danger-900": !isSuccess,
            "drop-shadow-success-500 text-success-900": isSuccess,
          })}
        >
          <MatrixFinishCode
            {...{ isSuccess, isCodeFinished, setIsCodeFinished }}
          />

          <div
            className={clsx({
              "w-full ribbon-br ribbon-border h-24 flex items-center justify-center": true,
              "rb-bg-success-500 rb-success-400": isSuccess,
              "rb-bg-danger-500 rb-danger-400": !isSuccess,
            })}
          >
            <div className="absolute top-0 right-0 mt-1.5 mr-3 flex space-x-16">
              <ModelLineTextDecoration />
              <SystemImageDecoration className="mt-1.5" />
            </div>

            {isCodeFinished && (
              <span className="matrix-finish__status text-xl font-medium opacity-0">
                {status.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </div>
      </div>

      <footer className="matrix-finish__footer flex justify-end space-x-4 mt-3 -z-1">
        <MatrixFinishButton
          isSuccess={isSuccess}
          content="EXIT INTERFACE"
          onClick={() => {
            window.open("about:blank");
          }}
        />
        <MatrixFinishButton
          isSuccess={isSuccess}
          content="RETRY"
          onClick={() => {
            resetStore();
          }}
        />
        <MatrixFinishButton
          isSuccess={isSuccess}
          content="NEXT BREACH"
          onClick={() => {}}
        />
      </footer>
    </div>
  );
};
