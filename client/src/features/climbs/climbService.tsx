import http from "@/services/axiosInstance";
import type {
  ClimbResponse,
  AttemptWithVideoResponse,
  CreateClimbRequest,
  CreateAttemptRequest,
} from "@shared/types";

const API_URL = `${import.meta.env.VITE_API_URL}/climbs`;

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
    const response = await http.get<AttemptWithVideoResponse[]>(
      `${API_URL}/${climb_id}/attempts`,
    );
    response.data;
    console.log(response.data);
    return response.data;
  },
  logAttempt: async (climbId: number, attempt: CreateAttemptRequest) => {
    const formData = new FormData();

    formData.append("send", String(attempt.send));
    formData.append("height", attempt.height ? String(attempt.height) : "");
    formData.append("clip", attempt.clip || "");
    const response = await http.post(
      `${API_URL}/${climbId}/attempts`,
      formData,
    );

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
