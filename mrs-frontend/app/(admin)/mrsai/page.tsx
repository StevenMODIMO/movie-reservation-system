import { api } from "@/lib/api";
import AddMovieForm from "../components/add-movie-form";

export default async function Manage() {
  const user = await api<any>("/api/users/me");
  return (
    <div>
      <header>
        <h1>Overview, Welcome {user.data?.username}</h1>
      </header>
      <AddMovieForm />
    </div>
  );
}
