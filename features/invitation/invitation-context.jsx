import { useMemo } from "react";
import { InvitationContext } from "./invitation-context-definition";
import staticConfig from "@/config/config";

export function InvitationProvider({ uid, children }) {
  const invitationUid = useMemo(() => uid || staticConfig.data.uid, [uid]);

  return (
    <InvitationContext.Provider
      value={{
        uid: invitationUid,
        config: staticConfig.data,
        isLoading: false,
        error: null,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}