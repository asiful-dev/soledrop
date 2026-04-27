import Link from "next/link";
import { Button } from "@/shared/ui-components/controls/button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function CTABannerSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-primary px-6 py-16 text-center md:py-24 relative overflow-hidden group">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110 duration-700" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 transition-transform group-hover:scale-110 duration-700" />

        <div className="relative z-10">
          <h2 className="heading-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
            JOIN THE CULTURE
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-base md:text-lg text-white/80 font-medium">
            Browse the latest drops, verify your kicks, and lock in your next
            favorite pair today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-white text-primary hover:bg-zinc-100 h-14 px-10 text-[13px] font-bold uppercase tracking-wider min-w-50"
              size="lg"
              asChild
            >
              <Link href="/items" className="flex items-center gap-2">
                SHOP ALL DROPS
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 h-14 px-10 text-[13px] font-bold uppercase tracking-wider min-w-50"
              size="lg"
              asChild
            >
              <Link href="/register">CREATE ACCOUNT</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
