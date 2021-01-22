import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "gmap-vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCqupodOy4ShkVk0SzzoRQDuRaQn3IHIcY",
    libraries: "places",
    region: "PE",
    language: "es"
  },
  installComponents: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
