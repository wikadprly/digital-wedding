import { useMemo, useEffect } from "react";
import {
  getWeddingUid,
  storeWeddingUid,
  storeGuestName,
  resolveGuestName,
} from "@/lib/invitation-storage";
import { InvitationContext } from "./invitation-context-definition";
import staticConfig from "@/config/config";

export function InvitationProvider({ uid, children }) {
  const invitationUid = useMemo(() => {
    let resolvedUid = null;

    if (uid) {
      resolvedUid = uid;
    }

    const storedUid = getWeddingUid();

    if (resolvedUid && resolvedUid !== storedUid) {
      storeWeddingUid(resolvedUid);
      return resolvedUid;
    }

    if (resolvedUid) {
      storeWeddingUid(resolvedUid);
      return resolvedUid;
    }

    if (storedUid) {
      return storedUid;
    }

    return null;
  }, [uid]);

  // Store guest name in localStorage (extracted from URL by the page)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const extractedName = resolveGuestName();
    if (extractedName) {
      storeGuestName(extractedName);
    }
  }, []);

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