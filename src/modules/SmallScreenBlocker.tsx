import { createPortal } from "react-dom";

export const SmallScreenBlocker = () => {
  return createPortal(
    <div className="blocked:hidden fixed z-screen-blocker top-0 left-0 w-full h-full filter backdrop-blur-3xl flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full before:w-full before:h-full before:absolute before:bg-[url('@assets/noise.webp')] before:opacity-[0.05] after:absolute after:inset-0 after:w-full after:h-full after:bg-accent-300/10" />
      <p className="text-xl text-justify text-primary-500 font-medium px-4">
        This product is incompatible with mobile displays. For the full
        experience, upgrade to a larger interface.
      </p>
      <p className="text-primary-500 text-sm absolute bottom-2 left-0 px-2 text-justify">
        *By launching this application, you’ve accepted the terms and
        conditions, including hardware constraints. Any malfunctions or issues
        are your responsibility. The corporation is not liable for any damages
        to your device, data loss, or other unforeseen consequences.
      </p>
    </div>,
    document.body,
  );
};
