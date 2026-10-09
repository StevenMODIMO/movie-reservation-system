import type { Metadata } from "next";
import { api } from "@/lib/api";
import HallLayout, { type Hall } from "../../components/cinema-layout";

export const metadata: Metadata = {
  title: "Cinema",
};

export default async function Cinema() {
  const response = await api<Hall[]>("/api/mrs/cinema/halls", {
    cache: "no-store",
  });

  if (response.error || !response.data) {
    throw new Error(response.error ?? "Failed to fetch cinema halls.");
  }

  const halls: Hall[] = await response.data;
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cinema Halls</h1>
        <p className="text-muted-foreground">
          Overview of halls and their seat layouts.
        </p>
      </div>

      <HallLayout halls={halls} />
    </main>
  );
}
