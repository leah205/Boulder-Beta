import axios from "axios";
import type { User } from "../../types/auth_types";
import responseErrorHandler from "../../utils/responseErrorHandler";

const axiosDefaults = {};
const http = axios.create(axiosDefaults);

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

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/auth";

const api = {
  login: async (username: string, password: string) => {
    const response = await http.post<User & { token: string }>(
      `${API_URL}/login`,
      {
        username: username,
        password: password,
      },
    );
    return response.data;
  },

  signup: async (
    username: string,
    password: string,
    password_confirm: string,
  ) => {
    const response = await http.post<User>(`${API_URL}/signup`, {
      username: username,
      password: password,
      password_confirm: password_confirm,
    });
    return response.data;
  },

  logout: async () => {
    const response = await http.post(`${API_URL}/logout`);
    console.log(response);
  },

  getUserFromToken: async () => {
    const response = await http.get<User>(`${API_URL}/userFromToken`, {});
    return response.data;
  },
};

http.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, responseErrorHandler);

export default api;
//move
