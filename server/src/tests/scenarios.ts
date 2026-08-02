import {
  createTestAttempt,
  createTestAttemptWithVideo,
  createTestClimb,
  createTestUser,
  followTestUser,
} from "@/tests/factories";

import postQueries from "@/posts/postQueries";
async function createFeedScenario() {
  const author1 = await createTestUser();
  const author2 = await createTestUser();
  const viewer = await createTestUser();

  const author1Climb1 = await createTestClimb(author1);
  const author1Climb2 = await createTestClimb(author1);
  const author2Climb1 = await createTestClimb(author2);
  const viewerClimb = await createTestClimb(viewer);

  const author1Attempt1 = await createTestAttemptWithVideo(author1Climb1);
  const author1Attempt2 = await createTestAttemptWithVideo(author1Climb2);
  const author2Attempt1 = await createTestAttemptWithVideo(author2Climb1);
  const viewerAttempt = await createTestAttemptWithVideo(viewerClimb);

  await createTestAttempt(author1Climb1);
  await createTestAttempt(author1Climb2);
  await createTestAttempt(author2Climb1);
  await createTestAttempt(viewerClimb);

  const author1Post1 = await postQueries.postVideo(author1Attempt1.id);
  const author1Post2 = await postQueries.postVideo(author1Attempt2.id);
  const author2Post1 = await postQueries.postVideo(author2Attempt1.id);
  const viewerPost = await postQueries.postVideo(viewerAttempt.id);

  await followTestUser(viewer, author1);
  await followTestUser(viewer, author2);

  return {
    authors: [author1, author2],
    viewer,
    climbs: [author1Climb1, author1Climb2, author2Climb1, viewerClimb],
    attempts: [
      author1Attempt1,
      author1Attempt2,
      author2Attempt1,
      viewerAttempt,
    ],
    posts: [author1Post1, author1Post2, author2Post1, viewerPost],
  };
}

export { createFeedScenario };
