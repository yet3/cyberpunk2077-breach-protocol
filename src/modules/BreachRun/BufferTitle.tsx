import { BufferIcon } from "@modules/Header/Buffer/BufferIcon";

export const BufferTitle = () => {
  return (
    <div
      className="flex items-center text-2xl text-primary-500 tracking-wide buffer-title scale-x-0 opacity-0 origin-left"
      style={{
        height: "var(--breach-inner-pt)",
        marginLeft:
          "calc(var(--matrix-width) + var(--breach-content-x-gap) + var(--breach-inner-pl))",
      }}
    >
      <BufferIcon className="mr-3 w-auto h-full py-1.5" />
      BUFFER
    </div>
  );
};
