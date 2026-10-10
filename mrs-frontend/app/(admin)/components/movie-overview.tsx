"use client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  movie_id: string;
  title: string;
  description: string;
  genre: string;
  poster_image: string;
}

interface MovieOverviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: Movie;
}

export default function MovieOverview({
  open,
  onOpenChange,
  movie,
}: MovieOverviewProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
        </SheetHeader>
        <Card key={movie.movie_id} className="p-0">
          <div className="relative w-full h-36">
            <Image
              src={movie.poster_image}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <CardHeader className="px-2 py-3">
            <CardTitle className="dark:text-primary">
              {movie.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-2 py-3">
            <p className="text-sm text-muted-foreground">{movie.genre}</p>
            <p className="mt-2 text-sm">{movie.description}</p>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
