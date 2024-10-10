import "./Breach.scss";
import {
  AppStoreProvider,
  getAppStore,
  useAppStore,
} from "@contexts/AppStoreCtx";
import { BreachBottomActions } from "@modules/Breach/BottomActions";
import { DebugInfoLazy } from "@modules/Dev";
import { Header } from "@modules/Header";
import { Matrix } from "@modules/Matrix";
import { Sequences } from "@modules/Sequences";
import { SmallScreenBlocker } from "@modules/SmallScreenBlocker";
import { WelcomeModal } from "@modules/WelcomeModal";
import type { IBreachConfig } from "@typings/Breach.types";
import { SequenceStatus } from "@typings/Sequences.types";
import { useEffect } from "react";
import { BreachBorderDecorations } from "./BorderDecorations";
import { BreachTopDecorations } from "./TopDecorations/TopDecorations";

interface IProps {
  seed: number;
  config?: IBreachConfig;
}

export const BreachRun = ({ seed, config: userConfig }: IProps) => {
  return (
    <AppStoreProvider>
      <Breach seed={seed} userConfig={userConfig} />
      <WelcomeModal />
      <SmallScreenBlocker />
      <DebugInfoLazy />
    </AppStoreProvider>
  );
};

const Breach = ({
  seed,
  userConfig,
}: { userConfig?: IBreachConfig; seed: number }) => {
  const appStore = getAppStore();
  const hasStarted = useAppStore((s) => s.gameId != null);
  const newBreach = useAppStore((s) => s.newBreach);

  useEffect(() => {
    newBreach({ seed, config: userConfig });

    const unsubAppStore = appStore.subscribe(
      (s) => [
        s.selectedCodes.length,
        s.sequences.filter((e) => e.status === SequenceStatus.IN_PROGRESS)
          .length,
      ],
      (data) => {
        const store = appStore.getState();
        const [selectedCodesLength, inProgressSequencesLength] = data;

        if (
          store.breachFinishedAt == null &&
          (selectedCodesLength >= store.config.bufferSize ||
            inProgressSequencesLength === 0)
        ) {
          store.finishBreach();
        } else if (selectedCodesLength > 0 && store.breachStartedAt == null) {
          store.startBreach();
        }
      },
      {
        equalityFn: (o, n) => {
          return o[0] === n[0] && o[1] === n[1];
        },
      },
    );

    return () => {
      unsubAppStore();
    };
  }, [newBreach, seed, userConfig, appStore]);

  if (!hasStarted) return null;

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start space-y-4 pt-4 pb-4 game-ui">
      <BreachTopDecorations />

      <div
        className="breach flex-1 border border-primary-500 relative"
        style={{
          paddingTop: "var(--breach-inner-pt)",
        }}
      >
        <BreachBorderDecorations />

        <Header />

        <main className="breach-layout-grid breach-layout-px">
          <Matrix />
          <Sequences />
        </main>
      </div>

      <BreachBottomActions />
    </div>
  );
};
