import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import type { ThemeDefinition } from "@/plugins/vuetify";

export enum APPEARANCE {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export interface SettingState {
  locale: string;
  appearance: APPEARANCE;
  customTheme: ThemeDefinition[];
  stream: boolean;
  proxyUrl: string;
  apiKey: string;
}
export const useSettingStore = defineStore("setting", {
  state: () => {
    return useLocalStorage<SettingState>(
      "setting",
      {
        locale: "zhCN",
        appearance: APPEARANCE.LIGHT,
        customTheme: [],
        proxyUrl: "https://api.openai-proxy.com",
        apiKey: "",
        stream: true,
      },
      { mergeDefaults: true }
    );
  },
});
