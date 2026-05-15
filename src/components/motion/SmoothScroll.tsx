import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * <SmoothScroll> — global Lenis smooth-scroll initializer.
 *
 * Mounted once in <BaseLayout> as a near-invisible React island
 * (`client:load`). Renders nothing — just attaches Lenis on mount
 * and tears down on unmount. Honors prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
