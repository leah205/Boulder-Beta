import http from "@/utils/axiosInstance";
import type { Attempt } from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/attempts";

const attemptApi = {
  logAttempt: async (climbId: number, send: boolean) => {
    const response = await http.post<Attempt>(`${API_URL}/${climbId}`, {
      send: send,
    });

    return response.data;
  },
};

export default attemptApi;
