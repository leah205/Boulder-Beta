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
import postQueries from "@/posts/postQueries";
import clapQueries from "./clapQueries";
const app = initialize_app();
const CLAP_URL = "/api/v1/posts";

describe('POST /claps', async () => {
    
    it('successfully posts claps', async () => {
        const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);

     await authRequest
      .post(`${CLAP_URL}/${post?.id}/clap`)
      .expect(200)
      .then((res) => {
        expect(res.body.postId).toBe(post.id);
        expect(res.body.userId).toBe(user1?.id);
      });
  });

  it('successfully unclaps a post', async () => {
      const user1 = await createTestUser();
    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);
    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await clapQueries.createClap(post.id, user1.id)

     await authRequest
      .post(`${CLAP_URL}/${post?.id}/unclap`)
      .expect(200)
      .then((res) => {
        expect(res.body.postId).toBe(post.id);
        expect(res.body.userId).toBe(user1?.id);
      }).then(() => {
        return authRequest
      .get(`${CLAP_URL}/${post?.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.clapCount).toBe(0);
      });
      })
  })


    it('throws error when post does not exist', async () => {
        const user1 = await createTestUser();
            const authRequest = new AuthRequest(app, user1.id, user1.username);

         await authRequest
      .post(`${CLAP_URL}/999/clap`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('post not found')
      });
  });

    
})