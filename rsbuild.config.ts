import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

// @ts-ignore
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

const AUTHOR = "Maksymilian Kasperowicz <yet3.dev@gmail.com>";
const TITLE = "Cyberpunk 2077 // Breach Protocol";
const DESCRIPTION =
  "A fan recreation of hacking mini-game 'Breach Protocol' from Cybeprunk 2077";
const URL = "https://cyberpunk2077-breach-protocol.vercel.app/";
const LOCALE = "en_US";

const COVER_IMG = "/cover.png";

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
  html: {
    title: TITLE,
    favicon: "./public/favicon.svg",
    appIcon: {
      name: "Breach Protocol",
      icons: [
        {
          src: "./src/assets/icon-512.png",
          size: 512,
          target: 'web-app-manifest'
        },
        {
          src: "./src/assets/icon-192.png",
          size: 192,
          target: 'web-app-manifest'
        },
        {
          src: "./src/assets/icon-180.png",
          size: 180,
          target: "apple-touch-icon",
        },
      ],
    },
    meta: {
      viewport: "width=device-width, initial-scale=1.0",
      author: AUTHOR,
      keywords:
        "cyberpunk, cyberpunk 2077, breach protocol, breach, breaching, neturnner, netrunning, buffer, datamine, code matrix, ice, daemons, sequences, ping, ram, access points, night city, quickhack, quickhacks, hack, hacking, game, mini-game, cd projekt, cd projekt red",
      description: DESCRIPTION,
      robots: "index, follow",
      canonical: URL,

      "og:title": TITLE,
      "og:locale": LOCALE,
      "og:site_name": TITLE,
      "og:description": DESCRIPTION,
      "og:image": COVER_IMG,
      "og:url": URL,
      "og:type": "website",

      "twitter:title": TITLE,
      "twitter:description": DESCRIPTION,
      "twitter:card": "summary_large_image",
      "twitter:image": COVER_IMG,
      "twitter:url": URL,
    },
    tags: [{ tag: "div", attrs: { id: "modals" } }],
  },
});
