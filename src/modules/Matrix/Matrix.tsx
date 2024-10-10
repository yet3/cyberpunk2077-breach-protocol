import "./Matrix.scss";
import { useAppStore, useAppStoreShallow } from "@contexts/AppStoreCtx";
import { isCodeSelectable, isNodeACode } from "@lib";
import { selectIsBreachFinished } from "@stores/root.store";
import { MatrixSelectionDirection } from "@typings/Matrix.types";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { MatrixBottomDecoration } from "./BottomDecoration";
import { Code } from "./Code";
import { MatrixFinish } from "./MatrixFinish";
import { MatrixSelection } from "./Selection";
import { MatrixIcon } from "./icons/MatrixIcon";

export const Matrix = () => {
  const {
    matrixCols,
    addToBuffer,
    selectedCodes,
    setHoveredCode,
    clearHoveredCode,
    matrixCodes,
    selection,
    setSelectionToCode,
  } = useAppStoreShallow((s) => ({
    matrixCols: s.config.matrixCols,
    addToBuffer: s.addCodeToBuffer,
    selectedCodes: s.selectedCodes,
    setHoveredCode: s.setHoveredCode,
    clearHoveredCode: s.clearHoveredCode,
    matrixCodes: s.matrixCodes,
    setSelectionToCode: s.setSelectionToCode,
    selection: s.matrixSelection,
  }));

  const isBreachFinished = useAppStore((s) => !!selectIsBreachFinished(s));

  const handleCodePick = (e: MouseEvent) => {
    if (!isNodeACode(e.target)) return;

    const codeId = (e.target as HTMLLIElement).id;
    if (!codeId) return;

    // Ensure the code is not already in the buffer
    if (!selectedCodes.find((bufEl) => bufEl.id === codeId)) {
      const code = matrixCodes.find((code) => code.id === codeId);
      if (!code) return;

      if (!isCodeSelectable(selection, code)) return;

      setSelectionToCode(code);
      addToBuffer(code);
      setHoveredCode(codeId, null);
    }
  };

  const handleCodesHover = (e: MouseEvent) => {
    if (!isNodeACode(e.target)) {
      clearHoveredCode();
      return;
    }
    const codeId = (e.target as HTMLLIElement).id;

    const code = matrixCodes.find((code) => code.id === codeId);
    if (!code) return;

    // Code is already selected
    if (
      selectedCodes.find((s) => s.id === codeId) ||
      !isCodeSelectable(selection, code)
    ) {
      clearHoveredCode();
      return;
    }

    setHoveredCode(codeId, code);
  };

  return (
    <div
      className={clsx({
        "animate-scale-from-left relative lg:mt-0 mt-4 lg:mb-0": true,
        "sm:mb-52 xs:mb-40 mb-32": matrixCols <= 5,
        "sm:mb-32 xs:mb-20 mb-12": matrixCols >= 6,
      })}
    >
      {isBreachFinished && <MatrixFinish />}
      <div
        style={{
          opacity: isBreachFinished ? 0 : 1,
          transition: "opacity var(--duration-matrix-fade-out) ease",
        }}
      >
        <div className="drop-shadow-primary-500 relative">
          <div className="flex w-full items-center bg-primary-500 text-primary-900 h-9 pl-4 ribbon-tl">
            <MatrixIcon />
            <span className="ml-3">CODE MATRIX</span>
          </div>

          <div
            className="w-full border-primary-300 bg-page border-t-0 border flex justify-center relative"
            style={{
              opacity: isBreachFinished ? 0 : 1,
              pointerEvents: isBreachFinished ? "none" : "all",
              padding: "var(--matrix-inner-py) var(--matrix-inner-px)",
            }}
          >
            <MatrixSelection
              direction={MatrixSelectionDirection.ROW}
              selection={selection}
            />

            <div className="relative">
              <MatrixSelection
                direction={MatrixSelectionDirection.COL}
                selection={selection}
              />
              <ul
                onClick={handleCodePick}
                className="grid"
                onMouseLeave={() => clearHoveredCode()}
                onMouseMove={handleCodesHover}
                style={{
                  gridTemplateColumns: `repeat(${matrixCols}, auto)`,
                }}
              >
                {matrixCodes.map((data) => (
                  <Code key={data.id} data={data} selection={selection} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <MatrixBottomDecoration />
      </div>
    </div>
  );
};
