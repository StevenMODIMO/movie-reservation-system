import { cookies } from "next/headers" 

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function api() {
    const cookieStore = await cookies()
    console.log(cookieStore.get("access_token"))
}