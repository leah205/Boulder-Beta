import http from "@/services/axiosInstance";
import type { AuthResponse, LoginRequest, SignupRequest } from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/auth";

const api = {
  login: async (loginInput: LoginRequest) => {
    const response = await http.post<AuthResponse & { token: string }>(
      `${API_URL}/login`,
      loginInput,
    );
    return response.data;
  },

  signup: async (signupInput: SignupRequest) => {
    const response = await http.post<AuthResponse>(
      `${API_URL}/signup`,
      signupInput,
    );
    return response.data;
  },

  logout: async () => {
    await http.post(`${API_URL}/logout`);
  },

  getUserFromToken: async () => {
    const response = await http.get<AuthResponse>(
      `${API_URL}/userFromToken`,
      {},
    );
    return response.data;
  },
};

export default api;
//move
