import prisma from "../server/src/db/prisma_client";

import * as z from "zod";

import type {
  Climb,
  User,
  Attempt,
  Post,
  Prisma,
  Beta,
  Video,
} from "../server/generated/prisma/client";

import type { UserPayloadType } from "../server/src/users/userQueries";
import type { FollowPayloadType } from "../server/src/users/userQueries";
import type { PostPayloadType } from "../server/src/posts/postQueries";

// response types

export type AuthResponse = Pick<User, "id" | "username"> | undefined;
export type LoginResponse = Pick<User, "id" | "username"> & { token: string };
export type ClimbResponse = Omit<Climb, "public_id"> & {
  picture?: string | null;
};

export type UserResponse = Omit<User, "password"> & {
  followedBy: {
    id: number;
    username: string;
  }[];
  following: {
    id: number;
    username: string;
  }[];
};

export type FollowResponse = Omit<User, "password">;

// for climb page
export type AttemptWithVideoResponse = Omit<Attempt, "uploadedAt"> & {
  uploadedAt: string;
  video: {
    clip: string | null;
    post: {
      id: number;
      attemptId: number;
      description: string | null;
    } | null;
  } | null;
};

export type AttemptResponse = Omit<Attempt, "uploadedAt"> & {
  uploadedAt: string;
};

export type VideoResponse = Omit<Video, "public_id"> & {
  clip: string;
  post: PostResponse | null;
};

// export type UserResponse = Omit<User, "password">;

const BetaWithUser = {
  include: {
    author: {
      select: { id: true, username: true },
    },
  },
} satisfies Prisma.BetaDefaultArgs;

export type BetaResponse = Prisma.BetaGetPayload<typeof BetaWithUser>;

export type PostResponse = Omit<Post, "uploadedAt"> & {
  clip?: string | null;
  climb_id: number;
  uploadedAt: string;
  author: {
    id: number;
    username: string;
  };
} & {
  betas: BetaResponse[];
};

//zod schemas

export type { PostPayloadType } from "../server/src/posts/postQueries";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  password_confirm: z.string(),
});

export const CreateClimbSchema = z.object({
  grade: z.string().nullable(),
  color: z.string(),
  picture: z.nullish(z.file()),
});

export const CreateAttemptSchema = z.object({
  send: z.boolean(),
  clip: z.file().optional().nullable(),
  published: z.boolean().optional(),
});

export const createBetaSchema = z.object({
  content: z.string(),
});

export const FollowUserSchema = z.object({
  user_id: z.number(),
});

export type CreateBetaRequest = z.infer<typeof createBetaSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type SignupRequest = z.infer<typeof SignupSchema>;
export type CreateClimbRequest = z.infer<typeof CreateClimbSchema>;
export type CreateAttemptRequest = z.infer<typeof CreateAttemptSchema>;
export type followUserRequest = z.infer<typeof FollowUserSchema>;

export type ValidationErrorResponse = { errors: string[] };
export type ErrorResponse = string;
