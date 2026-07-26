import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
import {
  createTestAttempt,
  createTestAttemptWithVideo,
  createTestBeta,
  createTestClimb,
  createTestUser,
  followTestUser,
} from "@/tests/factories";
import attemptQueries from "@/attempts/attemptQueries";

const app = initialize_app();

const POST_URL = "/api/v1/posts";
describe("GET /posts", async () => {
  //   // change when flip ordering by timestamp
  //   it("gets feed", async () => {
  //     const user1 = await createTestUser();
  //     const climb1 = await createTestClimb(user1);
  //     const attempt1 = await createTestAttemptWithVideo(climb1);
  //     const attempt2 = await createTestAttemptWithVideo(climb1);
  //     await createTestAttempt(climb1);
  //     await attemptQueries.postVideo(attempt1.id);
  //     await attemptQueries.postVideo(attempt2.id);
  //     const authRequest = new AuthRequest(app, user1.id, user1.username);
  //     await authRequest
  //       .get(`${POST_URL}`)
  //       .expect(200)
  //       .then((res) => {
  //         expect(res.body?.data).toHaveLength(3);
  //         expect(res.body[0].author.username).toBe(user1.username);
  //       });
  //   });
  // });
  // describe("GET /posts/following", async () => {
  //   // change when flip ordering by timestamp
  //   it("gets following feed", async () => {
  //     const user1 = await createTestUser();
  //     const user2 = await createTestUser();
  //     const user3 = await createTestUser();
  //     const climb1 = await createTestClimb(user1);
  //     const attempt1 = await createTestAttemptWithVideo(climb1);
  //     await attemptQueries.postVideo(attempt1.id);
  //     const climb2 = await createTestClimb(user2);
  //     const attempt2 = await createTestAttemptWithVideo(climb2);
  //     await attemptQueries.postVideo(attempt2.id);
  //     await followTestUser(user3, user2);
  //     const authRequest = new AuthRequest(app, user3.id, user3.username);
  //     await authRequest
  //       .get(`${POST_URL}/following`)
  //       .expect(200)
  //       .then((res) => {
  //         expect(res.body?.data?).toHaveLength(1);
  //         expect(res.body[0].author.username).toBe(user2.username);
  //       });
  //   });
});

describe("GET /post", async () => {
  // change when flip ordering by timestamp
  it("gets posts", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await attemptQueries.postVideo(attempt1.id);
    const beta = await createTestBeta(post, user1);
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .get(`${POST_URL}/${post?.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(post?.id);
        expect(res.body.author.username).toBe(user1.username);
        expect(res.body.betas[0].content).toBe(beta.content);
      });
  });
});

describe("DELETE /posts", async () => {
  it("deletes post", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const attempt2 = await createTestAttemptWithVideo(climb1);
    const post = await attemptQueries.postVideo(attempt1.id);
    await createTestBeta(post!, user1);
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
            expect(res.body?.data).toHaveLength(1);
            expect(res.body?.data[0].id).toBe(post2!.id);
          });
      })
      .then(() => {
        return authRequest
          .get(`/api/v1/climbs/${climb1.id}/attempts`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveLength(2);
            expect(res.body[0].video?.post).toBeFalsy();
          });
      });
  });
});
