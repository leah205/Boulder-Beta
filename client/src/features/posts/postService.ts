import http from "@/services/axiosInstance";
import type { PostResponse } from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

const postApi = {
  getFeed: async () => {
    const response = await http.get<PostResponse[]>(`${POST_URL}`);
    return response.data;
  },

  deletePost: async (id: number) => {
    await http.delete(`${POST_URL}/${id}`);
  },

  getPost: async (id: number) => {
    const response = await http.get<PostResponse>(`${POST_URL}/${id}`);

    return response.data;
  },
};

export default postApi;
