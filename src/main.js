import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { token } from "./token.json";
import { createPinia } from "pinia";
import { reactive } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import * as labsComponents from "vuetify/labs/components";


import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseApp = initializeApp ({
  apiKey: "AIzaSyAJWMpSp0YNuCMVNXac84lDUV677kIr1Uc",
  authDomain: "prototipo-de-pantalla-v3.firebaseapp.com",
  projectId: "prototipo-de-pantalla-v3",
  storageBucket: "prototipo-de-pantalla-v3.appspot.com",
  messagingSenderId: "4369450468",
  appId: "1:4369450468:web:4c306dc3e3fcb431c933f1"
});

// Initialize Firebase



const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
});

const globalData = reactive({
  isLoading: false,
});

const service = axios.create({
  timeout: 20000, // request timeout
});

const devMode = process.env.NODE_ENV === "development" ? true : false;

// request interceptor
service.interceptors.request.use(
  (config) => {
    globalData.isLoading = true;
    config.headers["Authorization"] = `Bearer ${
      devMode ? token : localStorage.getItem("token")
    }`;

    return config;
  },
  (error) => {
    globalData.isLoading = false;
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    globalData.isLoading = false;

    return response;
  },
  function (error) {
    // handle error
    globalData.isLoading = false;

    if (error.response) {
      alert(JSON.stringify(error.response.status));
    }
  }
);

//Vue.prototype.$ajax = service;
const db = getFirestore(firebaseApp);
const app = createApp(App);
app.config.globalProperties.$ajax = service;
app.config.globalProperties.$dev = devMode;
app.config.globalProperties.$api = "https://backend.sim.lacosta.gob.ar/";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$ajax = service;
  store.$api = app.config.globalProperties.$api;
});
app.config.globalProperties.$db= db;
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");

export { globalData };
