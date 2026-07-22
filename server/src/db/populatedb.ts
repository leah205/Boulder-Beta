import attemptQueries from "@/attempts/attemptQueries";
import {
  createTestUser,
  createTestClimb,
  createTestAttempt,
  createTestBeta,
} from "@/tests/factories";

async function seed_db() {
  const user1 = await createTestUser("leah", "tiktin");
  const climb1 = await createTestClimb(user1, {
    picture: null,
    sent: false,
  });
  const climb2 = await createTestClimb(user1, {
    picture: null,
    sent: true,
  });
  await createTestAttempt(climb1);
  const attempt2 = await createTestAttempt(climb1, {
    clip: "./src/assets/videos/attempt2.mp4",
  });

  const post1 = await attemptQueries.postVideo(attempt2.id);

  const attempt3 = await createTestAttempt(climb2, {
    clip: "./src/assets/videos/send1.mp4",
  });

  const post2 = await attemptQueries.postVideo(attempt3.id);

  const user2 = await createTestUser();

  //fix

  const climb3 = await createTestClimb(user2, {
    picture: null,
    sent: true,
  });

  const attempt4 = await createTestAttempt(climb3, {
    clip: "./src/assets/videos/attempt2.mp4",
  });

  const attempt5 = await createTestAttempt(climb3, {
    send: true,
    clip: "./src/assets/videos/send2.mp4",
  });

  const post3 = await attemptQueries.postVideo(attempt4.id);
  const post4 = await attemptQueries.postVideo(attempt5.id);

  await createTestBeta(post1, user1);
  await createTestBeta(post1, user2);
  await createTestBeta(post3, user1);
  await createTestBeta(post4, user1);
}

async function main() {
  await seed_db();
}

main();
