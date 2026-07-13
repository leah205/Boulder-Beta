import http from "@/services/axiosInstance";
import type { ClimbResponse } from "@shared/types";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const userApi = {
  getMyClimbs: async () => {
    const response = await http.get<ClimbResponse[]>(`${API_URL}/me/climbs`);
    return response.data;
  },
};

export default userApi;
