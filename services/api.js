const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : "";

function endpoint(path) {
  return `${API_URL}${path}`;
}

export async function fetchWishes(uid, options = {}) {
  const { limit = 50, offset = 0 } = options;
  const url = new URL(endpoint(`/api/${uid}/wishes`), window.location.origin);
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
  const response = await fetch(endpoint(`/api/${uid}/wishes`), {
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

export async function deleteWish(uid, wishId, token) {
  const response = await fetch(endpoint(`/api/${uid}/wishes/${wishId}`), {
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