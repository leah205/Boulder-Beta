import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import {
  createTestAttempt,
  createTestAttemptWithVideo,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";
import attemptQueries from "@/attempts/attemptQueries";

const POST_URL = "/api/v1/posts";

describe("betas", () => {
  it("creates betas", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await attemptQueries.postVideo(attempt1.id);

    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest
      .post(`${POST_URL}/${post?.id}/betas`)
      .send({
        content: "hello world",
      })
      .expect(200)
      .then(() => {
        return authRequest
          .get(`${POST_URL}/${post?.id}`)
          .expect(200)
          .then((res) => {
            expect(res.body.betas).toHaveLength(1);
            expect(res.body.betas[0].content).toBe("hello world");
          });
      });
  });

  it("throws 404 posting beta on nonexistent post", async () => {
    const user1 = await createTestUser();

    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest
      .post(`${POST_URL}/7/betas`)
      .send({
        content: "hello world",
      })
      .expect(404);
  });
  it("throws 400 when no content", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await attemptQueries.postVideo(attempt1.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest.post(`${POST_URL}/${post?.id}/betas`).expect(400);
  });
});
