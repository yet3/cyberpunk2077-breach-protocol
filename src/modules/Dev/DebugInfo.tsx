import { useAppStore } from "@contexts/AppStoreCtx";
import clsx from "clsx";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export const DebugInfo = () => {
  const store = useAppStore((s) => s);

  return createPortal(
    <div
      id="debug-info"
      className={clsx({
        "!fixed z-[999999] left-8 bottom-8 ribbon-[12px,0px,12px,0px] ribbon-border rb-bg-page rb-primary-500": true,
      })}
    >
      <div className="border-b border-primary-500 text-primary-500 p-2 pl-4 flex items-center">
        <span>DEBUG INFO</span>
        <div className="ml-4 text-xs text-white flex space-x-2">
          <button
            type="button"
            className="p-1 border border-primary-500"
            onClick={() => store.newBreach({ seed: new Date().getTime() })}
          >
            new
          </button>
          <button
            type="button"
            className="p-1 border border-primary-500"
            onClick={() => store.restartBreach()}
          >
            restart
          </button>
          <button
            type="button"
            className="p-1 border border-primary-500"
            onClick={() => store.finishBreach()}
          >
            finish
          </button>
        </div>
      </div>
      <div className="p-3 text-sm">
        <KeyValue label="gameId" value={store.gameId} />
        <KeyValue label="seed" value={store.prng.seed} />
        <KeyValue label="time" value={store.config.time} />
        <div className="grid grid-cols-3 py-1">
          <KeyValue label="matrixCols" value={store.config.matrixCols} />
          <KeyValue label="matrixRows" value={store.config.matrixRows} />
          <KeyValue label="bufferSize" value={store.config.bufferSize} />
          <KeyValue label="solutionSize" value={store.config.solutionSize} />
          <KeyValue
            label="minSequenceSize"
            value={store.config.minSequenceSize}
          />
          <KeyValue
            label="maxSequenceSize"
            value={store.config.maxSequenceSize}
          />
          <KeyValue
            label="numberOfSequences"
            value={store.config.numberOfSequences}
          />
        </div>
        <KeyValue
          label="availableCodes"
          value={store.config.availableCodes.join(" - ")}
        />
        <KeyValue
          label="solution"
          value={store.matrixSolution
            .map((s) => `${s.code};${s.col},${s.row}`)
            .join(" -> ")}
        />
      </div>
    </div>,
    document.body,
  );
};

type IKeyValueProps = {
  label: ReactNode;
  value: ReactNode;
};

const KeyValue = ({ label, value }: IKeyValueProps) => {
  return (
    <p className="flex space-x-1">
      <span>{label}:</span>
      <span>{value}</span>
    </p>
  );
};

export default DebugInfo;
