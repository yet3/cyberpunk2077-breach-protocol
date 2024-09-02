import { type RsbuildPlugin, defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

// @ts-ignore
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

// prove of concept
// TODO: make an actual plugin
const customPlug = (): RsbuildPlugin => {
  return {
    name: "my-plug",
    setup: (api) => {
      api.transform({}, (ctx) => {
        if (!/\.tsx/.test(ctx.resourcePath)) {
          return ctx.code;
        }

        let content = ctx.code;
        const matches = content.match(/before:\(.+/);
        if (matches) {
          for (const match of matches) {
            let opened = 1;
            const strToParse = match.replace("before:(", "");
            let toTransform = "";
            for (const char of strToParse) {
              toTransform += char;
              if (char === "(") opened++;
              else if (char === ")") opened--;

              if (opened === 0) {
                toTransform = toTransform.substring(0, toTransform.length - 1);
                const styles = toTransform.split(" ");
                const finalStlyes: string[] = [];
                for (const sty of styles) {
                  finalStlyes.push(`before:${sty}`);
                }

                const finalStr = finalStlyes.join(" ");
                content = content.replace(`before:(${styles.join(' ')})`, finalStr);
                break;
              }
            }
          }
        }

        return content;
      });
    },
  };
};

// TODO: Fill site metadata
const AUTHOR = "Maksymilian Kasperowicz <yet3.dev@gmail.com>";
const TITLE = "Cyberpunk Breach Protocol";
const DESCRIPTION = "";
const URL = "";
const LOCALE = "en_US";

// TODO: Make a proper cover img
const COVER_IMG = "/cover.jpeg";

export default defineConfig({
  plugins: [pluginReact(), pluginSass(), customPlug()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
  output: {
    manifest: "./public/manifest.json",
  },
  html: {
    title: TITLE,
    // favicon: "./public/favicon.svg",
    // appIcon: "./public/favicon.svg",
    meta: {
      author: AUTHOR,
      // TODO : keywords
      keywords: "",
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
