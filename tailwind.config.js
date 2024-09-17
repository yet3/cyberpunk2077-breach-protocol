const plugin = require("tailwindcss/plugin");

const Var = (v) => {
  return `var(--${v})`;
};
const hslVar = (v) => {
  return `hsl(var(--${v}))`;
};

const makeRibbonClipPath = (tl, tr, br, bl) =>
  `polygon(
      0px 100%,
      0px ${tl || "0px"},
      ${tl || "0px"} 0px,
      100% 0px,
      calc(100% - ${tr || "0px"}) 0px,
      100% ${tr || "0px"},
      100% calc(100% - ${br || "0px"}),
      calc(100% - ${br || "0px"}) 100%,
      ${bl || "0px"} 100%,
      0px calc(100% - ${bl || "0px"})
    );`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        1: 1,
        modals: 1000,
        mobileBlocker: 9999,
      },
      fontSize: {
        "3px": "0.1875rem",
        "4px": "0.25rem",
        "5px": "0.3125rem",
        "6px": "0.375rem",
        "7px": "0.4375rem",
        "8px": "0.5rem",
        "9px": "0.5625rem",
      },
      width: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
      },
      height: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
      },
      borderRadius: {
        "xs": "1px",
      },
      dropShadow: {
        "primary-500": "0 0px 8px hsl(var(--primary-500) / 20%)",
        "success-500": "0 0px 8px hsl(var(--success-500) / 20%)",
        "danger-500": "0 0px 8px hsl(var(--danger-500) / 20%)",
      },
      backgroundColor: {
        page: hslVar("bg-page"),
        modal: hslVar("bg-modal"),
        "matrix-primary-selection": Var("bg-matrix-primary-selection"),
        "matrix-secondary-selection": Var("bg-matrix-secondary-selection"),
        "sequences-highlight": Var("bg-sequences-highlight"),
      },
      colors: {
        primary: {
          300: hslVar("primary-300"),
          500: hslVar("primary-500"),
          900: hslVar("primary-900"),
        },
        accent: {
          300: hslVar("accent-300"),
          500: hslVar("accent-500"),
        },
        success: {
          400: hslVar("success-400"),
          500: hslVar("success-500"),
          600: hslVar("success-600"),
          700: hslVar("success-700"),
          800: hslVar("success-800"),
          900: hslVar("success-900"),
        },
        danger: {
          300: hslVar("danger-300"),
          400: hslVar("danger-400"),
          500: hslVar("danger-500"),
          600: hslVar("danger-600"),
          700: hslVar("danger-700"),
          800: hslVar("danger-800"),
          900: hslVar("danger-900"),
        },
      },
      animation: {
        "code-glow-pulse": "anim__code-glow-pulse 1.5s ease infinite",
      },
      keyframes: {
        "anim__code-glow-pulse": {
          "0%,100%": {
            "box-shadow": "0px 0px 12px 2px hsl(var(--accent-500) / 40%);",
          },
          "40%,60%": {
            "box-shadow": "0px 0px 12px 2px hsl(var(--accent-500));",
          },
        },
      },

      screens: {
        sm: "624px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1425px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme, matchUtilities }) => {
      const colors = theme("backgroundColor");

      const ribbonColorUtils = {};
      for (const colorKey in colors) {
        const variants = colors[colorKey];

        if (typeof variants === "object") {
          for (const variantKey in variants) {
            const color = variants[variantKey];

            ribbonColorUtils[`.rb-bg-${colorKey}-${variantKey}`] = {
              "--tw-ribbon-border-bg": color,
            };
            ribbonColorUtils[`.rb-${colorKey}-${variantKey}`] = {
              "--tw-ribbon-border-color": color,
            };
          }
        } else if (typeof variants === "string") {
          ribbonColorUtils[`.rb-bg-${colorKey}`] = {
            "--tw-ribbon-border-bg": variants,
          };
          ribbonColorUtils[`.rb-${colorKey}`] = {
            "--tw-ribbon-border-color": variants,
          };
        }
      }

      addUtilities({
        ...ribbonColorUtils,
        ".code-glow": {
          "box-shadow": "0px 0px 12px 2px hsl(var(--accent-500));",
        },
        ".ribbon-tl": { "clip-path": makeRibbonClipPath("12px") },
        ".ribbon-tr": { "clip-path": makeRibbonClipPath(null, "12px") },
        ".ribbon-br": { "clip-path": makeRibbonClipPath(null, null, "12px") },
        ".ribbon-bl": {
          "clip-path": makeRibbonClipPath(null, null, null, "12px"),
        },

        ".ribbon-border": {
          position: "relative",
          background: "var(--tw-ribbon-border-color)",
          "&::before": {
            content: "''",
            position: "absolute",
            "z-index": -1,
            background: "var(--tw-ribbon-border-bg)",
            inset: "var(--tw-ribbon-border-thickness, 1px)",
            "clip-path": "inherit",
          },
        },
        ".ribbon-border-1": {
          "--tw-ribbon-border-thickness": "1px",
        },
      });

      matchUtilities({
        ribbon: (value = "") => {
          const split = value.split(",");
          return {
            "clip-path": makeRibbonClipPath(
              split[0],
              split[1],
              split[2],
              split[3],
            ),
          };
        },
      });
    }),
  ],
};
