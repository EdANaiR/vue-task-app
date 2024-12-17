import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { VCalendar } from "vuetify/labs/VCalendar";

export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  components: {
    VCalendar,
  },
});
