import { faker } from "@faker-js/faker";

import type {
  AttemptWithVideoResponse,
  AuthResponse,
  BetaResponse,
  ClimbResponse,
  PostResponse,
  UserResponse,
  VideoResponse,
} from "@shared/types";

let id = 0;

export function createTestUser(overrides: Partial<UserResponse> = {}) {
  const user_id = faker.number.int();
  return {
    id: user_id,
    username: faker.internet.username(),
    grade: null,
    profilePicture: null,
    private: false,
    followedBy: [],
    following: [],
    ...overrides,
  } satisfies UserResponse;
}

export function createTestClimb(climb_input: Partial<ClimbResponse>) {
  return {
    id: faker.number.int(),
    grade: null,
    uploadedAt: faker.date.past().toJSON(),
    sent: false,
    creatorId: faker.number.int(),
    color: faker.helpers.arrayElement(["red", "green", "blue", "purple"]),
    picture: null,
    public: false,
    rating: null,
    ...climb_input,
  } satisfies ClimbResponse;
}

export function createTestVideo(overrides: Partial<VideoResponse> = {}) {
  return {
    attemptId: faker.number.int(),
    clip: "fake_clip",
    post: null,
    ...overrides,
  } satisfies VideoResponse;
}

export function createTestBeta(overrides = {}) {
  const beta_id = faker.number.int();
  return {
    author: {
      id: faker.number.int(),
      username: "fake user " + faker.number.int(),
    },
    id: beta_id,
    postId: faker.number.int(),
    userId: faker.number.int(),
    uploadedAt: new Date(),
    starred: false,
    content: "beta " + beta_id,
    ...overrides,
  } satisfies BetaResponse;
}

export function createTestPost(overrides: Partial<PostResponse> = {}) {
  return {
    attemptId: faker.number.int(),
    description: null,
    id: faker.number.int(),
    uploadedAt: faker.date.past().toJSON(),
    betas: [],
    climb_id: faker.number.int(),
    author: {
      username: "fake user" + faker.number.int(),
      id: faker.number.int(),
    },
    ...overrides,
  } satisfies PostResponse;
}

export function createTestAttemptWithVideo(
  attempt_input: Partial<AttemptWithVideoResponse>,
) {
  return {
    id: faker.number.int(),
    climbId: faker.number.int(),
    uploadedAt: faker.date.past().toJSON(),
    fallReason: null,
    notes: null,
    send: false,
    video: null,
    ...attempt_input,
  } satisfies AttemptWithVideoResponse;
}
