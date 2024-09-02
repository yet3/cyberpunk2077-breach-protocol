import {
  type IAppStore,
  type IRootStore,
  createAppStore,
} from "@stores/root.store";
import type { IBreachConfig, } from "@typings/Breach.types";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { usePrng } from "./PrngCtx";

const AppStoreCtx = createContext<IAppStore | null>(null);

type IProps = PropsWithChildren<{
  userConfig: IBreachConfig;
}>;

// TODO: think about
//
// enum BreachDificullty {
//   EASY = "GONK",
//   NORMAL = "SOLO",
//   HARD = "EDGERUNNER",
// }

export const AppStoreProvider = ({ userConfig, children }: IProps) => {
  const storeRef = useRef<IAppStore>();
  const prng = usePrng();

  if (!storeRef.current) {
    storeRef.current = createAppStore(prng.generateBreachConfig(userConfig));
  }

  return (
    <AppStoreCtx.Provider value={storeRef.current}>
      {children}
    </AppStoreCtx.Provider>
  );
};

export const getAppStore = () => {
  const store = useContext(AppStoreCtx);
  if (!store) {
    throw new Error("getAppStore: AppStoreProvider is undefined");
  }
  return store;
};

type IUseAppStoreSelector<U> = (state: IRootStore) => U;

export const useAppStore = <U,>(selector: IUseAppStoreSelector<U>) => {
  const store = getAppStore();
  return useStore(store, selector);
};

export const useAppStoreShallow = <U,>(selector: IUseAppStoreSelector<U>) =>
  useAppStore(useShallow(selector));
