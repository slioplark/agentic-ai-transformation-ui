const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, "method" | "body">;

async function request<T>(
  path: string,
  method: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  const contentType = response.headers.get("content-type") ?? "";
  let data: unknown;
  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => undefined);
    } else {
      data = await response.text().catch(() => undefined);
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `API request failed (${response.status} ${response.statusText})`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, "GET", undefined, options),
  post: <T, TBody = unknown>(
    path: string,
    body: TBody,
    options?: RequestOptions,
  ) => request<T>(path, "POST", body, options),
  put: <T, TBody = unknown>(
    path: string,
    body: TBody,
    options?: RequestOptions,
  ) => request<T>(path, "PUT", body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, "DELETE", undefined, options),
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "發生未預期的錯誤，請稍後再試。";
}
