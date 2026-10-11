import { api } from "@/lib/api";
import AddMovieForm from "../components/add-movie-form";
import OverviewDashboard from "../components/overview";

export default async function Manage() {
  const user = await api<any>("/api/users/me");

  return (
    <div className="space-y-8">
      <OverviewDashboard username={user.data?.username} />

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="mb-2 text-lg font-semibold text-white">Add a movie</h2>
        <p className="mb-4 text-sm text-slate-400">
          Add a new movie to your cinema catalog.
        </p>

        <AddMovieForm />
      </section>
    </div>
  );
}
