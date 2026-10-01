"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { deleteMovie } from "@/app/actions";
import { useRouter } from "next/navigation";

interface DeleteMovieDialogProps {
  movieId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteMovieDialog({
  movieId,
  open,
  onOpenChange,
}: DeleteMovieDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    const response = await deleteMovie(movieId);

    if (response.error) {
      setError(response.error);
      setIsDeleting(false);
      return;
    }

    // Close the dialog
    onOpenChange(false);

    // Re-fetch/re-render the server component containing the movies
    router.refresh();

    setIsDeleting(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        // Don't allow the dialog to be closed while deleting
        if (!isDeleting) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete movie?</DialogTitle>

          <DialogDescription>
            You are about to permanently delete this movie and its associated
            data.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle />

          <AlertTitle>This action cannot be undone</AlertTitle>

          <AlertDescription>
            Deleting this movie will disable all associated showtimes and
            prevent new reservations from being made for it. Related movie data
            may also become unavailable.
          </AlertDescription>
        </Alert>

        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Movie ID:</span>{" "}
            {movieId}
          </p>
        </div>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle />

              <AlertTitle>Unable to delete movie</AlertTitle>

              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              if (error) setError(null)
            }}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 />
                Delete Movie
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
