import "./Breach.scss";
import { AppStoreProvider, getAppStore } from "@contexts/AppStoreCtx";
import { PrngCtxProvider, usePrng } from "@contexts/PrngCtx";
import { AVAILABLE_CODES } from "@lib/const.lib";
import { BreachNav } from "@modules/BrachNav";
import { DebugInfo } from "@modules/Dev";
import { Header } from "@modules/Header";
import { Matrix } from "@modules/Matrix";
import { Sequences } from "@modules/Sequences";
import { WelcomeModal } from "@modules/WelcomeModal";
import type { IBreachConfig } from "@typings/Breach.types";
import { useEffect } from "react";
import { BufferTitle } from "./BufferTitle";
import { BreachDecorations } from "./Decorations";

interface IProps {
  config: IBreachConfig;
}

export const BreachRun = ({ config: userConfig }: IProps) => {
  // PrngCtx must be first
  return (
    <PrngCtxProvider
      seed={userConfig.seed}
      availableCodes={userConfig.availableCodes ?? AVAILABLE_CODES}
    >
      <AppStoreProvider userConfig={userConfig}>
        <div className="w-screen h-screen flex flex-col items-center justify-start space-y-4 pt-16 pb-4">
          <Breach userConfig={userConfig} />
          <BreachNav />
        </div>
        <WelcomeModal />
        <DebugInfo />
      </AppStoreProvider>
    </PrngCtxProvider>
  );
};

export const Breach = ({ userConfig }: { userConfig: IBreachConfig }) => {
  const appStore = getAppStore();
  const prng = usePrng();

  useEffect(() => {
    const unsub = appStore.subscribe(
      (s) => s.config.seed,
      () => {
        const store = appStore.getState();
        const conf = prng.generateBreachConfig({
          ...userConfig,
          seed: store.config.seed,
        });
        store.setConfig(conf);
        store.resetBreach();
      },
    );

    return () => {
      unsub();
    };
  }, [appStore, prng, userConfig]);

  return (
    <div className="breach border border-primary-500 game-ui relative">
      <BreachDecorations />

      <BufferTitle />

      <Header />

      <div
        className="grid justify-start"
        style={{
          gridTemplateColumns: "var(--matrix-width) 1fr",
          columnGap: "var(--breach-content-x-gap)",
          paddingLeft: "var(--breach-inner-pl)",
          paddingRight: "var(--breach-inner-pr)",
        }}
      >
        <Matrix />
        <Sequences />
      </div>
    </div>
  );
};
