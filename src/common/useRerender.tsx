import { useState } from "react";

export const useRerender = () => {
  const [, setRerender] = useState({});
  return () => setRerender({});
};
