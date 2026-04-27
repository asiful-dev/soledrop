"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "@phosphor-icons/react";

const DEFAULT_AVATAR = "/default-user.svg";

const TESTIMONIALS = [
  {
    name: "Ari Miles",
    handle: "@arimoves",
    quote:
      "SoleDrop is where I find every release before everyone else. Clean UI and fast checkout.",
    avatar: "/ari-miles.jpg",
  },
  {
    name: "Nova Reed",
    handle: "@novakicks",
    quote:
      "Listed my pair in minutes and sold it the same day. This platform really gets the sneaker scene.",
    avatar: "/nova-reed.jpg",
  },
  {
    name: "Jay Quinn",
    handle: "@jqstyle",
    quote:
      "Filters are on point and the drops are actually good. Easily my favorite sneaker marketplace.",
    avatar: "/jay-quinn.jpg",
  },
  {
    name: "Skyler Moss",
    handle: "@skykicks",
    quote:
      "Authenticity is everything for me. SoleDrop's verification process is top-notch.",
    avatar: "/skyler-moss.jpg",
  },
  {
    name: "Casey Lane",
    handle: "@caseycops",
    quote:
      "The interface is slick and the search works perfectly. Found my grails in seconds.",
    avatar: "/casey-lane.jpg",
  },
  {
    name: "Jordan Webb",
    handle: "@webbkicks",
    quote:
      "Solid community and great prices. Seller support is actually helpful too.",
    avatar: "/jordan-webb.jpg",
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
}) => {
  const [hasAvatarError, setHasAvatarError] = useState(false);
  const avatarSrc =
    hasAvatarError || !testimonial.avatar ? DEFAULT_AVATAR : testimonial.avatar;

  return (
    <div className="w-[320px] shrink-0 bg-surface border border-border rounded-xl p-6 transition-all hover:border-primary/50 group">
      <div className="flex gap-0.5 text-accent mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} weight="fill" className="h-3.5 w-3.5" />
        ))}
      </div>
      <p className="text-[13px] text-white leading-relaxed line-clamp-3 mb-6">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-border bg-primary/10 group-hover:scale-110 transition-transform">
          <Image
            src={avatarSrc || DEFAULT_AVATAR}
            alt={`${testimonial.name} avatar`}
            fill
            sizes="36px"
            className="object-cover"
            onError={() => setHasAvatarError(true)}
          />
        </div>
        <div>
          <p className="text-[13px] font-bold text-foreground leading-none mb-1">
            {testimonial.name}
          </p>
          <p className="text-[11px] text-muted-foreground leading-none">
            {testimonial.handle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS, ...TESTIMONIALS].reverse();

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <h2 className="heading-display text-4xl md:text-5xl text-foreground text-center">
          LOVED BY THE CULTURE
        </h2>
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Row 1 */}
        <div className="flex animate-marquee gap-6 whitespace-nowrap hover:paused">
          {row1.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex animate-marquee-reverse gap-6 whitespace-nowrap hover:paused">
          {row2.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Side Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
