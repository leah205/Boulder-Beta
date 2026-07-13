import http from "@/services/axiosInstance";
import type { CreateAttemptRequest } from "@shared/types";

const API_URL = `${import.meta.env.VITE_API_URL}/attempts`;

const attemptApi = {
  logAttempt: async (climbId: number, attempt: CreateAttemptRequest) => {
    console.log(attempt);
    const formData = new FormData();
    formData.append("send", String(attempt.send));
    formData.append("clip", attempt.clip || "");
    const response = await http.post(`${API_URL}/${climbId}`, formData);

    return response.data;
  },

  postAttempt: async (attempt_id: number) => {
    await http.post(`${API_URL}/${attempt_id}/video/post`);
  },
};

export default attemptApi;
