const KEY = (uid) => `digital_wedding_wish_${uid}`;

export function storeWishToken(uid, wishId, token) {
  if (!uid || !wishId || !token) return;
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY(uid), JSON.stringify({ wishId, token }));
  } catch (error) {
    console.error("Error storing wish token:", error);
  }
}

export function getWishToken(uid) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY(uid));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    console.error("Error retrieving wish token:", error);
    return null;
  }
}

export function clearWishToken(uid) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY(uid));
  } catch (error) {
    console.error("Error clearing wish token:", error);
  }
}