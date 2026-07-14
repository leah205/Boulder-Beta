// import prisma from "../server/src/db/prisma_client";
import * as z from "zod";

import type {
  Climb,
  User,
  Attempt,
  Post,
} from "../server/generated/prisma/client";

// response types

export type AuthResponse = Pick<User, "id" | "username"> | undefined;
export type LoginResponse = Pick<User, "id" | "username"> & { token: string };
export type ClimbResponse = Omit<Climb, "public_id"> & {
  picture?: string | null;
};
export type AttemptWithVideoResponse = Attempt & {
  video: {
    clip: string | null;
    published: boolean;
  } | null;
};

export type AttemptResponse = Attempt;
export type PostResponse = Post & { clip?: string | null };

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
});

export const CreateAttemptSchema = z.object({
  send: z.boolean(),
  clip: z.file().optional().nullable(),
  published: z.boolean().optional(),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
export type SignupRequest = z.infer<typeof SignupSchema>;
export type CreateClimbRequest = z.infer<typeof CreateClimbSchema>;
export type CreateAttemptRequest = z.infer<typeof CreateAttemptSchema>;

export type ValidationErrorResponse = { errors: string[] };
export type ErrorResponse = string;
