import axios from "axios";
import responseErrorHandler from "./responseErrorHandler";

// const axiosDefaults = {};
globalThis.fetch = window.fetch;
const http = axios.create({
  adapter: "fetch",
  env: {
    fetch: globalThis.fetch,
  },
});
http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, responseErrorHandler);
export default http;
