"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MovieFormData {
  title: string;
  description: string;
  genre: string;
  poster_image: File | null;
}

export default function AddMovieForm() {
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    description: "",
    genre: "",
    poster_image: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [poster_image, setPosterImage] = useState<File | null>(null);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new movie</SheetTitle>
            <SheetDescription>Lorem ipsum dolor sit amet.</SheetDescription>
          </SheetHeader>
          <Card className="">
            <CardHeader>
              <CardTitle>Add new movie</CardTitle>
              <CardDescription>
                Insert new movie into the movie database then assign showtimes
                later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Label className="flex flex-col items-start gap-2">
                  <span>Movie Title</span>
                  <Input
                    type="file"
                    placeholder="Spiderman: Brand new day (2026)"
                  />
                </Label>
                <Label className="flex flex-col items-start gap-2">
                  <span>Movie Title</span>
                  <Input
                    type="text"
                    placeholder="Spiderman: Brand new day (2026)"
                  />
                </Label>
                <Label className="flex flex-col items-start gap-2">
                  <span>Description</span>
                  <Input
                    type="text"
                    placeholder="Lorem ipsum dolor sit amet. The brown fox jumped over the lazy dog."
                  />
                </Label>
                <Label className="flex flex-col items-start gap-2">
                  <span>Genre</span>
                  <Input type="text" placeholder="Action/Sci-Fi" />
                </Label>
                <Button>Add Movie</Button>
              </form>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
      {/* 
     <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        captionLayout="dropdown"
      /> */}
    </div>
  );
}
