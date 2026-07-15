import type {
  AttemptWithVideoResponse,
  AuthResponse,
  ClimbResponse,
  PostResponse,
  VideoResponse,
} from "@shared/types";

let id = 0;

function createId() {
  return id++;
}

export function createTestUser(id: number, username: string) {
  return {
    id,
    username,
  } satisfies AuthResponse;
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
    rating: null,
    ...climb_input,
  } satisfies ClimbResponse;
}

export function createTestVideo(
  attempt: AttemptWithVideoResponse,
  overrides: Partial<VideoResponse>,
) {
  return {
    attemptId: attempt.id,
    clip: "fake_clip",
    post: null,
    ...overrides,
  } satisfies VideoResponse;
}

export function createTestPost(
  attempt: AttemptWithVideoResponse,
  overrides: Partial<PostResponse>,
) {
  return {
    attemptId: attempt.id,
    description: null,
    id: createId(),
    betas: [],
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
