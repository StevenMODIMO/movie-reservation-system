import { redirect } from "next/navigation"
import { api } from "@/lib/api";

export default async function Redirect() {
    const user = await api("/api/users/me")
    if (user && user.role === "user") {
        redirect("/browse")
    } else {
        redirect("/mrsai")
    }
}
