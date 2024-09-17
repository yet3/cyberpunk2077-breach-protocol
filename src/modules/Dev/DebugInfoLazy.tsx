import { Suspense, lazy, useEffect, useState } from "react";

const DebugInfo = lazy(() => import("./DebugInfo.tsx"));

export const DebugInfoLazy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(
      "%cPress `ctrl/meta+d` to load and toggle debug info",
      "font-size: 16px; color: black; background-color: #FFF59D;",
    );

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "d") {
          e.preventDefault();
          setIsVisible((p) => !p);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <Suspense>{isVisible ? <DebugInfo /> : null}</Suspense>;
};
