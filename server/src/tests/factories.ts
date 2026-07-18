import attemptQueries from "@/attempts/attemptQueries";
import authQueries from "@/auth/authQueries";
import climbQueries from "@/climbs/climbQueries";
import { AttemptWithVideoResponse } from "@shared/types";
// import { Prisma } from "generated/prisma/client";
import type { Climb, Post, User } from "generated/prisma/client";
import betaQueries from "@/betas/betaQueries";
import userQueries from "@/users/userQueries";

const users = [
  { username: "taylor", password: "swift" },
  { username: "selena", password: "gomez" },
];

const betas = [{ content: "hello world" }, { content: "bla bla bla" }];

const climbs = [
  { color: "green", sent: false },
  { color: "blue", sent: true, picture: "http://fake_picture" },
];

const attempts = [
  { clip: "first_fake_clip", send: false },
  { clip: "second_fake_clip", send: true },
  { clip: "third_fake_clip", send: false },
];

async function createTestUser(index: number = 0) {
  const user = users[index];
  return await authQueries.createUser(user.username, user.password);
}

async function createTestClimb(user: User, index: number = 0) {
  const climb = climbs[index];
  return await climbQueries.createClimb(user.id, {
    color: climb.color,
    sent: climb.sent,
  });
}

async function createTestBeta(post: Post, user: User, index: number = 0) {
  return await betaQueries.createBeta(post.id, user.id, betas[index]);
}

async function createTestAttempt(
  climb: Climb,
  index: number = 0,
  properties: Partial<AttemptWithVideoResponse> = {},
) {
  const attempt = { ...attempts[index], ...properties };

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
