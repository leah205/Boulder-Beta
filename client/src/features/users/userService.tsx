import http from "@/services/axiosInstance";
import type {
  ClimbResponse,
  followUserRequest,
  PostResponse,
} from "@shared/types";
import type { UserResponse } from "@shared/types";
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const userApi = {
  getMyClimbs: async () => {
    const response = await http.get<ClimbResponse[]>(`${API_URL}/me/climbs`);
    return response.data;
  },
  getUserPosts: async (user_id: number) => {
    const response = await http.get<PostResponse[]>(
      `${API_URL}/${user_id}/posts`,
    );
    return response.data;
  },

  getUserData: async (id: number | undefined) => {
    if (!id) {
      throw new Error("Cannot get user data");
    };
    const response = await http.get<UserResponse>(`${API_URL}/${id}`);
    return response.data;
  },

  followUser: async (req_body: followUserRequest) => {
    const response = await http.post(
      `${API_URL}/me/following/follow`,
      req_body,
    );
    return response.data;
  },

  unfollowUser: async (req_body: followUserRequest) => {
    const response = await http.post(
      `${API_URL}/me/following/unfollow`,
      req_body,
    );
    return response.data;
  },
};

export default userApi;
