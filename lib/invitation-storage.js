const STORAGE_KEYS = {
  WEDDING_UID: "digital_wedding_uid",
  GUEST_NAME: "digital_wedding_guest_name",
  GUEST_TOKEN: "digital_wedding_guest_token",
  TIMESTAMP: "digital_wedding_timestamp",
};

const STORAGE_EXPIRY = 30 * 24 * 60 * 60 * 1000;

function isExpired() {
  if (typeof window === "undefined") return true;
  const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
  if (!timestamp) return true;

  const age = Date.now() - parseInt(timestamp, 10);
  return age > STORAGE_EXPIRY;
}

export function clearInvitationData() {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function storeWeddingUid(uid) {
  if (!uid) return;
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.WEDDING_UID, uid);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error("Error storing wedding UID:", error);
  }
}

export function getWeddingUid() {
  if (isExpired()) {
    clearInvitationData();
    return null;
  }

  try {
    return localStorage.getItem(STORAGE_KEYS.WEDDING_UID);
  } catch (error) {
    console.error("Error retrieving wedding UID:", error);
    return null;
  }
}

export function storeGuestName(name) {
  if (!name) return;
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.GUEST_NAME, name);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error("Error storing guest name:", error);
  }
}

export function getGuestName() {
  if (isExpired()) {
    clearInvitationData();
    return null;
  }

  try {
    return localStorage.getItem(STORAGE_KEYS.GUEST_NAME);
  } catch (error) {
    console.error("Error retrieving guest name:", error);
    return null;
  }
}

export function hasInvitationData() {
  return !isExpired() && !!getWeddingUid();
}

export function getInvitationData() {
  if (isExpired()) {
    clearInvitationData();
    return { uid: null, guestName: null };
  }

  return {
    uid: getWeddingUid(),
    guestName: getGuestName(),
  };
}

export function storeInvitationData({ uid, guestName }) {
  storeWeddingUid(uid);
  if (guestName) {
    storeGuestName(guestName);
  }
}
