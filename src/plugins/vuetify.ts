import "vuetify/dist/vuetify.css";
import "@mdi/font/css/materialdesignicons.css";

import type { Scheme, Theme } from "@material/material-color-utilities";
import {
  argbFromHex,
  hexFromArgb,
  themeFromImage,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import type { App } from "vue";
import type { ThemeDefinition as BaseThemeDefinition } from "vuetify";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import { useSettingStore } from "../store/setting";

import themes from "./theme";

export interface ThemeDefinition extends BaseThemeDefinition {
  name: string;
}
export const useVuetify = (app: App) => {
  const settingStore = useSettingStore();
  const { customTheme } = settingStore;
  if (customTheme && customTheme.length) {
    customTheme.map((theme) => {
      themes[theme.name] = theme;
    });
  }
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    display: {
      mobileBreakpoint: "xs",
    },
    theme: {
      defaultTheme: "RedSandDunesLight",
      themes,
    },
  });
  app.use(vuetify);
  return vuetify;
};

export async function generateVuetifyTheme(
  colorOrImage: string | HTMLImageElement,
  name: string
): Promise<ThemeDefinition[]> {
  let theme: Theme;
  if (typeof colorOrImage === "string") {
    theme = await themeFromSourceColor(argbFromHex(colorOrImage));
  } else {
    theme = await themeFromImage(colorOrImage);
  }
  const toHex = (scheme: Scheme) => {
    const map: Record<string, string> = {};
    for (const [key, value] of Object.entries(scheme.toJSON())) {
      map[key] = hexFromArgb(value);
    }
    return map;
  };
  return [
    {
      name: `${name}Light`,
      dark: false,
      colors: toHex(theme.schemes.light),
      variables: {},
    },
    {
      name: `${name}Dark`,
      dark: true,
      colors: toHex(theme.schemes.dark),
      variables: {},
    },
  ];
}
