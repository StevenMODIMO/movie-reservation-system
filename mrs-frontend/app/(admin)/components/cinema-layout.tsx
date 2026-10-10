"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type HallSeat = {
  seat_id: string;
  seat_label: string;
};

export type Hall = {
  hall_id: string;
  hall_name: string;
  hall_abbrv: string;
  seats: HallSeat[];
};

type HallLayoutProps = {
  halls: Hall[];
};

export default function HallLayout({ halls }: HallLayoutProps) {
  if (halls.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No cinema halls available.
      </p>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {halls.map((hall) => (
        <Card key={hall.hall_id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>{hall.hall_name}</CardTitle>
                <CardDescription>
                  Hall abbreviation: {hall.hall_abbrv}
                </CardDescription>
              </div>

              <Badge variant="secondary">
                {hall.seats.length} seats
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6 flex justify-center">
              <div className="w-3/4 rounded-t-[50%] border-t-4 border-primary py-2 text-center text-xs text-muted-foreground">
                SCREEN
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(42px,1fr))] gap-2">
              {hall.seats.map((seat) => (
                <div
                  key={seat.seat_id}
                  title={seat.seat_label}
                  className="flex min-h-10 items-center justify-center rounded-md border bg-muted/40 px-1 text-xs font-medium"
                >
                  {seat.seat_label}
                </div>
              ))}
            </div>                  

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Read-only seat layout
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
