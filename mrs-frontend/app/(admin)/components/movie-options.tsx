"use client";
import { Ellipsis, Pencil, TrashIcon, Tickets } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import EditMovieForm from "./edit-movie-form";
import DeleteMovieDialog from "./delete-movie-dialog";
import AssignShowtimes from "./assign-showtimes";
import MovieOverview from "./movie-overview";
import { useState } from "react";

interface Movie {
  movie_id: string;
  title: string;
  description: string;
  genre: string;
  poster_image: string;
}

interface MovieOptionsProps {
  movie: Movie;
}

export default function MovieOptions({ movie }: MovieOptionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showtimeOpen, setShowtimeOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Manage</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => setOverviewOpen(true)}>
              <Pencil />
              Overview
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setEditOpen(true)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowtimeOpen(true)}>
              <Tickets /> Assign showtime
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDialogOpen(true)}
            >
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditMovieForm movie={movie} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteMovieDialog
        movieId={movie.movie_id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <AssignShowtimes
        movieId={movie.movie_id}
        open={showtimeOpen}
        onOpenChange={setShowtimeOpen}
      />
      <MovieOverview
        movie={movie}
        open={overviewOpen}
        onOpenChange={setOverviewOpen}
      />
    </>
  );
}
