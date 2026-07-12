import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
import {
  createTestAttempt,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";

const app = initialize_app();

const POST_URL = "/api/v1/posts";
describe("GET /posts", async () => {
  // change when flip ordering by timestamp
  it("gets feed", async () => {
    const user1 = await createTestUser(0);
    const climb1 = await createTestClimb(user1, 0);
    const attempt1 = await createTestAttempt(climb1, 0, { published: true });
    const attempt2 = await createTestAttempt(climb1, 1, { published: true });
    await createTestAttempt(climb1, 1, { published: false });
    const authRequest = new AuthRequest(app, user1.id, user1.username);

    await authRequest
      .get(`${POST_URL}`)
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].attemptId).toBe(attempt1.id);
        expect(res.body[1].attemptId).toBe(attempt2.id);
      });
  });
});
