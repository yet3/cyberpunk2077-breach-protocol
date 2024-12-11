import {
  type IAppStore,
  type IRootStore,
  createAppStore,
} from "@stores/root.store";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

const AppStoreCtx = createContext<IAppStore | null>(null);

type IProps = PropsWithChildren;

export const AppStoreProvider = ({ children }: IProps) => {
  const storeRef = useRef<IAppStore>(null);

  if (!storeRef.current) {
    storeRef.current = createAppStore();
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
  return useStore(getAppStore(), selector);
};

export const useAppStoreShallow = <U,>(selector: IUseAppStoreSelector<U>) => {
  return useAppStore(useShallow(selector));
};
