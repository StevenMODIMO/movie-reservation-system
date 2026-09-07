import { redirect } from "next/navigation"
import { api } from "@/lib/api";

export default async function Redirect() {
    const user = await api("/api/users/me")
    if (user && user.role === "user") {
        redirect("/browse")
    } else {
        redirect("/manage")
    }
//   return (
//     <div className="flex flex-col items-center gap-3">
//       <div className="rounded-full w-24 h-24 animate-spin border-t-3 dark:border-white"></div>
//       <p className="text-xs">
//         Redirecting to the designated destination{" "}
//         <span className="animate-ping">....</span>
//       </p>
//     </div>
//   );
}
