import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const customTheme = {
  dark: false,
  colors: {
    primary: "#8e24aa", // Lila
    secondary: "#4fc3f7", // Bebe mavisi
    accent: "#ffd54f", // Sarı
    background: "#f5f5f5", // Açık gri
  },
};

const vuetify = createVuetify({
  components: {
    ...components,
  },
  directives,
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});

createApp(App).use(vuetify).use(router).mount("#app");
