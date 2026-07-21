import authQueries from "@/auth/authQueries";
import climbQueries from "@/climbs/climbQueries";
import attemptQueries from "@/attempts/attemptQueries";
import betaQueries from "@/betas/betaQueries";
import {
  createTestUser,
  createTestClimb,
  createTestAttempt,
} from "@/tests/factories";
import userQueries from "@/users/userQueries";

async function seed_db() {
  const user1 = await createTestUser();
  const climb1 = await createTestClimb(user1, {
    picture: "./src/assets/images/climb1.jpeg",
    sent: false,
  });
  const climb2 = await createTestClimb(user1, {
    picture: "./src/assets/images/climb2.jpeg",
    sent: true,
  });
  await createTestAttempt(climb1);
  const attempt2 = await createTestAttempt(climb1, {
    clip: "./src/assets/videos/attempt1.mov",
  });

  const post1 = await attemptQueries.postVideo(attempt2.id);

  const attempt3 = await createTestAttempt(climb2, {
    clip: "./src/assets/videos/send1.mov",
  });

  const post2 = await attemptQueries.postVideo(attempt3.id);

  const user2 = await createTestUser();

  //fix

  const climb3 = await climbQueries.createClimb(user2.id, {
    grade: "V0",
    picture: "./src/assets/climb3.jpg",
    sent: true,
    color: "red",
  });

  const attempt4 = await attemptQueries.createAttempt(climb3.id, {
    send: false,
    clip: "./src/assets/videos/attempt2.mov",
  });

  const attempt5 = await attemptQueries.createAttempt(climb3.id, {
    send: true,
    clip: "./src/assets/videos/send2.mov",
  });

  const post3 = await attemptQueries.postVideo(attempt4.id);
  const post4 = await attemptQueries.postVideo(attempt5.id);
  await betaQueries.createBeta(post1!.id, user1.id, {
    content: "hello world",
  });

  await betaQueries.createBeta(post2!.id, user2.id, {
    content: "hello",
  });

  await betaQueries.createBeta(post2!.id, user1.id, {
    content: "there",
  });

  await betaQueries.createBeta(post3!.id, user1.id, {
    content: "you got this!",
  });

  await betaQueries.createBeta(post4!.id, user1.id, {
    content: "good job!",
  });
}

async function main() {
  await seed_db();
}

main();
