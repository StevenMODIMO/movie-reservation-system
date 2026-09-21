import "server-only";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

type ApiResponse<T> =
  | {
      data: T;
      error: null;
      status: number;
    }
  | {
      data: null;
      error: string;
      status: number;
    };

export async function api<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  } = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  // No token = don't make an authenticated request
  if (!accessToken) {
    return {
      data: null,
      error: "Unauthorized",
      status: 401,
    };
  }

  const method = options.method ?? "GET";

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache,
      next: options.next,
    });

    // Handle responses that don't contain JSON
    const contentType = res.headers.get("content-type");
    const response = contentType?.includes("application/json")
      ? await res.json()
      : null;

    if (!res.ok) {
      const error =
        response?.detail ||
        response?.message ||
        response?.error ||
        `Request failed with status ${res.status}`;

      return {
        data: null,
        error,
        status: res.status,
      };
    }

    return {
      data: response as T,
      error: null,
      status: res.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Request failed",
      status: 500,
    };
  }
}
