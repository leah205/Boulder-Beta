import http from "@/services/axiosInstance";
import type { PostResponse, FeedResponse } from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

type CursorParamType =
  | {
      cursorType: string;
      cursor: string | null;
    }
  | undefined;

const postApi = {
  getFeedPage: async (cursor: CursorParamType) => {
    const cursorParam = cursor ? cursor.cursor : "";
    const cursorType = cursor ? cursor.cursorType : "";
    const response = await http.get<FeedResponse>(`${POST_URL}`, {
      params: {
        cursor: cursorParam,
        cursorType,
      },
    });
    return response.data;
  },

  getFollowFeed: async (cursor: CursorParamType) => {
    const cursorParam = cursor ? cursor.cursor : "";

    const response = await http.get<FeedResponse>(`${POST_URL}/following`, {
      params: {
        cursor: cursorParam,
      },
    });
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await http.delete<PostResponse>(`${POST_URL}/${id}`);
    return response.data;
  },

  clapPost: async (id: number) => {
    const response = await http.post<PostResponse>(`${POST_URL}/${id}/clap`);
    return response.data;
  },

  unclapPost: async (id: number) => {
    const response = await http.post<PostResponse>(`${POST_URL}/${id}/unclap`);
    return response.data;
  },

  getPost: async (id: number) => {
    const response = await http.get<PostResponse>(`${POST_URL}/${id}`);

    return response.data;
  },
};

export default postApi;
