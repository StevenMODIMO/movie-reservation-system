import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-[200_px,200_px]  xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} size="sm" className="overflow-hidden pt-0">
          <Skeleton className="h-32 w-full" />

          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>

          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
