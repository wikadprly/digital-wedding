import { safeBase64 } from "./base64";

export function resolveGuestName() {
  if (typeof window === "undefined") return "";

  const params = new URLSearchParams(window.location.search);
  const toParam = params.get("to");
  const guestParam = params.get("guest");

  if (toParam) {
    const name = decodeURIComponent(toParam).trim();
    if (name) return name;
  } else if (guestParam) {
    try {
      const name = safeBase64.decode(guestParam).trim();
      if (name) return name;
    } catch {
      /* ignore invalid guest param */
    }
  }

  return "";
}