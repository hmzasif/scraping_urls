import * as Vue from "vue"
import Scraper from "controllers/vue_components/scraper"

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector("#app");
  if (element !== null) {
    const app = Vue.createApp({});

    app.component('scraper', Scraper);

    app.mount("#app");
  }
});
