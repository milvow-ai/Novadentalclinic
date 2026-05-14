# CLAUDE.md — Project Constitution

**Project:** Nova Dental Studio (Milvow Dry-Run Build #1)
**Owner:** Milvow Technologies LLP
**Read this file at the start of every session. These are laws, not suggestions.**

---

## 1. Project Context

Milvow builds productized digital operational infrastructure for SMBs — not template websites and not generic AI-agency work. Output must feel custom-coded by a senior designer, not assembled by AI.

This build is the first dry-run for the Milvow website production system. It serves a fictional client (Nova Dental Studio) to validate the system end-to-end before paid clients onboard.

**Critical constraint:** The completed site must feel indistinguishable from work shipped by a premium boutique agency. Generic AI output is a failure condition. Every component, spacing decision, hover state, and animation must conform to the design system defined below. Inconsistency is treated as a bug.

---

## 2. Stack (Locked — Do Not Deviate)

- **Framework:** Astro (static-first, zero-JS by default)
- **Styling:** Tailwind CSS with custom token layer (NOT default shadcn aesthetic)
- **Interactivity:** React islands only where motion or state is required
- **Animation:** `motion` package (formerly Framer Motion)
- **Smooth scroll:** `lenis` via `lenis/react`
- **Icons:** `lucide-react` only
- **Fonts:** Switzer (self-hosted from Fontshare)
- **Utility:** `clsx` + `tailwind-merge` via `cn()` helper
- **Deploy:** Cloudflare Pages or Vercel (auto-deploy from `main` branch)

Do not add new dependencies without justification. Do not introduce shadcn/ui, Material UI, or any opinionated component library. The primitives are built bespoke.

---

## 3. File Structure

```
src/
├── components/
│   ├── ui/              # Primitive components (Button, Link, Card, etc.)
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   └── motion/           # Motion utilities (FadeIn, SmoothScroll, etc.)
├── layouts/              # BaseLayout and section layouts
├── lib/                  # Helpers: cn, seo, schema
├── pages/                # Route files
├── styles/               # global.css with tokens
└── content/              # MDX content collections if needed

public/
├── fonts/                # Self-hosted Switzer .woff2 files
└── images/               # Optimized assets
```

Components in `/sections/` MUST import from `/ui/`. Pages MUST import from `/sections/` or `/ui/`. Never inline a button or card structure in a page — always go through primitives.

---

## 4. Design Tokens — The Visual Constitution

Every color, size, spacing, radius, shadow, and motion timing is defined here. Components reference tokens only. **Off-token values are bugs.**

### 4.1 Color Tokens

Declared in `src/styles/global.css` under `:root`. All colors are CSS variables.

```
--color-bg:           #FAFAF7   /* warm off-white — primary background */
--color-fg:           #0F1419   /* deep neutral — primary text */
--color-muted:        #6B7280   /* secondary text, captions */
--color-subtle:       #F2F0EB   /* slightly darker than bg — card backgrounds */
--color-border:       #E5E3DD   /* light warm gray — dividers, borders */
--color-accent:       #315BFF   /* electric medical blue — CTAs, links, accents */
--color-accent-fg:    #FFFFFF   /* white text on blue */
--color-accent-soft:  #E6EBFF   /* very pale blue — subtle accent backgrounds */
--color-dark:         #0A1830   /* deep navy — dark section backgrounds */
--color-dark-fg:      #FAFAF7   /* off-white text on dark */
```

**Rules:**
- Blue (`--color-accent`) is reserved for: primary CTA buttons, active states, focus rings, key text accents (e.g., "Best Dental" highlight in hero). Never used as a section background.
- Dark navy (`--color-dark`) is for one or two strategic dark sections only (e.g., "Case Stories" section). Not for full pages.
- No raw hex values in components. No `text-blue-500` or `bg-slate-900`. Use the mapped Tailwind token classes: `bg-bg`, `text-fg`, `bg-accent`, `text-accent`, `bg-dark`, etc.

### 4.2 Typography Tokens

**Font:** Switzer (single family, weight contrast does the work)

**Weights used:**
- 400 — body
- 500 — UI labels, buttons, emphasized body
- 600 — sub-headings, section labels
- 700 — primary headings
- (Skip 800/900 — too heavy for this brand)

**Type scale (Tailwind classes):**

```
text-xs    → 0.75rem  / 12px  — micro labels, eyebrow tags
text-sm    → 0.875rem / 14px  — small body, captions
text-base  → 1rem     / 16px  — default body (mobile)
text-lg    → 1.125rem / 18px  — body emphasis, large UI
text-xl    → 1.25rem  / 20px  — small heading
text-2xl   → 1.5rem   / 24px  — H4
text-3xl   → 1.875rem / 30px  — H3
text-4xl   → 2.25rem  / 36px  — H2 (mobile)
text-display-md → clamp(1.5rem, 3vw, 2.25rem)  — used for section headings
text-display-lg → clamp(2rem, 4.5vw, 3.5rem)   — used for H2
text-display-xl → clamp(2.5rem, 6vw, 5rem)     — used for H1
text-display-2xl → clamp(3.5rem, 8vw, 6.5rem)  — used for hero display
```

**Line height + tracking:**
- Display sizes: line-height 0.95–1.05, letter-spacing -0.025em to -0.04em (tightening on large type)
- Body: line-height 1.6, letter-spacing 0
- Small UI: line-height 1.4, letter-spacing 0

### 4.3 Spacing Tokens

Tailwind default scale (`p-1`, `p-2`, `p-4`, etc.) is used. Additionally:

```
spacing-section:    clamp(4rem, 10vw, 8rem)   /* 64-128px — between major sections */
spacing-section-sm: clamp(2rem, 6vw, 4rem)    /* 32-64px — between sub-sections */
```

Container padding: `px-6 md:px-8 lg:px-12`
Max width: `1280px` (`max-w-container`)

### 4.4 Border Radius Tokens

```
rounded-sm    → 0.5rem  / 8px   — small UI (tag chips, input fields)
rounded-md    → 1rem    / 16px  — buttons (when not pill), small cards
rounded-lg    → 1.5rem  / 24px  — cards, primary surfaces
rounded-xl    → 2rem    / 32px  — image containers, large cards
rounded-2xl   → 2.5rem  / 40px  — hero image masks, large image blocks
rounded-full  → 9999px           — pill buttons, badges, avatars
```

**Default behaviors:**
- Buttons: `rounded-full` (pill) — matches reference language
- Cards: `rounded-lg` minimum, `rounded-xl` for hero-tier cards
- Images: `rounded-xl` minimum
- No hard 90° corners except section dividers

### 4.5 Shadow Tokens

```
shadow-sm:    0 1px 2px rgba(15, 20, 25, 0.04)
shadow-md:    0 4px 12px rgba(15, 20, 25, 0.06)
shadow-lg:    0 8px 24px rgba(15, 20, 25, 0.08)
shadow-glow:  0 4px 20px rgba(49, 91, 255, 0.15)
```

**Rules:** Soft, diffused only. No hard dark shadows. No drop-shadow effects with high opacity. Glow shadow used sparingly on primary CTAs or to highlight key floating elements.

### 4.6 Motion Tokens

```
duration-fast:    150ms   /* button color/scale transitions */
duration-base:    300ms   /* hover effects, card lifts */
duration-slow:    600ms   /* image fade-ins, large transitions */
duration-reveal:  800ms   /* scroll-triggered section reveals */

ease-out-quint:   cubic-bezier(0.22, 1, 0.36, 1)   /* hovers, UI feedback */
ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1)    /* scroll reveals, entrances */
ease-smooth:      cubic-bezier(0.4, 0, 0.2, 1)     /* standard transitions */
```

---

## 5. Component Primitives — Required Build

The following 8 primitives MUST be built first in `/src/components/ui/`. Each must implement EVERY listed state. Pages may not exist without these primitives in place.

### 5.1 `<Button>`

**Variants:** `primary`, `secondary`, `ghost`, `link`
**Sizes:** `sm`, `md`, `lg`
**States required:** default, hover, focus-visible, active, disabled, loading

- Default shape: pill (`rounded-full`)
- Primary: `bg-accent text-accent-fg`. On hover: subtle upward shift (`-translate-y-0.5`) + slight shadow grow. 200ms ease-out-quint.
- Secondary: `bg-fg text-bg` for dark sections, or `bg-subtle text-fg` for light. Same motion.
- Ghost: transparent background, border on hover.
- Link: text-only button, underline appears on hover.
- All buttons must include focus-visible ring using `--color-accent` at 2px offset.

### 5.2 `<Link>` (anchor)

**States required:** default, hover, focus-visible, visited
- Default: `text-fg` with underline offset 4px, decoration thickness 1px
- Hover: color shifts to `text-accent`, 200ms ease-out-quint
- No "this link goes black, that goes white" inconsistency permitted. ALL links behave the same way.

### 5.3 `<Card>`

**Variants:** `default`, `feature`, `service`, `image-top`
**States required:** default, hover (lift), interactive (clickable)

- Base: `bg-subtle` or `bg-bg`, `rounded-lg`, generous internal padding (24px–32px)
- Hover (when interactive): `-translate-y-1`, `shadow-md → shadow-lg`, 300ms ease-out-quint
- Image-top variant: image at top with `rounded-t-lg`, content below

### 5.4 `<Heading>`

**Props:** `as` (h1–h6), `size` (display-2xl through xl)
- Decouples semantic level from visual size
- Default font-weight 700, letter-spacing tightening at display sizes
- Auto-applies optical tracking and line-height per size

### 5.5 `<Text>`

**Props:** `size` (xs–lg), `tone` (default, muted, accent)
- Default body styling
- `tone="muted"` → `text-muted`
- `tone="accent"` → `text-accent`

### 5.6 `<Container>`

- Wraps any section's content
- `max-w-container mx-auto px-6 md:px-8 lg:px-12`
- Single source of truth for horizontal layout constraints

### 5.7 `<Section>`

**Props:** `tone` (light, subtle, dark), `padding` (default, lg, sm)
- Default tone: `bg-bg`
- Subtle tone: `bg-subtle`
- Dark tone: `bg-dark text-dark-fg`
- Default padding: `py-section`
- Single source of truth for vertical rhythm

### 5.8 `<Image>`

- Wraps Astro's optimized Image component
- Always lazy-load except above-the-fold
- Always fades in on load over 600ms
- Always has rounded corners (`rounded-xl` default)
- Always has skeleton placeholder background `bg-subtle`

---

## 6. Interaction Laws (Hard Rules)

These define BEHAVIOR. They are not suggestions. Every interactive element must comply.

1. **EVERY** clickable element has hover AND focus-visible states. No exceptions.
2. **EVERY** link transitions color over 200ms ease-out-quint to `--color-accent`. Same behavior site-wide.
3. **EVERY** button has hover state (color shift + slight transform) and focus-visible ring.
4. **EVERY** card with `interactive` prop lifts `-translate-y-1` + shadow grow on hover over 300ms.
5. **EVERY** image fades in over 600ms on load. No popping.
6. **EVERY** scroll-revealed section uses `<FadeIn>` with y=24, duration=800ms, ease-out-expo. No exceptions.
7. **EVERY** page navigation uses Astro's View Transitions API. Pages do not blink — they cross-fade.
8. **NEVER** apply hover utilities directly on raw HTML elements. Always go through primitives.
9. **EVERY** primary CTA button has subtle `shadow-glow` to draw the eye. Secondary buttons do not.
10. **EVERY** focusable element has visible focus-visible state. Accessibility is non-negotiable.

---

## 7. Motion System Detail

**Scroll smoothness:** Lenis is active globally via `<SmoothScroll>` in BaseLayout. Do not override.

**Scroll reveals:** Use the `<FadeIn>` primitive from `/components/motion/FadeIn.tsx`. Default config: y=24, duration=0.8, ease=ease-out-expo, triggered once on enter.

**Marquee strips:** Horizontal continuously-scrolling strips (used for service tags in reference). Build as `<Marquee>` primitive in `/components/motion/`. Continuous loop, slow speed (~30s for one cycle), pauses on hover.

**Page transitions:** Astro View Transitions API. Enable via `<ViewTransitions />` in `<head>`.

**Image entrance:** Built into `<Image>` primitive. 600ms fade.

**Hover transforms:** Subtle. Maximum displacement: `-translate-y-1` (4px). No bouncy springs. No exaggerated scale (`scale-105` MAX, never `scale-110+`).

**Forbidden:** No parallax that breaks scroll smoothness. No autoplay video. No background-attached scroll effects. No 3D rotations. No mouse-position-tracking cursor effects on the dental site (save for future projects).

---

## 8. Forbidden Patterns (Auto-Reject)

If any of these appear in code, treat as a bug and fix:

- ❌ Off-token colors (`text-blue-500`, `bg-slate-900`, raw hex values in components)
- ❌ Hardcoded font sizes (`text-[17px]`)
- ❌ Hardcoded spacing values outside the scale (`p-[14px]`)
- ❌ Hardcoded animation durations (`duration-[475ms]`)
- ❌ Raw HTML buttons or anchors in pages (must use `<Button>` / `<Link>`)
- ❌ Inline `style=""` attributes
- ❌ Shadcn-style component patterns or class compositions
- ❌ Generic stock-style hero with "Lorem ipsum"
- ❌ Multiple typefaces (Switzer only)
- ❌ Hard-edged shadows (`shadow-2xl` with dark opacity)
- ❌ Pure black `#000000` text or pure white `#FFFFFF` background
- ❌ Default Tailwind blue, default gray scale used unmapped

---

## 9. Required Patterns (Always Apply)

- ✅ Every interactive element wired through `/components/ui/` primitives
- ✅ Every section wrapped in `<Section>` and `<Container>`
- ✅ Every image through `<Image>` primitive
- ✅ Every reveal wrapped in `<FadeIn>`
- ✅ Every primary CTA gets `shadow-glow`
- ✅ Every page sets proper SEO meta via `<BaseLayout>` props
- ✅ Every page includes appropriate schema.org JSON-LD via `schema.ts` helpers
- ✅ Every component handles mobile-first responsive (assume 90% traffic is mobile)
- ✅ Every state — hover, focus, active, disabled — implemented

---

## 10. Client Brief — Nova Dental Studio

**Brand type:** Premium modern dental clinic. Trust, cleanliness, simplicity.
**Industry:** Premium Cosmetic & Family Dental Clinic
**Vibe:** Clean. Trustworthy. Modern.
**Typography:** Switzer (600–700 headings, 400–500 body/UI)
**Primary accent:** Electric Medical Blue `#315BFF`
**Background mood:** Warm off-white — NOT pure white. Slight warmth communicates premium clinical feel without sterility.

**Tone of voice in copy:**
- Direct, professional, warm
- No fluff, no "Lorem ipsum"
- Active voice
- Short sentences in body
- Headlines confident but not aggressive

**Required pages (single-page landing):**
- Hero (split: headline left, doctor photo right with blue circular accent shape)
- About (15+ years expertise, trust markers, photo cluster)
- Services (image-top cards: General Dentistry, Teeth Whitening, Dental Implant, Dental Sealants, Cosmetic, Root Canal)
- Marquee service strip (horizontal scrolling tags)
- Stats / social proof (10+ doctors, 99% satisfaction, 20K+ appointments)
- Case Stories (dark navy section with before/after type cards)
- How It Works (4-step process with numbered circles)
- Online Booking form (name, phone, date, time, dentist)
- Footer

---

## 11. Reference Calibration

The uploaded reference image is the **calibration target**, NOT a clone target.

**Extract from reference:**
- Spacing rhythm (generous, airy)
- Border radius scale (consistent, generous)
- Section composition logic (modular, stacked)
- Pill button language
- Soft shadow treatment
- Image-top service card pattern
- Horizontal marquee strip pattern
- Floating stat block pattern
- Blue circular shape behind hero portrait

**Do NOT copy:**
- Exact pixel positions
- Exact copy text
- Exact image crops or compositions
- Layout literally (translate the principles, not the geometry)

**Critical: the output must NOT look like a "clone" of the reference. It should look like a peer agency built the Nova site using the same design principles.**

---

## 12. Build Sequence

Execute in this order. Do not skip ahead.

1. **Project setup**: initialize Astro, install all dependencies, configure Tailwind with tokens, set up file structure, self-host Switzer fonts.
2. **Token implementation**: write `global.css` with full token spec from Section 4. Map all tokens to Tailwind config.
3. **Primitive components**: build all 8 components from Section 5, each with all required states. Test each in isolation.
4. **Motion utilities**: build `<FadeIn>`, `<SmoothScroll>`, `<Marquee>` in `/components/motion/`.
5. **SEO infrastructure**: implement `BaseLayout`, `SEO` component, schema helpers, sitemap, robots.txt, llms.txt route handler.
6. **Kitchen sink page**: build `/kitchen-sink` route showing every primitive in every state. This is the visual audit reference. Deploy and verify.
7. **Section components**: build each page section in `/components/sections/` using primitives only.
8. **Page assembly**: build `/index.astro` from sections.
9. **Content pass**: write all copy in Switzer voice — confident, warm, professional. No placeholder text.
10. **Audit pass**: run the audit prompt from Section 13.
11. **SEO finalization**: set all meta tags, OG image, schema markup, submit to Search Console.
12. **Deploy**: push to `main`, verify Vercel/Cloudflare auto-deploy succeeded, smoke-test the live URL.

---

## 13. Audit Prompt (Run Before Every Ship)

Paste this prompt to Claude Code before declaring any site complete:

```
Audit this entire codebase against /CLAUDE.md.

For each file in /src/pages and /src/components, identify EVERY violation
of the design tokens, interaction laws, forbidden patterns, and required
patterns sections.

Specifically check:
1. Off-token colors anywhere
2. Hardcoded font sizes, spacings, or radii
3. Hardcoded animation durations
4. Raw <button>, <a>, <img>, <h1> elements that should use primitives
5. Inline style attributes
6. Missing hover states on any interactive element
7. Missing focus-visible states on any focusable element
8. Inconsistent motion timing or easing
9. Missing FadeIn wrappers on scroll-revealed sections
10. Missing shadow-glow on primary CTAs
11. Any place where the design system was bypassed for convenience

List EVERY violation with file:line. Then fix all of them. Then list the
fixes made. Then re-verify the audit passes with zero violations.
```

---

## 14. Operating Principles for Claude Code

- When in doubt, choose the more constrained option (fewer colors, smaller motion, tighter spacing).
- Bias toward whitespace. Cramped is the enemy.
- Every section should breathe. If two sections feel similar, increase the gap or change the tone.
- Repeat patterns intentionally (e.g., card hover lifts everywhere) — repetition is recognition.
- Never invent a new visual pattern for a one-off section. Reuse what exists or extend a primitive.
- The goal is "this looks like a premium boutique agency made it," not "this is technically functional."
- If you would not be proud to put this in a portfolio, do not commit it.

---

## 15. Final Note

This file is the senior designer for this project. It does not negotiate. When implementation tension arises between "what works fastest" and "what conforms to CLAUDE.md," CLAUDE.md wins every time. Speed is achieved by reusing primitives, not by skipping them.

End of constitution.
