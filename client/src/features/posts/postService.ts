import http from "@/services/axiosInstance";
import type {
  PostResponse,
  FeedResponse,
  PostPayloadType,
} from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

const postApi = {
  // getFeed: async () => {
  //   const response = await http.get<FeedResponse>(`${POST_URL}`);
  //   console.log(typeof response.data[0].uploadedAt);
  //   return response.data;
  // },

  getNextFeedPage: async (cursor: string | null) => {
    const cursorParam = cursor ? cursor : "";
    console.log(cursorParam);
    const response = await http.get<FeedResponse>(`${POST_URL}`, {
      params: {
        cursor: cursorParam,
      },
    });
    console.log("page request");
    return response.data;
  },

  getFollowFeed: async () => {
    const response = await http.get<FeedResponse>(`${POST_URL}/following`);
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
