import "server-only";
import { cookies } from "next/headers";
import { logout } from "@/app/actions";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
      return json;
    }

    if (access_token && res.status === 401) {
      console.log(json)
      return json
      // const res = await fetch(`${APP_URL}/api/auth/logout`, {
      //   method: "POST",
      //   headers: {
      //     Cookie: cookieStore.toString(),
      //   },
      // });

      // const json = await res.json();

      // if (res.ok) {
      //   console.log(json);
      // }

      // if (!res.ok) {
      //   console.log(json);
      // }
    }
  } catch (error) {
    console.log(error);
  }
}
