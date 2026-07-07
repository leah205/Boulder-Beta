import { it, describe } from "vitest";
import { authRequest } from "@/tests/mocks";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import authQueries from "@/auth/authQueries";
import climbQueries from "@/climbs/climbQueries";

const climb_data = [
  {
    grade: "V3",
    color: "pink",
  },
];

describe("attempt integration", () => {
  it("attempt post and get works", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id: user_id } = await authQueries.createUser(username, password);
    const { id: climb_id } = await climbQueries.createClimb(
      user_id,
      climb_data[0],
    );

    return await authRequest(app, user_id, username)
      .post(`/api/v1/attempts/${climb_id}`)
      .send({
        send: false,
      })
      .expect(200)
      .then(() => {
        return authRequest(app, user_id, username)
          .post(`/api/v1/attempts/${climb_id}`)
          .send({
            send: true,
          });
      })
      .then(() => {
        return authRequest(app, user_id, username)
          .get(`/api/v1/climbs/${climb_id}/attempts`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveLength(2);
            expect(res.body[0].send).toBeFalsy();
            expect(res.body[0]).toHaveProperty("uploadedAt");
            expect(res.body[1].send).toBeTruthy();
          });
      })
      .then(() => {
        return authRequest(app, user_id, username)
          .get("/api/v1/users/me/climbs")
          .expect(200)
          .then((res) => {
            expect(res.body[0].sent).toBeTruthy();
          });
      });
  });

  it("throws unauthorized error when user tries to post attempt to another climb", async () => {
    const { id: user1 } = await authQueries.createUser("selena", "gomez");
    const { id: user2 } = await authQueries.createUser("taylor", "swift");
    const { id: climb_id } = await climbQueries.createClimb(
      user1,
      climb_data[0],
    );

    return await authRequest(app, user2, "taylor")
      .post(`/api/v1/attempts/${climb_id}`)
      .send({
        send: false,
      })
      .expect(401)
      .then((res) => {
        console.log(res);
      });
  });
});
