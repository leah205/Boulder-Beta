import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import {
  createTestAttempt,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";

const ATTEMPT_URL = "/api/v1/attempts";
const CLIMB_URL = "/api/v1/climbs";
describe("attempt integration", () => {
  it("attempt post and get works", async () => {
    const user = await createTestUser();

    const climb = await createTestClimb(user);
    const climb_id = climb.id;
    const authRequest = new AuthRequest(app, user.id, user.username);

    return await authRequest
      .post(`${ATTEMPT_URL}/${climb_id}`)
      .send({
        send: false,
      })
      .expect(200)
      .then(() => {
        return authRequest.post(`${CLIMB_URL}/${climb_id}/attempts`).send({
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
      .post(`${CLIMB_URL}/${climb_id}/attempts`)
      .send({
        send: false,
      })
      .expect(403);
  });

  it("publishing attempt with video works", async () => {
    const user1 = await createTestUser();
    const climb = await createTestClimb(user1);
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    const attempt = await createTestAttempt(climb);

    await authRequest
      .post(`${ATTEMPT_URL}/${attempt.id}/video/post`)
      .expect(200)
      .then(() => {
        return authRequest
          .get(`${ATTEMPT_URL}/${attempt.id}/video`)
          .then((res) => {
            expect(res.body.video.published).toBeTruthy();
            expect(res.body.video).toHaveProperty("clip");
          });
      });
  }, 10000);

  it("does not allow publishing someone else attempt", async () => {
    const user1 = await createTestUser(0);
    const user2 = await createTestUser(1);
    const climb = await createTestClimb(user1);
    const attempt = await createTestAttempt(climb);

    const authRequest = new AuthRequest(app, user2.id, user2.username);
    await authRequest
      .post(`${ATTEMPT_URL}/${attempt.id}/video/post`)
      .expect(403);
  });
});
