import { Skeleton } from "@/shared/ui-components/controls/skeleton";

export default function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
      <Skeleton className="h-48 w-full rounded-xl bg-background" />
      <Skeleton className="h-4 w-3/4 bg-background" />
      <Skeleton className="h-3 w-full bg-background" />
      <Skeleton className="h-3 w-2/3 bg-background" />
      <Skeleton className="h-9 w-full rounded-lg bg-background" />
    </div>
  );
}
