import { createContext } from "react";
import type { User } from "../../types/auth_types";

type AuthContextType = {
  user: Partial<User> | null;
  signin: (username: string, password: string) => Promise<User>;
  signout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
