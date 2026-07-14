import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
import {
  createTestAttempt,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";
import attemptQueries from "@/attempts/attemptQueries";

const app = initialize_app();

const POST_URL = "/api/v1/posts";
describe("GET /posts", async () => {
  // change when flip ordering by timestamp
  it("gets feed", async () => {
    const user1 = await createTestUser(0);
    const climb1 = await createTestClimb(user1, 0);
    const attempt1 = await createTestAttempt(climb1, 0);
    const attempt2 = await createTestAttempt(climb1, 1);
    await createTestAttempt(climb1, 1);
    await attemptQueries.postVideo(attempt1.id);
    await attemptQueries.postVideo(attempt2.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest
      .get(`${POST_URL}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(2);
      });
  });
});

describe("DELETE /posts", async () => {
  it("deletes post", async () => {
    const user1 = await createTestUser(0);
    const climb1 = await createTestClimb(user1, 0);
    const attempt1 = await createTestAttempt(climb1, 0);
    const attempt2 = await createTestAttempt(climb1, 1);
    const post = await attemptQueries.postVideo(attempt1.id);
    const post2 = await attemptQueries.postVideo(attempt2.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest
      .delete(`${POST_URL}/${post!.id}`)
      .expect(200)
      .then(() => {
        return authRequest
          .get(`${POST_URL}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveLength(1);
            expect(res.body[0].id).toBe(post2!.id);
          });
      })
      .then(() => {
        return authRequest
          .get(`/api/v1/climbs/${climb1.id}/attempts`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveLength(2);
            expect(res.body[0].video?.published).toBeFalsy();
          });
      });
  });
});
