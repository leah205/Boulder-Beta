import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
export const handlers = [
  //   http.get(`${API_URL}/climbs/:climb_id`, () => {
  //     return HttpResponse.json({
  //       id: 1,
  //       uploadedAt: Date.now(),
  //     });
  //   }),
  // should respond with data
  http.get(`${API_URL}/auth/userFromToken`, () => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeq");
    return HttpResponse.json({
      id: 1,
      username: "leah",
    });
  }),

  http.post(`hi`, () => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeq");
    return HttpResponse.json({
      id: 1,
      username: "leah",
    });
  }),
];
