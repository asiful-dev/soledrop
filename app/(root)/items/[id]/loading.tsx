import { Skeleton } from "@/shared/ui-components/controls/skeleton";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Back button skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-8 w-28" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Product Image Skeleton */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Right: Details Skeleton */}
        <div className="flex flex-col gap-5">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" /> {/* Badge */}
            <Skeleton className="h-10 w-3/4" /> {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <Skeleton className="h-12 w-40" /> {/* Price */}
          {/* Specifications skeleton */}
          <div className="space-y-4 rounded-xl border border-border bg-surface/50 p-4">
            <Skeleton className="h-5 w-32" /> {/* Specs Title */}
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
          {/* About section skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" /> {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Drops Section Skeleton */}
      <div className="mt-16">
        <Skeleton className="mb-6 h-8 w-48" /> {/* Title */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
