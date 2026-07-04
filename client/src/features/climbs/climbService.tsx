import http from "@/utils/axiosInstance";
import type { Climb } from "@shared/types";

type ClimbInput = {
  grade: string | null;
  picture: File | null;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/climbs";

const climbApi = {
  create: async (data_obj: ClimbInput) => {
    console.log(data_obj);
    const formData = new FormData();
    formData.append("grade", data_obj.grade || "");
    formData.append("picture", data_obj.picture || "");
    const response = await http.post<Climb>(`${API_URL}`, formData);
    return response.data;
  },

  patch: async (data_obj: Partial<Climb>) => {
    const response = await http.patch<Climb>(`${API_URL}`, {
      climb: data_obj,
    });
    return response.data;
  },
};

export default climbApi;
