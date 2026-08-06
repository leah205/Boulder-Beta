import http from "@/services/axiosInstance";

const API_URL = `${import.meta.env.VITE_API_URL}/attempts`;

const attemptApi = {
  postAttempt: async (attempt_id: number) => {
    await http.post(`${API_URL}/${attempt_id}/video/post`);
  },
};

export default attemptApi;
