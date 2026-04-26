"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Ari Miles",
    handle: "@arimoves",
    quote:
      "SoleDrop is where I find every release before everyone else. Clean UI and fast checkout.",
    avatar: "AM",
  },
  {
    name: "Nova Reed",
    handle: "@novakicks",
    quote:
      "Listed my pair in minutes and sold it the same day. This platform really gets the sneaker scene.",
    avatar: "NR",
  },
  {
    name: "Jay Quinn",
    handle: "@jqstyle",
    quote:
      "Filters are on point and the drops are actually good. Easily my favorite sneaker marketplace.",
    avatar: "JQ",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
          Loved by Sneakerheads
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">{testimonial.handle}</p>
                </div>
              </div>
              <p className="text-sm text-muted">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
