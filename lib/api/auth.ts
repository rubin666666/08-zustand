import { notehubApi } from "@/lib/api/client";

interface AuthResponse {
  token: string;
}

let cachedToken: string | null = null;
let tokenRequest: Promise<string> | null = null;

const envToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const defaultEmail =
  process.env.NEXT_PUBLIC_NOTEHUB_EMAIL ?? "student@example.com";

export async function getAuthToken(): Promise<string> {
  if (envToken) {
    return envToken;
  }

  if (cachedToken) {
    return cachedToken;
  }

  if (!tokenRequest) {
    tokenRequest = notehubApi
      .post<AuthResponse>("/auth", { email: defaultEmail })
      .then(({ data }) => {
        cachedToken = data.token;

        return data.token;
      })
      .finally(() => {
        tokenRequest = null;
      });
  }

  return tokenRequest;
}
