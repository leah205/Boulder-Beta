import http from "@/utils/axiosInstance";
import type { Climb } from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/climbs";

const climbApi = {
  create: async (data_obj: Partial<Climb>) => {
    const response = await http.post<Climb>(`${API_URL}`, {
      climb: data_obj,
    });
    return response.data;
  },
};

export default climbApi;
