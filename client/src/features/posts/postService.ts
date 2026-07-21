import http from "@/services/axiosInstance";
import type { PostResponse, PostPayloadType } from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

const postApi = {
  getFeed: async () => {
    const response = await http.get<PostResponse[]>(`${POST_URL}`);
    return response.data;
  },

  getFollowFeed: async () => {
    const response = await http.get<PostResponse[]>(`${POST_URL}/following`);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await http.delete<PostResponse>(`${POST_URL}/${id}`);
    return response.data;
  },

  getPost: async (id: number) => {
    const response = await http.get<PostResponse>(`${POST_URL}/${id}`);

    return response.data;
  },
};

export default postApi;
