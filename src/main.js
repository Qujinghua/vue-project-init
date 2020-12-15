import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/components/ef/index.css"
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./permission"; // permission control

Vue.use(ElementUI);
Vue.config.productionTip = false;

import "../mock";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
