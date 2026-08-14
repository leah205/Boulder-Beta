import { it, describe } from "vitest";
import initialize_app from "@/express_app";
import AuthRequest from "@/tests/AuthRequest";
import postQueries from "@/posts/postQueries";
import {
  createTestUser,
  createTestClimb,
  followTestUser,
  createTestAttemptWithVideo,
} from "@/tests/factories";

const app = initialize_app();

const USER_URL = "/api/v1/users";

describe("user tests", () => {
  it("inserts and then retrieves climbs", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    return authRequest
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/images/climb1.jpeg")
      .field("color", "blue")
      .then(() => {
        return authRequest
          .get(`${USER_URL}/me/climbs`)
          .expect(200)
          .then((res) => {
            const data = res.body;
            expect(data).toHaveLength(1);
            expect(data[0].color).toEqual("blue");
            expect(data[0].grade).toEqual("V5");
            expect(data[0]).toHaveProperty("picture");
          });
      });
  });

  it("follows uer", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    const user1 = await createTestUser();

    return authRequest
      .post(`${USER_URL}/me/following/follow`)
      .send({ user_id: user1.id })
      .then(() => {
        return authRequest
          .get(`${USER_URL}/${user.id}/following`)
          .expect(200)
          .then((res) => {
            const data = res.body;
            expect(data).toHaveLength(1);
            expect(data[0].id).toBe(user1.id);
          });
      });
  });

  it("unfollows user", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    const user1 = await createTestUser();
    await followTestUser(user, user1);

    return authRequest
      .post(`${USER_URL}/me/following/unfollow`)
      .send({ user_id: user1.id })
      .expect(200)
      .then(() => {
        return authRequest
          .get(`${USER_URL}/${user.id}/following`)
          .send({ user_id: user1.id })
          .expect(200)
          .then((res) => {
            const data = res.body;
            expect(data).toHaveLength(0);
          });
      });
  });

  it("throws error following user that doesnt exist", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    const user1 = await createTestUser();

    return authRequest
      .post(`${USER_URL}/me/following/follow`)
      .send({ user_id: user1.id + 5 })
      .expect(404);
  });
  it("gets user", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    return authRequest
      .get(`${USER_URL}/${user.id}`)
      .expect(200)
      .then((res) => {
        const data = res.body;
        expect(data.id).toBe(user.id);
      });
  });
  it("throws error getting nonexistent user", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    return authRequest.get(`${USER_URL}/${user.id + 1}`).expect(404);
  });

  it("gets user posts", async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();

    const climb1 = await createTestClimb(user1);
    const attempt1 = await createTestAttemptWithVideo(climb1);
    const post = await postQueries.postVideo(attempt1.id);

    const climb2 = await createTestClimb(user2);
    const attempt2 = await createTestAttemptWithVideo(climb2);
    await postQueries.postVideo(attempt2.id);

    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .get(`${USER_URL}/${user1.id}/posts`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBe(post.id);
      });
  });

  it("throws error trying to follow self", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    return authRequest
      .post(`${USER_URL}/me/following/follow`)
      .send({ user_id: user.id })
      .expect(400);
  });

  it('gets all users', async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();
    const authRequest = new AuthRequest(app, user1.id, user1.username);
     return authRequest
      .get(`${USER_URL}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(2);
      });


  })
});
