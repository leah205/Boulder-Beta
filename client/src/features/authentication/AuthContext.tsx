import { createContext } from "react";
import type { UserCredentials } from "@/types/auth_types";

type AuthContextType = {
  user: UserCredentials | null;
  signin: (username: string, password: string) => Promise<UserCredentials>;
  signout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
