import postQueries from "@/posts/postQueries";
import { v2 as cloudinary } from "cloudinary";
import prisma from "./prisma_client";
import {
  createTestUser,
  createTestClimb,
  createTestAttempt,
  createTestBeta,
} from "@/tests/factories";
import { faker } from "@faker-js/faker";

async function reset_db() {
  // await prisma.$queryRaw`DROP schema public CASCADE`;
  await prisma.$transaction([
    prisma.beta.deleteMany(),
    prisma.post.deleteMany(),
    prisma.video.deleteMany(),
    prisma.attempt.deleteMany(),
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

async function reset_cloudinary() {
  await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
    type: "authenticated",
    resource_type: "image",
  });
  await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
    type: "authenticated",
    resource_type: "video",
  });
}

async function seed_db() {
  const user1 = await createTestUser("guest", "password");

  const climb1 = await createTestClimb(user1, {
    picture: "./src/assets/images/climb1.jpeg",
    sent: false,
  });
  const climb2 = await createTestClimb(user1, {
    picture: "./src/assets/images/climb2.jpeg",
    sent: true,
  });

  const attempt2 = await createTestAttempt(climb1, {
    clip: "./src/assets/videos/attempt2.mp4",
    uploadedAt: faker.date.anytime(),
  });

  const post1 = await postQueries.postVideo(attempt2.id, faker.date.anytime());

  const attempt3 = await createTestAttempt(climb2, {
    clip: "./src/assets/videos/send1.mp4",
  });

  await postQueries.postVideo(attempt3.id, faker.date.anytime());

  const user2 = await createTestUser();
  user2.username;

  const climb3 = await createTestClimb(user2, {
    picture: "./src/assets/images/climb3.jpeg",
    sent: true,
  });

  const attempt4 = await createTestAttempt(climb3, {
    clip: "./src/assets/videos/attempt2.mp4",
  });

  const attempt5 = await createTestAttempt(climb3, {
    send: true,
    clip: "./src/assets/videos/send2.mp4",
  });

  const post3 = await postQueries.postVideo(attempt4.id, faker.date.anytime());
  const post4 = await postQueries.postVideo(attempt5.id, faker.date.anytime());

  const user3 = await createTestUser();
  user3.username;

  const climb = await createTestClimb(user3, {
    picture: "./src/assets/images/climb3.jpeg",
    sent: true,
  });

  const attempt6 = await createTestAttempt(climb, {
    clip: "./src/assets/videos/attempt2.mp4",
  });

  const attempt7 = await createTestAttempt(climb, {
    send: true,
    clip: "./src/assets/videos/send2.mp4",
  });

  await postQueries.postVideo(attempt6.id, faker.date.anytime());
  await postQueries.postVideo(attempt7.id, faker.date.anytime());
}

async function main() {
  await reset_db();
  await reset_cloudinary();
  await seed_db();
}

main();
