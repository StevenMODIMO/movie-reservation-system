import { api } from "@/lib/api";

export default async function Manage() {
  const user = await api<any>("/api/users/me");
  return <div>Overview, Welcome {user.data?.username}</div>;
}
