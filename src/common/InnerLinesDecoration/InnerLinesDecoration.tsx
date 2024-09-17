import "./InnerLinesDecoration.scss";
import clsx from "clsx";

interface IProps {
  animateTo: "left" | "right";
}

export const InnerLinesDecoration = ({ animateTo }: IProps) => {
  const isOnLeft = animateTo === "right";
  return (
    <>
      <div
        className={clsx({
          "animate-inner-lines-decoration": true,
          "w-1px h-full bg-primary-500/60 absolute top-0": true,
          "left-3": isOnLeft,
          "right-3": !isOnLeft,
        })}
        style={{
          // @ts-expect-error: custom css vars
          "--goal-x": isOnLeft ? "100px" : "-100px",
        }}
      />

      <div
        className={clsx({
          "animate-inner-lines-decoration": true,
          "w-1px h-full bg-primary-500/45 absolute top-0": true,
          "left-7": isOnLeft,
          "right-7": !isOnLeft,
        })}
        style={{
          // @ts-expect-error: custom css vars
          "--goal-x": isOnLeft ? "130px" : "-130px",
        }}
      />

      <div
        className={clsx({
          "animate-inner-lines-decoration": true,
          "w-1px h-full bg-primary-500/30 absolute top-0": true,
          "left-14": isOnLeft,
          "right-14": !isOnLeft,
        })}
        style={{
          // @ts-expect-error: custom css vars
          "--goal-x": isOnLeft ? "180px" : "-180px",
        }}
      />
    </>
  );
};
