interface IProps {
  isActive: boolean;
}
export const BufferCaret = ({ isActive }: IProps) => {
  if (!isActive) return null;
  return (
    <div
      className="absolute bg-primary-500 bottom-1 left-1/2 -translate-x-1/2"
      style={{
        height: 3,
        width: "calc(100% - 6px)",
        animation: "anim__buffer-caret-idle 1.6s steps(1, start) infinite",
      }}
    />
  );
};
