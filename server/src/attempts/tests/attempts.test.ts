import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import { createTestClimb, createTestUser } from "@/tests/factories";

describe("attempt integration", () => {
  it("attempt post and get works", async () => {
    const user = await createTestUser();

    const climb = await createTestClimb(user);
    const climb_id = climb.id;
    const authRequest = new AuthRequest(app, user.id, user.username);

    return await authRequest
      .post(`/api/v1/attempts/${climb_id}`)
      .send({
        send: false,
      })
      .expect(200)
      .then(() => {
        return authRequest.post(`/api/v1/attempts/${climb_id}`).send({
          send: true,
        });
      })
      .then(() => {
        return authRequest
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
        return authRequest
          .get("/api/v1/users/me/climbs")
          .expect(200)
          .then((res) => {
            expect(res.body[0].sent).toBeTruthy();
          });
      });
  });

  it("throws frobidden error when user tries to post attempt to another climb", async () => {
    const user1 = await createTestUser(0);
    const user2 = await createTestUser(1);
    const climb = await createTestClimb(user1);
    const climb_id = climb.id;
    const authRequest2 = new AuthRequest(app, user2.id, user2.username);

    return await authRequest2
      .post(`/api/v1/attempts/${climb_id}`)
      .send({
        send: false,
      })
      .expect(403);
  });

  it("publishing attempt with video works works", async () => {
    const user1 = await createTestUser();
    const climb = await createTestClimb(user1);
    const climb_id = climb.id;
    let attempt_id = 0;
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .post(`/api/v1/attempts/${climb_id}`)
      .field("send", true)
      .attach("clip", "./src/assets/video1.mov")
      .expect(200)
      .then((res) => {
        attempt_id = res.body.id;
        expect(true).toBeTruthy();
      })
      .then(() => {
        return authRequest
          .post(`/api/v1/attempts/${attempt_id}/publish`)
          .expect(200)
          .then(() => {
            return authRequest
              .get(`/api/v1/climbs/${climb_id}/attempts`)
              .then((res) => {
                expect(res.body[0].published).toBeTruthy();
                expect(res.body[0]).toHaveProperty("clip");
              });
          });
      });
  }, 10000);
});
