"use client";

import { useState, useActionState, useEffect } from "react";
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { addMovie } from "@/app/actions";

interface AddMovieState {
  data: unknown;
  error: string | null;
  status: number | null;
}

const initialAddMovieState: AddMovieState = {
  data: null,
  error: null,
  status: null,
};

interface MovieFormData {
  title: string;
  description: string;
  genre: string;
  poster_image: File | null;
}

export default function AddMovieForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    description: "",
    genre: "",
    poster_image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addMovie,
    initialAddMovieState,
  );

  useEffect(() => {
    if (state?.error === null && state?.data) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new movie</SheetTitle>
            <SheetDescription>Lorem ipsum dolor sit amet.</SheetDescription>
          </SheetHeader>

          <Card>
            <CardHeader>
              <CardTitle>Add new movie</CardTitle>

              <CardDescription>
                Insert new movie into the movie database then assign showtimes
                later.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form action={formAction} className="flex flex-col gap-4">
                <Label className="flex flex-col items-start gap-2">
                  {preview && (
                    <div>
                      <img
                        src={preview}
                        alt="image-preview"
                        className="w-24 h-24 mx-auto p-2 rounded-full border-2 object-cover object-center"
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          setPreview(null);

                          setFormData((prev) => ({
                            ...prev,
                            poster_image: null,
                          }));
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}

                  <Input
                    type="file"
                    name="poster_image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          poster_image: file,
                        }));

                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Label>

                <Label className="flex flex-col items-start gap-2">
                  <span>Movie Title</span>

                  <Input
                    type="text"
                    name="title"
                    placeholder="Spiderman: Brand new day (2026)"
                  />
                </Label>

                <Label className="flex flex-col items-start gap-2">
                  <span>Description</span>

                  <Input
                    type="text"
                    name="description"
                    placeholder="Lorem ipsum dolor sit amet."
                  />
                </Label>

                <Label className="flex flex-col items-start gap-2">
                  <span>Genre</span>

                  <Input type="text" name="genre" placeholder="Action/Sci-Fi" />
                </Label>

                {state.error && (
                  <p className="text-sm text-red-500">{state.error}</p>
                )}

                {state.status === 201 && (
                  <p className="text-sm text-green-500">
                    Movie added successfully.
                  </p>
                )}

                <Button type="submit" disabled={isPending}>
                  {isPending ? "Adding Movie..." : "Add Movie"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
}
