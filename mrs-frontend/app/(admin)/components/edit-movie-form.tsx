"use client";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Movie {
  movie_id: string;
  title: string;
  description: string;
  genre: string;
  poster_image: string;
}

interface EditMovieFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: Movie
}

export default function EditMovieForm({
  open,
  onOpenChange,
  movie
}: EditMovieFormProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit movie details for {movie.movie_id}</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
