import http from "@/services/axiosInstance";
import type { UserCredentials } from "@/types/auth_types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/auth";

const api = {
  login: async (username: string, password: string) => {
    const response = await http.post<UserCredentials & { token: string }>(
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
    const response = await http.post<UserCredentials>(`${API_URL}/signup`, {
      username: username,
      password: password,
      password_confirm: password_confirm,
    });
    return response.data;
  },

  logout: async () => {
    await http.post(`${API_URL}/logout`);
  },

  getUserFromToken: async () => {
    const response = await http.get<UserCredentials>(
      `${API_URL}/userFromToken`,
      {},
    );
    return response.data;
  },
};

export default api;
//move
