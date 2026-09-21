import { api } from "@/lib/api";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Movies {
  movie_id: string;
  description: string;
  genre: string;
  poster_image: string;
  title: string;
}

export default async function Browse() {
  const movies = await api<Movies[]>("/api/mrs/movies/get-all-movies");
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-[200_px,200_px] xl:grid-cols-4">
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
            <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
          </CardHeader>

          <CardContent className="px-2 py-3">
            <p className="text-sm text-muted-foreground">{movie.genre}</p>
            <p className="mt-2 line-clamp-2 text-sm">{movie.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
