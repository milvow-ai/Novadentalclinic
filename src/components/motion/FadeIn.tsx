import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * <FadeIn> — scroll-revealed entrance per §7.
 *
 * Defaults: y=24, duration=0.8s, ease-out-expo, viewport once: true.
 * Respects prefers-reduced-motion (renders without animation).
 *
 * `as` lets consumers swap the rendered tag without losing motion.
 */
type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span' | 'header' | 'footer';
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export default FadeIn;
