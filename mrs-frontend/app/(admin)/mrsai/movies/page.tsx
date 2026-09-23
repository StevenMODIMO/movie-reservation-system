import type { Metadata } from "next";
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Movies",
};

interface Movie {
  movie_id: string;
  title: string;
  description: string;
  genre: string;
  poster_image: string;
}

export default async function Movies() {
  await new Promise((resolve) => setTimeout(resolve, 30000));
  const movies = await api<Movie[]>("/api/mrs/movies/get-all-movies");
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-end">
        <Button asChild size="xs">
          <Link href="/mrsai/movies/new">New movie</Link>
        </Button>
      </header>
      <div className="pt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-[200_px,200_px] xl:grid-cols-4">
        {movies.data?.map((movie) => (
          <Card key={movie.movie_id} size="sm" className="p-0">
            <div className="relative w-full h-36">
              <Image
                src={movie.poster_image}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            <CardHeader className="px-2 py-3">
              <CardTitle className="line-clamp-1 dark:text-primary">
                {movie.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-2 py-3">
              <p className="text-sm text-muted-foreground">{movie.genre}</p>
              <p className="mt-2 line-clamp-2 text-sm">{movie.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
