import { it, describe } from "vitest";
import initialize_app from "@/utils/express_app";
import AuthRequest from "@/tests/AuthRequest";
import attemptQueries from "@/attempts/attemptQueries";
import {
  createTestAttempt,
  createTestUser,
  createTestClimb,
  followTestUser,
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
  // it("gets users posts", async () => {
  //   const user1 = await createTestUser(0);
  //   const climb1 = await createTestClimb(user1, 0);
  //   const attempt1 = await createTestAttempt(climb1, 0);

  //   const user2 = await createTestUser(1);
  //   const climb2 = await createTestClimb(user2, 1);
  //   const attempt2 = await createTestAttempt(climb2, 1);

  //   const post1 = await attemptQueries.postVideo(attempt1.id);
  //   await attemptQueries.postVideo(attempt2.id);

  //   const authRequest = new AuthRequest(app, user1.id, user1.username);

  //   await authRequest
  //     .get(`${USER_URL}/me/posts`)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body).toHaveLength(1);
  //       expect(res.body[0].id).toBe(post1?.id);
  //     });
  // });

  it("follows uer", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    const user1 = await createTestUser(1);

    return authRequest
      .post(`${USER_URL}/following/follow`)
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
    // .then(() => {
    //   return authRequest
    //     .get(`${USER_URL}/${user1.id}/following`)
    //     .expect(200)
    //     .then((res) => {
    //       const data = res.body;
    //       expect(data).toHaveLength(1);
    //       expect(data[0].id).toBe(user1.id);
    //     });
    // });
  });

  it("unfollows user", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    const user1 = await createTestUser(1);
    await followTestUser(user, user1);

    return authRequest
      .post(`${USER_URL}/following/unfollow`)
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
    const user1 = await createTestUser(0);
    const user2 = await createTestUser(1);

    const climb1 = await createTestClimb(user1, 0);
    const attempt1 = await createTestAttempt(climb1, 0);
    const post = await attemptQueries.postVideo(attempt1.id);

    const climb2 = await createTestClimb(user2, 1);
    const attempt2 = await createTestAttempt(climb2, 1);
    await attemptQueries.postVideo(attempt2.id);

    const authRequest = new AuthRequest(app, user1.id, user1.username);
    await authRequest
      .get(`${USER_URL}/${user1.id}/posts`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBe(post.id);
      });
  });
});
