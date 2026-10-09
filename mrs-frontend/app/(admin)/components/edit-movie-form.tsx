"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { editMovie } from "@/app/actions";

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
  movie: Movie;
}

interface MovieState {
  data: unknown;
  error: string | null;
  status: number | null;
}

const initialEditMovieState: MovieState = {
  data: null,
  error: null,
  status: null,
};

export default function EditMovieForm({
  open,
  onOpenChange,
  movie,
}: EditMovieFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);

  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    movie.poster_image || null,
  );

  const [showError, setShowError] = useState(true);

  const [state, formAction, isPending] = useActionState(
    editMovie,
    initialEditMovieState,
  );

  // Populate the form when a different movie is selected.
  useEffect(() => {
    setTitle(movie.title);
    setDescription(movie.description);
    setGenre(movie.genre);
    setPosterImage(null);
    setPreview(movie.poster_image || null);
    setShowError(true);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }, [movie]);

  // Release temporary image preview URLs.
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle successful updates.
  useEffect(() => {
    if (state.status === 200 && !state.error) {
      onOpenChange(false);
      router.refresh();
    }
  }, [state, onOpenChange, router]);

  // Show new server errors when the action returns.
  useEffect(() => {
    if (state.error) {
      setShowError(true);
    }
  }, [state]);

  const clearError = () => setShowError(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit movie details</SheetTitle>
          <SheetDescription>
            Update the details for {movie.title}.
          </SheetDescription>
        </SheetHeader>

        <Card className="mt-4 border-0 shadow-none">
          <CardHeader>
            <CardTitle>Edit movie</CardTitle>
            <CardDescription>
              Modify the saved movie information and poster.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action={formAction}
              className="flex flex-col gap-4"
              onFocus={clearError}
            >
              <Input type="hidden" name="movie_id" value={movie.movie_id} />

              <Label className="flex flex-col items-start gap-2">
                <span>Movie Poster</span>

                {preview && (
                  <img
                    src={preview}
                    alt={`${title} poster`}
                    className="mx-auto h-40 w-32 rounded-md border object-cover object-center"
                  />
                )}

                <Input
                  ref={fileRef}
                  type="file"
                  name="poster_image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPosterImage(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                {posterImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPosterImage(null);

                      if (fileRef.current) {
                        fileRef.current.value = "";
                      }

                      setPreview(movie.poster_image || null);
                    }}
                  >
                    Cancel image replacement
                  </Button>
                )}
              </Label>

              <Label className="flex flex-col items-start gap-2">
                <span>Movie Title</span>
                <Input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Spiderman: Brand new day (2026)"
                  required
                />
              </Label>

              <Label className="flex flex-col items-start gap-2">
                <span>Description</span>
                <Textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Lorem ipsum dolor sit amet."
                  required
                />
              </Label>

              <Label className="flex flex-col items-start gap-2">
                <span>Genre</span>
                <Input
                  type="text"
                  name="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Action/Sci-Fi"
                  required
                />
              </Label>

              {state.error && showError && (
                <p role="alert" className="text-sm text-red-500">
                  {state.error}
                </p>
              )}

              {state.status === 200 && !state.error && (
                <p className="text-sm text-green-500">
                  Movie updated successfully.
                </p>
              )}

              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
