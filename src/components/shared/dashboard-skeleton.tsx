import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <DashboardContainer>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-6 w-6 rounded-xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Skeleton className="h-28 w-full rounded-2xl" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-3xl" />
        ))}
      </div>
    </DashboardContainer>
  );
}
