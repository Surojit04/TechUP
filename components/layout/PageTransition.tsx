"use client";

import React from "react";

/**
 * PageTransition wrapper.
 * All navigation transitions, overlays, wipe effects, and artificial delays have been
 * completely removed to provide instant, zero-delay navigation between all pages and sections.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
