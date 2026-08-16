import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/express_app";
import {
  createTestAttempt,
  createTestAttemptWithVideo,
  createTestBeta,
  createTestClimb,
  createTestUser,
  followTestUser,
} from "@/tests/factories";
import postQueries from "../postQueries";
import clapQueries from "@/claps/clapQueries";
const app = initialize_app();

const POST_URL = "/api/v1/posts";
// describe("GET /posts", async () => {
//   //   // change when flip ordering by timestamp
//   //   it("gets feed", async () => {
//   //     const user1 = await createTestUser();
//   //     const climb1 = await createTestClimb(user1);
//   //     const attempt1 = await createTestAttemptWithVideo(climb1);
//   //     const attempt2 = await createTestAttemptWithVideo(climb1);
//   //     await createTestAttempt(climb1);
//   //     await postQueries.postVideo(attempt1.id);
//   //     await postQueries.postVideo(attempt2.id);
//   //     const authRequest = new AuthRequest(app, user1.id, user1.username);
//   //     await authRequest
//   //       .get(`${POST_URL}`)
//   //       .expect(200)
//   //       .then((res) => {
//   //         expect(res.body?.data).toHaveLength(3);
//   //         expect(res.body[0].author.username).toBe(user1.username);
//   //       });
//   //   });
//   // });
//   // describe("GET /posts/following", async () => {
//   //   // change when flip ordering by timestamp
//   //   it("gets following feed", async () => {
//   //     const user1 = await createTestUser();
//   //     const user2 = await createTestUser();
//   //     const user3 = await createTestUser();
//   //     const climb1 = await createTestClimb(user1);
//   //     const attempt1 = await createTestAttemptWithVideo(climb1);
//   //     await postQueries.postVideo(attempt1.id);
//   //     const climb2 = await createTestClimb(user2);
//   //     const attempt2 = await createTestAttemptWithVideo(climb2);
//   //     await postQueries.postVideo(attempt2.id);
//   //     await followTestUser(user3, user2);
//   //     const authRequest = new AuthRequest(app, user3.id, user3.username);
//   //     await authRequest
//   //       .get(`${POST_URL}/following`)
//   //       .expect(200)
//   //       .then((res) => {
//   //         expect(res.body?.data?).toHaveLength(1);
//   //         expect(res.body[0].author.username).toBe(user2.username);
//   //       });
//   //   });
// });

describe("GET /post", async () => {
  // change when flip ordering by timestamp
  it("gets a post", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
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

  it('gets clap count', async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();
    const climb1 = await createTestClimb(user2);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
    await clapQueries.createClap(post.id, user1.id);
    const beta = await createTestBeta(post, user1);
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .get(`${POST_URL}/${post?.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.clapCount).toBe(1);
      });
  });

  it('gets whether current user liked post', async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const attempt2 = await createTestAttemptWithVideo(climb1);
    const post1  = await postQueries.postVideo(attempt1.id);
    const post2 = await postQueries.postVideo(attempt2.id);
    await clapQueries.createClap(post1.id, user1.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .get(`${POST_URL}/${post1.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.currentUserLiked).toBeTruthy()
      }).then(() => {
            return authRequest.get(`${POST_URL}/${post2.id}`)
            .expect(200)
      .then((res) => {
        expect(res.body.currentUserLiked).toBeFalsy()
      })

      }
      )
  })

  
});
it("throws error when post not found", async () => {
  const user1 = await createTestUser();
  const authRequest = new AuthRequest(app, user1.id, user1.username);
  await authRequest.get(`${POST_URL}/8`).expect(404);
});

describe("DELETE /posts", async () => {
  it("deletes post", async () => {
    const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const attempt2 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
    await createTestBeta(post!, user1);
    const post2 = await postQueries.postVideo(attempt2.id);
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
            const attempts = res.body;
            const deletedPostAttempt = attempts.find(
          (attempt: any) => attempt.id === attempt1.id
      );

expect(deletedPostAttempt).toBeDefined();
expect(deletedPostAttempt.video?.post).toBeFalsy();
            // expect(res.body).toHaveLength(2);
            // expect(res.body[0].video?.post).toBeFalsy();
          });
      });
  });
  it("throws forbidden error on delete someone else post", async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const attempt2 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
    await createTestBeta(post!, user1);
    const post2 = await postQueries.postVideo(attempt2.id);
    const authRequest2 = new AuthRequest(app, user2.id, user2.username);

    await authRequest2.delete(`${POST_URL}/${post!.id}`).expect(403);
  });





});
