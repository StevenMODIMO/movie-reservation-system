import { redirect } from "next/navigation"
import { api } from "@/lib/api";

export default async function Redirect() {
    const {data, error } = await api<any>("/api/users/me")
    if (data && data.user?.role === "user") {
        redirect("/browse")
    } else {
        redirect("/mrsai")
    }
}
