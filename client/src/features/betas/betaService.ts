import http from "@/services/axiosInstance";
import type { CreateBetaRequest, BetaResponse } from "@shared/types";

const POST_URL = `${import.meta.env.VITE_API_URL}/posts`;

const betaApi = {
  createBeta: async (data_obj: CreateBetaRequest, post_id: number) => {
    const response = await http.post<BetaResponse>(
      `${POST_URL}/${post_id}/betas`,
      data_obj,
    );
    return response.data;
  },
};

export default betaApi;
