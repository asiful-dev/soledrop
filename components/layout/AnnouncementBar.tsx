"use client";

import React from "react";

const ANNOUNCEMENTS = [
  "FREE SHIPPING ON ORDERS OVER $150",
  "NEW DROPS EVERY FRIDAY",
  "VERIFIED KICKS ONLY",
];

const REPEATED_ANNOUNCEMENTS = Array(4).fill(ANNOUNCEMENTS).flat();

function AnnouncementTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {REPEATED_ANNOUNCEMENTS.map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
          <span className="text-[11px] font-semibold text-white tracking-[0.2em] uppercase">
            {text}
          </span>

          <span
            className="text-lg text-accent-foreground dark:text-accent"
            aria-hidden="true"
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

const AnnouncementBar = () => {
  return (
    <div className="h-9 bg-primary overflow-hidden border-b border-white/10 flex items-center">
      <div className="flex w-max animate-marquee py-1 will-change-transform motion-reduce:animate-none">
        <AnnouncementTrack />
        <AnnouncementTrack ariaHidden />
      </div>
    </div>
  );
};

export default AnnouncementBar;
