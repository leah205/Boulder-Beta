import type { User } from "@shared/types";
export type UserCredentials = Pick<User, "id" | "username">;
