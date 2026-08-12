"use client";

import { useState } from "react";

/**
 * Renders the real image when the file exists, and a labelled box when it
 * doesn't — so no screen is ever blocked on an asset that hasn't been
 * generated or photographed yet. See docs/SPEC.md §18 for the prompts.
 */
export default function Placeholder({
  src,
  label,
  className = "",
  rounded = false,
  fit = "cover",
}: {
  src: string | null;
  label: string;
  className?: string;
  rounded?: boolean;
  /** "contain" for screenshots and anything with text that must not crop. */
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label}
        onError={() => setFailed(true)}
        style={{ objectFit: fit }}
        className={`${rounded ? "rounded-full" : ""} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-black/10 border border-dashed border-current/30 ${
        rounded ? "rounded-full" : ""
      } ${className}`}
    >
      <span className="px-3 py-2 text-[10px] leading-snug text-center opacity-60 font-mono">
        {label}
      </span>
    </div>
  );
}

/** Warmed during the landing spinner so nothing waits on office wifi later. */
export const PLACEHOLDER_IMAGES = [
  "/corporate-hero.jpg",
  "/chatgpt-sleep.png",
];
