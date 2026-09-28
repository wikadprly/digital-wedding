const KEY_PREFIX = "digital_wedding_wish_";

const listeners = new Set();

const snapshotCache = new Map();

let storageBound = false;

const key = (uid) => `${KEY_PREFIX}${uid}`;

const emptySubscribe = () => () => {};

function emit() {
  snapshotCache.clear();
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch (error) {
      console.error("Error notifying wish token listeners:", error);
    }
  }
}

function read(uid) {
  if (!uid) return null;
  if (typeof window === "undefined") return null;
  if (snapshotCache.has(uid)) return snapshotCache.get(uid);

  let value = null;
  try {
    const raw = localStorage.getItem(key(uid));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") value = parsed;
    }
  } catch (error) {
    console.error("Error retrieving wish token:", error);
  }

  snapshotCache.set(uid, value);
  return value;
}

function bindStorageListener() {
  if (storageBound) return;
  storageBound = true;
  window.addEventListener("storage", (event) => {
    if (event.key && event.key.startsWith(KEY_PREFIX)) {
      emit();
    }
  });
}

export function storeWishToken(uid, wishId, token) {
  if (!uid || !wishId || !token) return;
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key(uid), JSON.stringify({ wishId, token }));
  } catch (error) {
    console.error("Error storing wish token:", error);
    return;
  }
  emit();
}

export function getWishToken(uid) {
  return read(uid);
}

export function clearWishToken(uid) {
  if (!uid) return;
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key(uid));
  } catch (error) {
    console.error("Error clearing wish token:", error);
    return;
  }
  emit();
}

export function getWishTokenServerSnapshot() {
  return null;
}

export function subscribeWishToken(listener) {
  if (typeof window === "undefined") return emptySubscribe;
  bindStorageListener();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
