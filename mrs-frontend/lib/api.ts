import "server-only";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function api(path: string) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const json = await res.json();

    if (res.ok) {
      return json
    }

    if (access_token && res.status === 401) {
      const res = await fetch(`${API_URL}/api/users/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json()

      if(res.ok) {
        console.log("REFRESH GOOD",json)
      }

      if(!res.ok) {
        console.log("REFRESH BAD",json)
      }
    }
  } catch (error) {
    console.log(error);
  }
}
