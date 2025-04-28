import { isServer } from "@tanstack/react-query";

export const BEARER_TOKEN_TAG = "accessToken";

const getApiBase = () => {
  const origin = isServer ? "http://nginx" : window.location.origin;

  return origin + "/api";
};

let token = "";
let tokenTimer: NodeJS.Timeout;
async function getBearerToken() {
  if (token) return token;
  try {
    const response = await fetch(getApiBase() + "/auth/refresh");
    if (!response.ok) {
      return "";
    }
    const res = await response.json();
    token = res.accessToken ? `Bearer ${res.accessToken}` : "";
    if (token) {
      clearTimeout(tokenTimer);
      tokenTimer = setTimeout(() => {
        token = "";
      }, 55000);
    }
    return token;
  } catch {
    return "";
  }
}

export async function stdFetch<T = unknown>(
  uri: `/${string}`,
  options?: Omit<RequestInit, "body"> & {
    body?: unknown;
    skipAuthorization?: true;
  },
) {
  const headers: Required<RequestInit>["headers"] & { Authorization?: string } =
    {
      "Content-Type": "application/json",
      ...options?.headers,
    };

  if (!options?.skipAuthorization) {
    headers["Authorization"] = await getBearerToken();
  }
  const response = await fetch(getApiBase() + uri, {
    ...options,
    body: options?.body ? JSON.stringify(options?.body) : undefined,
    headers,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}
