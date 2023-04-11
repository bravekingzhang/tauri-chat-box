import type { App } from "vue";
import { createI18n } from "vue-i18n";

import { useSettingStore } from "../store/setting";

import en from "../locale/en.json";
import zhCN from "../locale/zh-CN.json";

export const useI18n = (app: App) => {
  const settingStore = useSettingStore();
  const locale = settingStore.locale;

  const i18n = createI18n({
    allowComposition: true, // you need to specify that!
    locale,
    messages: { zhCN, en },
  });
  app.use(i18n);
  return i18n;
};
