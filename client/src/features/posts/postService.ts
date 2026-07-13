import http from "@/services/axiosInstance";
import type { PostResponse } from "@shared/types";

const API_URL = `${import.meta.env.VITE_API_URL}/posts`;

const postApi = {
  getFeed: async () => {
    const response = await http.get<PostResponse[]>(`${API_URL}`);
    return response.data;
  },
};

export default postApi;
