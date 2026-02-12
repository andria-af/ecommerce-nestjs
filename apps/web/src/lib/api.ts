export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type ApiInit = Omit<RequestInit, "body"> & { body?: any };

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err) {
    throw new Error(`GET ${url} failed (network): ${String(err)}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${url} failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function apiPost<T>(
  path: string,
  body?: any,
  init: RequestInit = {},
) {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? body : body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
