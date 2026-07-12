import { createContext } from "react";
import type { AuthResponse } from "@shared/types";
import type { SignInFunc } from "@/types/auth_types";
type AuthContextType = {
  user: AuthResponse | null;
  signin: SignInFunc;
  signout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
