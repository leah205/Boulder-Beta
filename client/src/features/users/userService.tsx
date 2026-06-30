import http from "@/utils/axiosInstance";
import type { Climb } from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/users";

const userApi = {
  getMyClimbs: async () => {
    const response = await http.get(`${API_URL}/me/climbs`);
    return response.data;
  },
};

export default userApi;
