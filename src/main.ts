import { createApp } from "vue";
import App from "./App.vue";
import { usePinia } from "./plugins/pinia";
import { useVuetify } from "./plugins/vuetify";
import { useI18n } from "./plugins/i18n";
import { useFonts } from "./plugins/webfontloader";
import Markdown from "vue3-markdown-it";
useFonts();
const app = createApp(App);
usePinia(app);
useVuetify(app);
useI18n(app);
app.use(Markdown);
app.mount("#app");
