"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  success: boolean;
  error: string | null;
};

const API = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function login(prevState: LoginState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required.",
      };
    }
    const payload = new FormData();
    payload.append("username", email!);
    payload.append("password", password!);
    const res = await fetch(`${API}/api/users/login`, {
      method: "POST",
      body: payload,
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.detail ?? "Login failed",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("access_token", json.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refresh_token", json.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong.",
    };
  }

  redirect("/browse");
}


export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/login");
}