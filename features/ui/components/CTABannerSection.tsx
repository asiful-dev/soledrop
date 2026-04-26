import Link from "next/link";
import { Button } from "@/shared/ui-components/controls/button";

export default function CTABannerSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl bg-linear-to-r from-primary/70 to-primary p-8 text-center sm:p-10">
        <h2 className="text-3xl font-black text-white">Ready to Cop?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/90 sm:text-base">
          Browse the latest drops and lock in your next favorite pair today.
        </p>
        <Button
          className="mt-6 bg-white text-primary hover:bg-white/90"
          asChild
        >
          <Link href="/items">Shop Drops</Link>
        </Button>
      </div>
    </section>
  );
}
