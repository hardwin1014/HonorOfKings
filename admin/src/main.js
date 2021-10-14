import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "assets/style/index.css";

// 定义全局 让每一个代码块都拥有他，
Vue.mixin({
  computed: {
    uploadUrl() {
      return "http://127.0.0.1:3000/admin/api/upload";
    },
  },
  // 最好使用方法，什么时候使用，什么时候用他，
  // data会不及时更新
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
  },
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
