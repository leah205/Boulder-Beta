import { useContext } from "react";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";
export default function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useAuth must be used within auth provider");
  }
  return context;
}
