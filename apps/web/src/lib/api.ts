export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type ApiGetOptions = {
  revalidate?: number;
};

const isServer = typeof window === "undefined";

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export async function apiGet<T>(
  path: string,
  opts: ApiGetOptions = {},
): Promise<T> {
  const url = `${API_URL}${path}`;

  let res: Response;

  try {
    const init: RequestInit & { next?: { revalidate: number } } = {};

    if (isServer && typeof opts.revalidate === "number") {
      init.next = { revalidate: opts.revalidate };
    } else {
      init.cache = "no-store";
    }

    res = await fetch(url, init);
  } catch (err) {
    throw new Error(`GET ${url} failed (network): ${String(err)}`);
  }

  if (!res.ok) {
    const text = await safeText(res);
    throw new Error(`GET ${url} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  init: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  let res: Response;

  try {
    res = await fetch(url, {
      method: "POST",
      ...init,
      cache: "no-store",
      headers: {
        ...(init.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData
        ? (body as FormData)
        : body != null
          ? JSON.stringify(body)
          : undefined,
    });
  } catch (err) {
    throw new Error(`POST ${url} failed (network): ${String(err)}`);
  }

  if (!res.ok) {
    const text = await safeText(res);
    throw new Error(`POST ${url} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}
