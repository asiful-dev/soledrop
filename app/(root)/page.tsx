"use client";

import { Suspense, lazy } from "react";
import HeroSection from "@/features/ui/components/HeroSection";
import FeaturesSection from "@/features/ui/components/FeaturesSection";
import TestimonialsSection from "@/features/ui/components/TestimonialsSection";
import CTABannerSection from "@/features/ui/components/CTABannerSection";
import SkeletonCard from "@/components/shared/SkeletonCard";

const FeaturedDropsSection = lazy(
  () => import("@/features/ui/components/FeaturedDropsSection"),
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <FeaturedDropsSection />
      </Suspense>
      <FeaturesSection />
      <TestimonialsSection />
      <CTABannerSection />
    </>
  );
}
