import { KeyDecoration } from "@common/KeyDecoration";
import { ProtocolIcon } from "./icons/ProtocolIcon";

export const MatrixBottomDecoration = () => {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] lg:mt-2 mt-1 tabular-nums text-6px leading-[1.75] text-primary-500">
      <div className="animate-matrix-filler-1 flex">
        <div className="flex flex-col leading-[1.1]">
          <ProtocolIcon className="mb-1" />
          <span className="text-8px font-medium break-words">
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

      <div className="animate-matrix-filler-2 flex mt-1 lg:justify-between lg:space-x-0 space-x-4 lg:pl-2 pl-8 pr-6">
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
  );
};
