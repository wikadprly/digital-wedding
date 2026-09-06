import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInvitation } from "@/services/api";
import {
  getWeddingUid,
  storeWeddingUid,
  storeGuestName,
} from "@/lib/invitation-storage";
import { safeBase64 } from "@/lib/base64";
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

    const urlParams = new URLSearchParams(window.location.search);
    let extractedName = null;

    const toParam = urlParams.get("to");
    const guestParam = urlParams.get("guest");

    if (toParam) {
      extractedName = decodeURIComponent(toParam).trim();
    } else if (guestParam) {
      try {
        extractedName = safeBase64.decode(guestParam);
      } catch (error) {
        console.error("Error decoding guest name:", error);
      }
    }

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
