import { ModelLineTextDecoration } from "@common/ModelLineTextDecoration";
import { SystemImageDecoration } from "@common/SystemImageDecoration";
import { useAppStoreShallow } from "@contexts/AppStoreCtx";
import { selectBreachFinishDetails } from "@stores/root.store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isDailyBreach, saveDailyBreachFinish } from "../../../lib/daily";
import { MatrixFinishButton } from "./Button";
import { MatrixFinishCode } from "./Code";
import { MatrixFinishHeader } from "./Header";
import {
  FINISH_BODY_DUR,
  FINISH_CONTENT_DUR,
  FINISH_DELAY,
  FINISH_HEADER_DUR,
} from "./consts";

export const MatrixFinish = () => {
  const finishDetails = useAppStoreShallow(selectBreachFinishDetails);
  const [restartBreach, newBreach] = useAppStoreShallow((s) => [
    s.restartBreach,
    s.newBreach,
  ]);
  const [isCodeFinished, setIsCodeFinished] = useState(false);

  const isDaily = isDailyBreach();

  useEffect(() => {
    if (!finishDetails || !isDaily) return;
    saveDailyBreachFinish(finishDetails.isSuccess);
  }, [finishDetails, isDaily]);

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
            isSuccess={isSuccess}
            isCodeFinished={isCodeFinished}
            setIsCodeFinished={setIsCodeFinished}
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
              <span className="matrix-finish__status xs:text-xl text-lg font-medium opacity-0">
                {status.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </div>
      </div>

      <footer className="matrix-finish__footer flex justify-end space-x-4 mt-3 -z-1">
        <MatrixFinishButton
          className="xs:inline hidden"
          isSuccess={isSuccess}
          content="EXIT INTERFACE"
          onClick={() => {
            window.location.href = "about:blank";
          }}
        />
        <MatrixFinishButton
          isSuccess={isSuccess}
          content="RETRY"
          onClick={() => {
            restartBreach();
          }}
        />
        <MatrixFinishButton
          isSuccess={isSuccess}
          content="NEXT BREACH"
          onClick={() => {
            if (isDaily) {
              window.location.replace("/");
              return;
            }

            window.history.pushState({}, document.title, "/");
            newBreach({
              seed: new Date().getTime(),
            });
          }}
        />
      </footer>
    </div>
  );
};
