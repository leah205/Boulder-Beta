import http from "@/utils/axiosInstance";
import type { Attempt } from "@shared/types";
import type { AttemptInputType } from "@/types/attempt_types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/attempts";

const attemptApi = {
  logAttempt: async (climbId: number, attempt: AttemptInputType) => {
    console.log(attempt);
    const formData = new FormData();
    formData.append("send", String(attempt.send));
    formData.append("clip", attempt.clip || "");
    const response = await http.post<Attempt>(
      `${API_URL}/${climbId}`,
      formData,
    );

    return response.data;
  },
};

export default attemptApi;
