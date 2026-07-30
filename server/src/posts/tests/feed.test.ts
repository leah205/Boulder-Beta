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
    console.log(posts);
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
});
