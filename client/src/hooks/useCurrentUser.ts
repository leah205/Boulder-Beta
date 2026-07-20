import { useContext } from "react";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";
export default function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context || !context.currentUser) {
    throw new Error("useContext must be used within context provider");
  }
  return context.currentUser;
}
