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
import { UserMaxOrderByAggregateInput } from "generated/prisma/models";

// response types

//export type AuthResponse = Pick<User, "id" | "username"> | undefined;

export type AuthResponse =
  | {
      username: string;
      id: number;
    }
  | undefined;

//export type LoginResponse = Pick<User, "id" | "username"> & { token: string };

export type LoginResponse = {
  username: string;
  id: number;
  token: string;
};

// export type ClimbResponse = Omit<Climb, "public_id" | "uploadedAt"> & {
//   uploadedAt: string;
//   picture?: string | null;
// };

export type ClimbResponse = {
  id: number;
  uploadedAt: string;
  grade: string | null;
  color: string;
  rating: number | null;
  public: boolean;
  sent: boolean;
  creatorId: number;
  picture?: string | null;
};

// export type UserResponse = Omit<User, "password"> & {
//   followedBy: {
//     id: number;
//     username: string;
//   }[];
//   following: {
//     id: number;
//     username: string;
//   }[];
// };

export type UserResponse = {
  id: number;
  username: string;
  grade: number | null;
  profilePicture: string | null;
  private: boolean;
  followedBy: {
    id: number;
    username: string;
  }[];
  following: {
    id: number;
    username: string;
  }[];
};

// export type FollowResponse = Omit<User, "password">;

export type FollowResponse = {
  id: number;
  username: string;
  grade: number | null;
  profilePicture: string | null;
  private: boolean;
};

// for climb page
export type AttemptWithVideoResponse = {
  id: number;
  send: boolean;
  climbId: number;
  fallReason: string | null;
  notes: string | null;
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

export type AttemptResponse = {
  id: number;
  climbId: number;
  send: boolean;
  fallReason: string | null;
  notes: string | null;
  uploadedAt: string;
};

export type VideoResponse = {
  attemptId: number;
  clip: string;
  post: PostResponse | null;
};

// export type UserResponse = Omit<User, "password">;

// const BetaWithUser = {
//   include: {
//     author: {
//       select: { id: true, username: true },
//     },
//   },
// } satisfies Prisma.BetaDefaultArgs;

// export type BetaResponse = Prisma.BetaGetPayload<typeof BetaWithUser>;

export type BetaResponse = {
  author: {
    id: number;
    username: string;
  };
} & {
  id: number;
  content: string;
  uploadedAt: Date;
  starred: boolean;
  userId: number;
  postId: number;
};

export type PostResponse = {
  id: number;
  attemptId: number;
  description: string | null;
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

export type FeedResponse = {
  data: PostResponse[];
  nextCursor: string | null;
};

//zod schemas

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
  // uploadedAt: z.nullish(z.date()),
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
