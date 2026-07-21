import attemptQueries from "@/attempts/attemptQueries";
import authQueries from "@/auth/authQueries";
import climbQueries from "@/climbs/climbQueries";
// import { Prisma } from "generated/prisma/client";
import type { Climb, Post, User } from "generated/prisma/client";
import betaQueries from "@/betas/betaQueries";
import userQueries from "@/users/userQueries";
import { faker } from "@faker-js/faker";

async function createTestUser() {
  return await authQueries.createUser(
    faker.internet.username(),
    faker.internet.password(),
  );
}

async function createTestClimb(
  user: User,
  properties: Record<string, unknown> = {},
) {
  return await climbQueries.createClimb(user.id, {
    color: faker.helpers.arrayElement([
      "red",
      "green",
      "blue",
      "purple",
      "pink",
      "yellow",
    ]),
    sent: faker.helpers.arrayElement([true, false]),
    ...properties,
  });
}

async function createTestBeta(post: Post, user: User) {
  return await betaQueries.createBeta(post.id, user.id, {
    content: faker.string.alpha(10),
  });
}

async function createTestAttempt(
  climb: Climb,
  properties: Record<string, unknown> = {},
) {
  const attempt = {
    send: faker.helpers.arrayElement([true, false]),
    clip: faker.string.alpha(10),
    ...properties,
  };

  const res = await attemptQueries.createAttempt(climb.id, attempt);
  return res;
}

async function followTestUser(follower: User, followee: User) {
  return await userQueries.followUser(followee.id, follower.id);
}

export {
  createTestUser,
  createTestClimb,
  createTestAttempt,
  createTestBeta,
  followTestUser,
};
