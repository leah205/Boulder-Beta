import http from "@/utils/axiosInstance";
import type { Climb } from "@shared/types";
import type { CreateClimbInput } from "@/types/climb_types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/climbs";

const climbApi = {
  create: async (data_obj: CreateClimbInput) => {
    const formData = new FormData();
    for (const [field, val] of Object.entries(data_obj)) {
      formData.append(field, val || "");
    }
    const response = await http.post<Climb>(`${API_URL}`, formData);
    return response.data;
  },

  getClimb: async (climb_id: number) => {
    const response = await http.get<Climb>(`${API_URL}/${climb_id}`);
    return response.data;
  },

  // patch: async (data_obj: Partial<Climb>) => {
  //   const response = await http.patch<Climb>(`${API_URL}`, {
  //     climb: data_obj,
  //   });
  //   return response.data;
  // },
};

export default climbApi;
