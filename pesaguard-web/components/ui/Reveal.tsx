"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll wrapper.
 *
 * Content is visible by default; the observer only adds `.is-revealed` for a
 * progressive-enhancement rise. If JavaScript or IntersectionObserver is
 * unavailable, children render unchanged.
 */
export function Reveal({ children, step }: { children: React.ReactNode; step?: 2 | 3 | 4 | 5 | 6 }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={step}>
      {children}
    </div>
  );
}
