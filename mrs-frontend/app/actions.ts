"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { revalidateTag, revalidatePath } from "next/cache";

type LoginState = {
  success: boolean;
  error: string | null;
};

type MovieState = {
  data: unknown;
  error: string | null;
  status: number | null;
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
        error: json.detail,
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("access_token", json.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set("refresh_token", json.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set("role", json.role, {
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

  redirect("/redirect");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("role");

  redirect("/login");
}

// MOVIE ACTIONS
export async function addMovie(prevState: MovieState, formData: FormData) {
  const response = await api("/api/mrs/movies/add-movie", {
    method: "POST",
    body: formData,
  });
  console.log("ADD MOVIE RESPONSE: ", response);
  if (response.error) {
    return response;
  }

  revalidateTag("movies", "max");
  revalidatePath("/mrsai/movies");

  return response;
}

export async function editMovie(prevState: MovieState, formData: FormData) {
  const movieId = formData.get("movie_id");

  const poster = formData.get("poster_image");

  // Don't upload an empty file when no replacement was selected.
  if (poster instanceof File && poster.size === 0) {
    formData.delete("poster_image");
  }
  const response = await api(`/api/mrs/movies/update-movie/${movieId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.error) return response;

  revalidateTag("movies", "max");
  revalidatePath("/mrsai/movies");

  return response;
}

export async function deleteMovie(movieId: string) {
  return await api(`/api/mrs/movies/delete-movie/${movieId}`, {
    method: "DELETE",
  });
}
