import type {
  AttemptWithVideoResponse,
  AuthResponse,
  BetaResponse,
  ClimbResponse,
  PostResponse,
  UserResponse,
  VideoResponse,
} from "@shared/types";
import { create } from "domain";

let id = 0;

function createId() {
  return id++;
}

export function createTestUser(overrides: Partial<UserResponse> = {}) {
  const user_id = createId();
  return {
    id: user_id,
    username: "user" + user_id,
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
    id: createId(),
    grade: null,
    uploadedAt: new Date(),
    sent: false,
    creatorId: createId(),
    color: "black",
    picture: null,
    public: false,
    rating: null,
    ...climb_input,
  } satisfies ClimbResponse;
}

export function createTestVideo(overrides: Partial<VideoResponse> = {}) {
  return {
    attemptId: createId(),
    clip: "fake_clip",
    post: null,
    ...overrides,
  } satisfies VideoResponse;
}

export function createTestBeta(overrides = {}) {
  const beta_id = createId();
  return {
    author: {
      id: createId(),
      username: "fake user " + createId(),
    },
    id: beta_id,
    postId: createId(),
    userId: createId(),
    uploadedAt: new Date(),
    starred: false,
    content: "beta " + beta_id,
    ...overrides,
  } satisfies BetaResponse;
}

export function createTestPost(overrides: Partial<PostResponse> = {}) {
  return {
    attemptId: createId(),
    description: null,
    id: createId(),
    betas: [],
    climb_id: createId(),
    author: {
      username: "fake user" + createId(),
      id: createId(),
    },
    ...overrides,
  } satisfies PostResponse;
}

export function createTestAttemptWithVideo(
  attempt_input: Partial<AttemptWithVideoResponse>,
) {
  return {
    id: createId(),
    climbId: createId(),
    uploadedAt: new Date(),
    fallReason: null,
    notes: null,
    send: false,
    video: null,
    ...attempt_input,
  } satisfies AttemptWithVideoResponse;
}
