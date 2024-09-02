import "./Matrix.scss";
import { KeyDecoration } from "@common/KeyDecoration";
import {
  getAppStore,
  useAppStore,
  useAppStoreShallow,
} from "@contexts/AppStoreCtx";
import {
  generateEmptyMatrix,
  generateMatrix,
  isCodeSelectable,
  isNodeACode,
  swapSelectionDirection,
} from "@lib/Matrix.lib";
import { generateBufferCodes } from "@lib/generateBufferCodes.lib";
import { generateSequences } from "@lib/generateSequences.lib";
import { selectIsBreachFinished } from "@stores/root.store";
import {
  type IMatrixCode,
  type IMatrixSelection,
  MatrixSelectionDirection,
} from "@typings/Matrix.types";
import { SequenceStatus } from "@typings/Sequences.types";
import { type MouseEvent, useEffect, useState } from "react";
import { Code } from "./Code";
import { MatrixFinish } from "./MatrixFinish";
import { MatrixSelection } from "./Selection";
import { MatrixIcon } from "./icons/MatrixIcon";
import { ProtocolIcon } from "./icons/ProtocolIcon";
import { usePrng } from "@contexts/PrngCtx";

// TODO: clean-up
// TODO: implement fail condition when there are no more possible moves
// TODO: implement finish
// TODO: implement init animation that starts when everything initializes
// TODO: add animation to bottom content
// TODO: Separate this file
// TODO: Retry animation
export const Matrix = () => {
  const appStore = getAppStore();
  const prng = usePrng();
  const {
    gameId,
    breachConfig,
    setSequences,
    addToBuffer,
    selectedCodes,
    setHoveredCode,
    clearHoveredCode,
  } = useAppStoreShallow((s) => ({
    gameId: s.gameId,
    breachConfig: s.config,
    addToBuffer: s.addCodeToBuffer,
    selectedCodes: s.selectedCodes,
    setHoveredCode: s.setHoveredCode,
    clearHoveredCode: s.clearHoveredCode,
    setSequences: s.setSequences,
  }));
  const isBreachFinished = useAppStore((s) => !!selectIsBreachFinished(s));

  const [selection, setSelection] = useState<IMatrixSelection>({
    direction: MatrixSelectionDirection.ROW,
    value: 0,
  });
  const [matrixCols, setMatrixCols] =  useState(breachConfig.matrixCols)
  const [codesList, setCodesList] = useState<IMatrixCode[]>(
    generateEmptyMatrix(breachConfig),
  );

  useEffect(() => {
    const solvedCodes = generateBufferCodes(
      prng,
      breachConfig,
    );

    const res = generateSequences({
      prng: prng,
      config: breachConfig,
      solvedBufferCodes: solvedCodes,
    });

    const resp = generateMatrix(prng, breachConfig, solvedCodes);

    if ("error" in resp) {
      console.log("Generate Matrix Error:", resp.error);
    } else {
      setSelection(resp.data.selection);
      setMatrixCols(breachConfig.matrixCols)
      setCodesList(resp.data.matrix);
      setSequences(res.sequences);
    }

    // TODO: maybe move it from here
    const storeUnsub = appStore.subscribe(
      (s) => [
        s.selectedCodes.length,
        s.sequences.filter((e) => e.status === SequenceStatus.IN_PROGRESS)
          .length,
      ],
      (data) => {
        const store = appStore.getState();
        const [selectedCodesLength, inProgressSequencesLength] = data;

        if (
          store.breachFinishedAt == null &&
          (selectedCodesLength >= store.config.bufferSize ||
            inProgressSequencesLength === 0)
        ) {
          store.finishBreach();
        } else if (selectedCodesLength > 0 && store.breachStartedAt == null) {
          store.startBreach();
        }
      },
      {
        equalityFn: (o, n) => {
          return o[0] === n[0] && o[1] === n[1];
        },
      },
    );

    return () => {
      storeUnsub();
    };
  }, [breachConfig, appStore, setSequences, gameId, prng]);

  const handleCodePick = (e: MouseEvent) => {
    if (!isNodeACode(e.target)) return;

    const codeId = (e.target as HTMLLIElement).id;
    if (!codeId) return;

    // Ensure the code is not already in the buffer
    if (!selectedCodes.find((bufEl) => bufEl.id === codeId)) {
      const code = codesList.find((code) => code.id === codeId);
      if (!code) return;

      if (!isCodeSelectable(selection, code)) return;

      setSelection((prev) => ({
        direction: swapSelectionDirection(prev.direction),
        value:
          prev.direction === MatrixSelectionDirection.COL ? code.row : code.col,
      }));
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

    const code = codesList.find((code) => code.id === codeId);
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
    <div className="matrix relative opacity-0 scale-x-0 origin-left">
      {isBreachFinished && <MatrixFinish />}
      <div
        style={{
          opacity: isBreachFinished ? 0 : 1,
          transition: "opacity 300ms ease",
        }}
      >
        <div className="drop-shadow-primary-500 relative">
          <div className="flex w-full items-center font-light bg-primary-500 text-primary-900 h-9 pl-4 ribbon-tl">
            <MatrixIcon />
            <span className="ml-3">CODE MATRIX</span>
          </div>

          <div
            className="w-full border-primary-300 bg-page border-t-0 border flex justify-center relative"
            style={{
              opacity: isBreachFinished ? 0 : 1,
              // pointerEvents: isBreachFinished ? "none" : "all",
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
                {codesList.map((data) => (
                  <Code key={data.id} data={data} selection={selection} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[auto,1fr,auto] mt-2 tabular-nums text-[6px] leading-[1.75] text-primary-500">
          <div className="animte-matrix-filler-1 flex">
            <div className="flex flex-col leading-[1.1]">
              <ProtocolIcon className="mb-1" />
              <span className="text-[8px] font-medium break-words">
                PROTOCOL
                <br />
                <span className="tracking-[0.5px]">6520-A44</span>
              </span>
            </div>

            <div className="ml-2 mt-0.5 leading-[1.4]">
              <p>ONLY CC35 CERTIFIED</p>
              <p>AND DHSF 5TH CLASS OFFICERS</p>
              <p>ARE ALLOWED TO MANIPULATE,</p>
              <p>ACCESS OR DISABLE THIS DEVICE.</p>
            </div>
          </div>

          <div className="animte-matrix-filler-2 flex mt-1 justify-between pl-8 pr-6">
            <div className="flex flex-col items-center">
              <p>2.24645 2 . 3 4 8 0</p>
              <p>0.45654 0 . 1 4 0 0</p>
              <p>0.93743 0 . 4 4</p>
            </div>
            <div className="flex flex-col">
              <p>02:23 1.93743 0 . 4 4 3 5</p>
              <p>02:35 4.93743 0 . 0 0 0 0</p>
              <p className="-translate-x-[1ch]">02:50</p>
            </div>
            <div className="flex flex-col">
              <p>02:28</p>
              <p>02:42</p>
            </div>
          </div>

          <KeyDecoration />
        </div>
      </div>
    </div>
  );
};
