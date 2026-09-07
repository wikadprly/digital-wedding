import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInvitation } from "@/services/api";
import {
  getWeddingUid,
  storeWeddingUid,
  storeGuestName,
  resolveGuestName,
} from "@/lib/invitation-storage";
import { InvitationContext } from "./invitation-context-definition";

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

  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invitation", invitationUid],
    queryFn: async () => {
      const response = await fetchInvitation(invitationUid);
      if (response.success) {
        return response.data;
      }
      throw new Error("Failed to load invitation");
    },
    enabled: !!invitationUid,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <InvitationContext.Provider
      value={{ uid: invitationUid, config, isLoading, error: error?.message }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
