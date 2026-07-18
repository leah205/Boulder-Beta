import { useContext } from "react";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";
export default function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context || !context.currentUser) {
    throw new Error("useAuth must be used within auth provider");
  }
  return context.currentUser;
}
