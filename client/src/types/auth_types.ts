import type { LoginRequest, AuthResponse } from "@shared/types";

export type SignInFunc = (login: LoginRequest) => Promise<AuthResponse>;
