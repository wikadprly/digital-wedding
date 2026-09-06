import { useContext } from "react";
import { InvitationContext } from "../invitation-context-definition";

export function useInvitation() {
  const context = useContext(InvitationContext);

  if (context === null) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }

  return context;
}
