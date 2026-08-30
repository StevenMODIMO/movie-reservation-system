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
  const data: MovieTypes[] = await api("/api/mrs/movies");

  return (
    <div>
      {data.map(({ movie_id, description, title, genre, poster_image }) => {
        return (
          <div key={movie_id}>
            <div className="relative w-80 h-80">
              <Image src={poster_image} alt={title} fill priority />
            </div>
            <h1>{title}</h1>
            <h2>{genre}</h2>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}
