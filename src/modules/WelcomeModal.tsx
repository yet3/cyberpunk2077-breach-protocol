import { Modal } from "@common/Modal";
import { ModalButton } from "@common/Modal";
import { useState } from "react";

const WELCOME_MODAL_STORAGE_KEY = "should_welcome_modal_open_4";

const getStorageState = (): boolean => {
  return (localStorage.getItem(WELCOME_MODAL_STORAGE_KEY) || "true") === "true";
};

// TODO: welcome modal, write some text about this project
export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(getStorageState());

  if (!isOpen) return null;

  let greeting = "Good morning";
  const hour = new Date().getHours();
  if (hour >= 17) greeting = "Good evening";
  else if (hour >= 12) greeting = "Good afternoon";

  return (
    <Modal
      width="500px"
      header={"Cyberpunk 2077 Breach Protocol"}
      body={
        <div className="flex flex-col">
          <p>{greeting}, Night city!</p>
          <a
            className="mt-2 text-primary-500 underline"
            href="https://www.cyberpunk.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out Cyberpunk 2077
          </a>
        </div>
      }
      footer={
        <>
          <ModalButton
            content="CONFIRM"
            onClick={() => {
              setIsOpen(false);
              localStorage.setItem(WELCOME_MODAL_STORAGE_KEY, "false");
            }}
          />
        </>
      }
    />
  );
};
