import { AppStoreProvider, getAppStore } from "@contexts/AppStoreCtx";
import { PrngCtxProvider, usePrng } from "@contexts/PrngCtx";
import { AVAILABLE_CODES } from "@lib/const.lib";
import { DebugInfo } from "@modules/Dev";
import { Header } from "@modules/Header";
import { BufferIcon } from "@modules/Header/Buffer/BufferIcon";
import { Matrix } from "@modules/Matrix";
import { Sequences } from "@modules/Sequences";
import { WelcomeModal } from "@modules/WelcomeModal";
import type { IBreachConfig } from "@typings/Breach.types";
import { useEffect } from "react";
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
        <div className="w-screen h-screen flex justify-center items-start py-16">
          <Breach userConfig={userConfig} />
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
        store.setConfig(
          prng.generateBreachConfig({ ...userConfig, seed: store.config.seed }),
        );
        store.resetStore()
      },
    );

    return () => {
      unsub();
    };
  }, [appStore, prng, userConfig]);

  return (
    <div className="breach border border-primary-500 game-ui relative">
      <BreachDecorations />

      <div
        style={{
          height: "var(--breach-inner-pt)",
          // TODO: use vars
          marginLeft: 548 + 48,
        }}
      >
        <BufferIcon />
        BUFFER
      </div>

      <Header />

      <div
        className="grid grid-cols-[500px_1fr] justify-start gap-x-12"
        style={{
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
