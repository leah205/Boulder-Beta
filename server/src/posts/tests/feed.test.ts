import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
import { createFeedScenario } from "@/tests/scenarios";
import { PostResponse } from "@shared/types";

const app = initialize_app();
const POST_URL = "/api/v1/posts";

describe("feed", async () => {
  it("renders latest three posts", async () => {
    const { authors, viewer, climbs, attempts, posts } =
      await createFeedScenario();

    const authRequest = new AuthRequest(app, viewer.id, viewer.username);
    await authRequest.get(`${POST_URL}`).then((res) => {
      const postsPage = res.body.data;
      expect(res.body).toHaveProperty("nextCursor");
      const dates = posts.map((post) => post.uploadedAt);
      const mostRecentDates = dates
        .sort((a, b) => {
          return a < b ? 1 : -1;
        })
        .slice(0, 3);
      const postPageDates = postsPage.map(
        (post: PostResponse) => post.uploadedAt,
      );
      expect(
        JSON.stringify(mostRecentDates) == JSON.stringify(postPageDates),
      ).toBeTruthy();

      // chack that they are the latest posts
    });
  });
  it("renders fourth post when query next page", async () => {
    const { authors, viewer, climbs, attempts, posts } =
      await createFeedScenario();
    const authRequest = new AuthRequest(app, viewer.id, viewer.username);
    await authRequest.get(`${POST_URL}`).then((res) => {
      const nextCursor = res.body.nextCursor;
      return authRequest
        .get(`${POST_URL}`)
        .query({ cursor: nextCursor, limit: 3 })
        .then((res) => {
          const postPage = res.body;
          expect(postPage.data).toHaveLength(1);
          expect(postPage.nextCursor).toBeNull();
        });
    });
  });

  it("throws 400 error with invalid cursor", async () => {
    const { authors, viewer, climbs, attempts, posts } =
      await createFeedScenario();
    const authRequest = new AuthRequest(app, viewer.id, viewer.username);
    return await authRequest
      .get(`${POST_URL}`)
      .query({ cursor: "somethign invalid" })
      .expect(400);
  });

  it("returns empty data array when nothing on feed page", async () => {
    const { authors, viewer, climbs, attempts, posts } =
      await createFeedScenario();
    const authRequest = new AuthRequest(app, viewer.id, viewer.username);
    return await authRequest
      .get(`${POST_URL}`)
      .query({ limit: 4 })
      .then((res) => {
        return authRequest
          .get(`${POST_URL}`)
          .query({ cursor: res.body.nextCursor })
          .then((res) => {
            expect(res.body.data).toHaveLength(0);
            expect(res.body.nextCursor).toBeNull();
          });
      });
  });
});
describe("following feed", async () => {
  it("renders latest three posts", async () => {
    const { authors, viewer, climbs, attempts, posts } =
      await createFeedScenario();

    const authRequest = new AuthRequest(app, viewer.id, viewer.username);
    await authRequest.get(`${POST_URL}/following`).then((res) => {
      const postsPage = res.body.data;
      expect(res.body).toHaveProperty("nextCursor");
      expect(res.body.data.length).toEqual(3);
      return authRequest
        .get(`${POST_URL}`)
        .query({ cursor: res.body.nextCursor })
        .then((res) => {
          expect(res.body.data).toHaveLength(0);
        });

      // chack that they are the latest posts
    });
  });
});
