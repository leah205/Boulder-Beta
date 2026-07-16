import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import {
  createTestAttempt,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";
import attemptQueries from "@/attempts/attemptQueries";

const POST_URL = "/api/v1/posts";

describe("betas", () => {
  it("creates posts", async () => {
    const user1 = await createTestUser(0);
    const climb1 = await createTestClimb(user1, 0);
    const attempt1 = await createTestAttempt(climb1, 0);
    const post = await attemptQueries.postVideo(attempt1.id);
    console.log("hey");
    console.log(post);
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
});
