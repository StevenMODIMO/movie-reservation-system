"use client";

import React from "react";

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

export default function AddMovieForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log("selected date", date);
  return (
    <div>
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
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        captionLayout="dropdown"
      /> */}
    </div>
  );
}
