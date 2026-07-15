import type {
  AttemptWithVideoResponse,
  AuthResponse,
  ClimbResponse,
} from "@shared/types";

export function createTestUser(id: number, username: string) {
  return {
    id,
    username,
  } satisfies AuthResponse;
}

export function createTestClimb(
  creator_id: number,
  climb_input: Partial<ClimbResponse>,
) {
  return {
    id: new Date().getTime(),
    grade: null,
    uploadedAt: new Date(),
    sent: false,
    creatorId: creator_id,
    color: "black",
    picture: null,
    rating: null,
    published: false,
    ...climb_input,
  } satisfies ClimbResponse;
}

export function createTestAttemptWithVideo(
  climbId: number,
  attempt_input: Partial<AttemptWithVideoResponse>,
) {
  return {
    id: new Date().getTime(),
    climbId,
    uploadedAt: new Date(),
    fallReason: null,
    notes: null,
    send: false,
    video: null,
    ...attempt_input,
  } satisfies AttemptWithVideoResponse;
}
