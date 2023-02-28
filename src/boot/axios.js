import { boot } from "quasar/wrappers";
import axios from "axios";
import { useCommon } from "src/stores/storage";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.DEBUGGING
    ? "http://localhost:8000/api"
    : "https://dbiis.org/ppdb/backend/api",
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const { $state } = useCommon();
  api.interceptors.request.use(function (config) {
    if ($state.token) {
      config.headers.Authorization = "Bearer " + $state.token;
      config.headers["Target-Path"] = window.location.pathname;
    }
    return config;
  });
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
