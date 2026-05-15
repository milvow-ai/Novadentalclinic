/**
 * Canonical list of supported icon names.
 *
 * Lives in a sibling .ts file so the type can be imported by other
 * components (Services, HowItWorks, etc.) — Astro's frontmatter parser
 * does not reliably surface type exports across module boundaries.
 *
 * When adding a new icon: add the name here AND a render branch in
 * Icon.astro.
 */
export type IconName =
  | 'check'
  | 'play'
  | 'phone'
  | 'mail'
  | 'map-pin'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'menu'
  | 'x'
  | 'instagram'
  | 'facebook'
  | 'chevron-right'
  | 'sparkles'
  | 'tooth'
  | 'shield-check'
  | 'heart-pulse'
  | 'smile'
  | 'sun-medium'
  | 'baby'
  | 'calendar'
  | 'clock'
  | 'user'
  | 'stethoscope';
