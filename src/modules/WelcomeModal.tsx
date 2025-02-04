import { Anchor, AnchorKind } from "@common/Anchor";
import { GitHubIcon } from "@common/Icons/GitHubIcon";
import { Modal } from "@common/Modal";
import { ModalButton } from "@common/Modal";
import {
  CYBERPUNK_GAME_HREF,
  GITHUB_REPO_HREF,
  GITHUB_REPO_NEW_ISSUE_HREF,
  WELCOME_MODAL_DELAY,
  WELCOME_MODAL_STORAGE_KEY,
} from "@lib";
import { useEffect, useState } from "react";

const getStorageState = (): boolean => {
  return (localStorage.getItem(WELCOME_MODAL_STORAGE_KEY) || "true") === "true";
};

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(getStorageState());
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      setCanShow(true);
      timeout = null;
    }, WELCOME_MODAL_DELAY);

    return () => {
      if (timeout != null) {
        clearTimeout(timeout);
      }
    };
  }, []);

  if (!isOpen || !canShow) return null;

  let greeting = "Good morning";
  const hour = new Date().getHours();
  if (hour >= 17) greeting = "Good evening";
  else if (hour >= 12) greeting = "Good afternoon";

  return (
    <Modal
      modalClass="sm:w-[510px] xs:w-[450px] w-full"
      header={`${greeting}, Night city!`}
      body={
        <div className="flex flex-col leading-relaxed text-justify">
          <p>
            Jack into this{" "}
            <Anchor
              href="https://www.maxkasperowicz.com"
              kind={AnchorKind.TEXT}
              content="fan-made"
            />{" "}
            recreation of the hacking mini-game from CD PROJEKT's{" "}
            <Anchor
              href={CYBERPUNK_GAME_HREF}
              kind={AnchorKind.TEXT}
              content="Cyberpunk 2077"
            />
            . Breach through ICE, and enjoy the ride in the data stream.
          </p>

          <div className="grid sm:grid-cols-2 grid-cols-1 justify-stretch w-full sm:gap-4 gap-2 mt-1 mb-3">
            <Anchor
              className="mt-2 text-primary-500 rb-bg-modal flex-2"
              href="https://www.cyberpunk.net"
              content="Get Cyberpunk 2077 here"
            />
            <Anchor
              className="mt-2 text-primary-500 rb-bg-modal flex-1"
              href={GITHUB_REPO_HREF}
              content={
                <div className="flex">
                  <GitHubIcon className="fill-primary-500 mr-2" /> Project's
                  repo
                </div>
              }
            />
          </div>
          <p className="text-left">
            If something glitches, hit up GitHub and{" "}
            <Anchor
              href={GITHUB_REPO_NEW_ISSUE_HREF}
              kind={AnchorKind.TEXT}
              content="open a ticket"
            />
            .
          </p>
        </div>
      }
      footer={
        <ModalButton
          className="max-xs:w-full max-xs:py-3"
          content="CONFIRM"
          onClick={() => {
            setIsOpen(false);
            localStorage.setItem(WELCOME_MODAL_STORAGE_KEY, "false");
          }}
        />
      }
    />
  );
};
