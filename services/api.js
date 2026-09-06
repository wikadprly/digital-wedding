const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchWishes(uid, options = {}) {
  const { limit = 50, offset = 0 } = options;
  const url = new URL(`${API_URL}/api/${uid}/wishes`, window.location.origin);
  url.searchParams.set("limit", limit);
  url.searchParams.set("offset", offset);

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch wishes");
  }
  return response.json();
}

export async function createWish(uid, wishData) {
  const response = await fetch(`${API_URL}/api/${uid}/wishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "Failed to create wish");
    error.code = data.code;
    throw error;
  }
  return data;
}

export async function checkWishSubmitted(uid, name) {
  const response = await fetch(
    `${API_URL}/api/${uid}/wishes/check/${encodeURIComponent(name)}`,
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to check wish status");
  }
  return response.json();
}

export async function deleteWish(uid, wishId, token) {
  const response = await fetch(`${API_URL}/api/${uid}/wishes/${wishId}`, {
    method: "DELETE",
    headers: {
      "x-wish-token": token || "",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete wish");
  }
  return response.json();
}

export async function fetchAttendanceStats(uid) {
  const response = await fetch(`${API_URL}/api/${uid}/stats`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch stats");
  }
  return response.json();
}

export async function fetchInvitation(uid) {
  const response = await fetch(`${API_URL}/api/invitation/${uid}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch invitation");
  }
  return response.json();
}
