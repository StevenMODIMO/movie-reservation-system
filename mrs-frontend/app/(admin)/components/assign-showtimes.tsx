"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";



interface AssignShowtimeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieId: string
}

export default function AssignShowtimes({
  open,
  onOpenChange,
  movieId
}: AssignShowtimeProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Assign Showtime for {movieId}</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
