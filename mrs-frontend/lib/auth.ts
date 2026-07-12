import { cookies } from "next/headers";

export async function getAuthState() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token");

  return {
    isAuthenticated: !!accessToken,
  };
}
