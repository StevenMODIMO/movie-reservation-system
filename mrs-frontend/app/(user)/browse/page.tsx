import { api } from "@/lib/api";
import Image from "next/image";

interface MovieTypes {
  movie_id: string;
  description: string;
  genre: string;
  poster_image: string;
  title: string;
}

export default async function Browse() {
  const data: MovieTypes[] = await api("/api/mrs/movies/get-all-movies");
  return (
    <div className="grid grid-cols-3">
      {data &&
        data.map(({ movie_id, description, title, genre, poster_image }) => {
          return (
            <div key={movie_id}>
              <div className="relative w-80 h-80">
                <Image
                  src={poster_image}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h1 className="text-xl">{title}</h1>
              <h2 className="text-md">{genre}</h2>
              <p className="text-sm">{description}</p>
            </div>
          );
        })}
    </div>
  );
}
