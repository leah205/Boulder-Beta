import http from "@/services/axiosInstance";
import type { PostResponse } from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

const postApi = {
  getFeed: async () => {
    const response = await http.get<PostResponse[]>(`${POST_URL}`);
    return response.data;
  },
};

export default postApi;
