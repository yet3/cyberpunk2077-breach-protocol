import { useAppStoreShallow } from "@contexts/AppStoreCtx";
import { type ISequence, SequenceStatus } from "@typings/Sequences.types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SequenceFinish } from "./SequenceFinish";

interface IProps {
  sequence: ISequence;
}

export const Sequence = ({ sequence }: IProps) => {
  const { selectedCodes, hoveredCode, setSequenceStatus, bufferSize } =
    useAppStoreShallow((s) => ({
      bufferSize: s.config.bufferSize,
      setSequenceStatus: s.setSequenceStatus,
      selectedCodes: s.selectedCodes,
      hoveredCode: s.hoveredCode,
    }));

  const [offset, setOffset] = useState<number>(0);
  const [pickedCodes, setPickedCodes] = useState<boolean[]>([]);

  useEffect(() => {
    if (sequence.status !== "in-progress") return;

    let seqIdx = 0;
    let _pickedCodes: boolean[] = [...pickedCodes];
    let _offset = offset;

    for (let i = 0; i < selectedCodes.length; i++) {
      const bufCode = selectedCodes[i].code;
      if (bufCode === sequence.codes[seqIdx].code) {
        _pickedCodes[seqIdx] = true;
        seqIdx++;
        if (seqIdx === sequence.codes.length) {
          setSequenceStatus(sequence.id, SequenceStatus.SOLVED);
          return;
        }
      } else {
        seqIdx = 0;
        _pickedCodes = [];
        let offsetIdx = i + 1;
        if (bufCode === sequence.codes[0].code) {
          seqIdx = 1;
          _pickedCodes[0] = true;
          offsetIdx = i;
        }
        _offset = Math.min(offsetIdx, bufferSize - sequence.codes.length);
      }
    }

    setOffset(_offset);
    setPickedCodes(_pickedCodes);

    // Fail sequence if there is not enough space in the buffer left
    if (sequence.codes.length - seqIdx > bufferSize - selectedCodes.length) {
      setSequenceStatus(sequence.id, SequenceStatus.FAILED);
    }
  }, [
    selectedCodes,
    sequence.id,
    sequence.codes,
    bufferSize,
    setSequenceStatus,
  ]);

  const isInProgress = sequence.status === "in-progress";
  return (
    <li className="z-10 relative pb-4">
      <SequenceFinish status={sequence.status} />
      <ul className="flex" style={{ gap: "var(--sequences-codes-gap)" }}>
        {sequence.codes.map((seqCode, idx) => (
          <li
            key={`seq-${seqCode.id}`}
            className={clsx({
              "sequence__code relative grid place-items-center border-accent-500": true,
              //
              // Picked
              "sequence__code--picked border border-primary-500 text-primary-500":
                isInProgress && pickedCodes[idx],
              //
              // Hovered
              "border border-accent-500 text-accent-500 code-glow":
                isInProgress &&
                hoveredCode?.code === seqCode.code &&
                selectedCodes.length === idx + offset,
            })}
            style={{
              fontSize: "var(--sequences-code-font-size)",
              marginLeft:
                idx > 0
                  ? 0
                  : `calc((var(--sequences-code-size) + var(--sequences-codes-gap)) * ${offset})`,
              width: "var(--sequences-code-size)",
              height: "var(--sequences-code-size)",
            }}
          >
            {seqCode.code}
          </li>
        ))}
      </ul>
    </li>
  );
};
