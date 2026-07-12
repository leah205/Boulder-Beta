import http from "@/services/axiosInstance";
import type {
  ClimbResponse,
  AttemptResponse,
  CreateClimbRequest,
} from "@shared/types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/climbs";

const climbApi = {
  create: async (data_obj: CreateClimbRequest) => {
    const formData = new FormData();
    for (const [field, val] of Object.entries(data_obj)) {
      formData.append(field, val || "");
    }
    const response = await http.post<ClimbResponse>(`${API_URL}`, formData);
    return response.data;
  },

  getClimb: async (climb_id: number) => {
    const response = await http.get<ClimbResponse>(`${API_URL}/${climb_id}`);
    return response.data;
  },

  getAttempts: async (climb_id: number) => {
    const response = await http.get<AttemptResponse[]>(
      `${API_URL}/${climb_id}/attempts`,
    );
    response.data = response.data.map((data) => {
      data.uploadedAt = new Date(data.uploadedAt);
      return data;
    });
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
