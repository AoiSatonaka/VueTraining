import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

// firebase configuration
const firebaseConfig: object = {
  apiKey: "AIzaSyDfeL4FpSl5S706U98oD8oPMUf23qi5MNk",
  authDomain: "udemy-address-book.firebaseapp.com",
  databaseURL: "https://udemy-address-book.firebaseio.com",
  projectId: "udemy-address-book",
  storageBucket: "udemy-address-book.appspot.com",
  messagingSenderId: "775911011381",
  appId: "1:775911011381:web:0bd504c720d78f084c2d7c",
  measurementId: "G-XGYW1MQM2R"
};
// initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
