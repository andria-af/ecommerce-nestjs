const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

function getToken() {
  return localStorage.getItem("admin_token");
}

function handleUnauthorized() {
  localStorage.removeItem("admin_token");
  window.location.href = "/admin/login";
}

export async function adminFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getToken();
  if (!token) {
    handleUnauthorized();
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
