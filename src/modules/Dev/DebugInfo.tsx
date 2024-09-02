import { useAppStore } from "@contexts/AppStoreCtx";
import clsx from "clsx";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export const DebugInfo = () => {
  const store = useAppStore(s => s)

  return createPortal(
    <div
      id="debug-info"
      className={clsx({
        "!fixed z-[999999] right-8 bottom-8 ribbon-br ribbon-border rb-bg-page rb-primary-500": true,
        "p-3 text-sm": true,
      })}
    >
      <KeyValue label="gameId" value={store.gameId} />
      <KeyValue label="seed" value={store.config.seed} />
      <KeyValue label="time" value={store.config.time} />
      <KeyValue label="matrixCols" value={store.config.matrixCols} />
      <KeyValue label="matrixRows" value={store.config.matrixRows} />
      <KeyValue label="bufferSize" value={store.config.bufferSize} />
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
