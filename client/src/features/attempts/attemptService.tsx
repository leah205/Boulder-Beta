import http from "@/services/axiosInstance";
import type { CreateAttemptRequest, AttemptResponse } from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/attempts";

const attemptApi = {
  logAttempt: async (climbId: number, attempt: CreateAttemptRequest) => {
    const formData = new FormData();
    formData.append("send", String(attempt.send));
    formData.append("clip", attempt.clip || "");
    const response = await http.post<AttemptResponse>(
      `${API_URL}/${climbId}`,
      formData,
    );

    return response.data;
  },

  publishAttempt: async (attempt_id: number) => {
    await http.post(`${API_URL}/${attempt_id}/publish`);
  },
};

export default attemptApi;
