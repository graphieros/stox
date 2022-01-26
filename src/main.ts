import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";
import VueApexCharts from "vue3-apexcharts";
import "@mdi/font/css/materialdesignicons.min.css";

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);

new WaveUI(app, {
  // Some Wave UI options.
});

app.mount("#app");
