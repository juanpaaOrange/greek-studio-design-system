# Greek Studio — Design System

> **El Templo de la Belleza** · Club privado de belleza · Estética ejecutiva
> A Mediterranean luxury beauty house. The brand should feel closer to Aman Resorts,
> Four Seasons Spa, Aesop and Dior Beauty than to a traditional salon.

---

## 1. Company & Product Context

**Greek Studio C.A** ("Greek Studio — Beauty Salon") is a private, members-style luxury
beauty house. It positions estética as **ritual and ceremony**, not service — an exclusive
sanctuary for "those who have already arrived." The visual world is Greco-Roman: the brand
mark is a hand-drawn **Ionic column capital** rendered as fine line-art in warm bronze.

There are two name lockups in the supplied artwork that share the identical column symbol:
- **GREEK STUDIO — Beauty Salon** (primary, bronze on marble)
- **APHRODITE — Beauty Salon** (gold on black — appears to be a sister/earlier lockup)

This design system is built primarily around **GREEK STUDIO**.

### Sources provided
- `uploads/Greek studio logo.pdf` — 2 pages: GREEK STUDIO (bronze/marble) + APHRODITE (gold/black) lockups. Rendered, background-knocked-out and cropped into `assets/`.
- `uploads/GREEK STUDIO - Identidad de Marca.pdf` — 9-page brand identity guide (Spanish), v1.0. The authoritative source for palette, type, logo rules, ornaments and tone.

> ⚠️ The reader may not have access to these uploads; they are summarised throughout this README.

### A note on direction (please read)
The **official brand guide** specifies **Poppins/Montserrat + Lora** for type, and a marfil/bronce
palette. The **hero brief** that kicked off this build asked for a more editorial direction:
**Cormorant Garamond + Inter**, with a refined six-colour palette (Marble Pearl, Light Taupe,
Greek Sand, Champagne Gold, Dark Bronze, Soft Charcoal).

This system is built around the **hero brief's editorial direction** (Cormorant + Inter), because
that is the experience being designed. The official guide's values are documented below and the
palettes are near-identical (the hero names are refinements of the guide's hexes). **Flag for the
user:** confirm whether headings should be **Cormorant Garamond** (current) or the official
**Poppins/Montserrat**. See _Open Questions_ at the end.

---

## 2. Content Fundamentals — how Greek Studio writes

The brand voice is **exclusive, ceremonial, and restrained**. Casing and rhythm matter as much
as the words.

| Principle | Detail |
|---|---|
| **Person** | Addresses the guest with deference — _"Reserva tu experiencia"_. Speaks of "the few", "the élite". Never chummy. |
| **Casing** | Display headlines in **UPPERCASE**, widely tracked. Editorial sub-lines in Cormorant *italic*, sentence case. Labels/eyebrows uppercase, very wide tracking. |
| **Tone** | Calm, sparse, evocative. "La elegancia está en lo que sobra" (elegance is in what's left out). One protagonist per composition. |
| **Vocabulary — say** | Ritual · experiencia · ceremonia · caballero / dama / huésped · reservar / agendar · casa / templo / atelier · cortesía incluida · curador / especialista de autor |
| **Vocabulary — avoid** | servicio / sesión · cliente · apartar · local / sucursal · gratis / de regalo · trabajador / empleado |
| **Anchor phrases** | "El Templo de la Belleza" · "Club privado de belleza" · "Reserva tu experiencia" · "Estética · Exclusividad · Ritual" · "Una pausa para la élite" |
| **Emoji / icons** | **Never.** No emojis, no stock icons. Ornaments only (diamonds, hairlines). |
| **Prices** | Never shown on awareness pieces — only on internal menus. |
| **Languages** | Brand guide is Spanish; the hero experience is English. Keep evocative Spanish phrases as accents ("Una pausa para la élite"). |

**Example, on-brand:**
> THE TEMPLE OF BEAUTY · *Luxury beauty experiences inspired by elegance, confidence, and personalized care.*

**Example, off-brand:** "Book a session with our staff — free drinks!" (uses _session_, _staff_, _free_).

---

## 3. Visual Foundations

### Colour
Warm, sun-bleached Mediterranean marble and bronze. **Never pure black (#000) or pure white (#fff)** —
the brand lives in *mármol cálido* and *tinta cálida*.

- **Marble Pearl `#F3F1EF`** — the ground for almost everything.
- **Champagne Gold `#A8845F`** — the single accent. Used sparingly: one CTA, the menu button, numerals, hairlines, the eyebrow. Never as large fills.
- **Soft Charcoal `#2E2B28`** — primary text (a warm near-black).
- **Dark Bronze `#7A6148`** — sub-headlines, secondary text, ghost-button borders.
- **Greek Sand `#B89A7A` / Light Taupe `#D8D2CD`** — fills, dividers, gradients.
- Full token list + official-guide extensions in `colors_and_type.css`.

Imagery skews **warm**: golden hour, marble, skin, bronze. No cool tones, no high-saturation, no neon.

### Type
- **Display / headings — Cormorant Garamond** (500–600). Editorial, high-contrast serif. Headlines UPPERCASE with tight line-height (0.9). Italic for evocative sub-lines.
- **Body — Inter** (300–400). Quiet, neutral, legible.
- **Labels / eyebrows / logo voice — Montserrat** (400–500), tracked +0.2–0.34em, UPPERCASE. (Closest Google match to the geometric sans in the logo wordmark — see _Iconography_.)
- Avoid aggressive bold weights; 500–600 is the ceiling for headings.

### Spacing & layout
- **Generous whitespace** — "the brand breathes". 8pt base scale; section padding 96–140px.
- **Centred, symmetric, museum-like** composition. Verticality. One protagonist per piece.
- Fixed transparent nav floating above content; floating glass info bar pinned to the bottom.

### Surfaces, depth & motion
- **Radii:** soft — 8 / 16 / 28px; pills (999px) for buttons.
- **Shadows:** warm and soft, never harsh black. e.g. `0 18px 50px -24px rgba(92,74,53,.35)`.
- **Glass:** `rgba(243,241,239,.75)` + `backdrop-filter: blur(20px)` + hairline gold border — used for the info bar.
- **Borders:** 1px hairlines in Light Taupe or translucent gold. Double-frame ornament (outer + inner line, diamond at centre-top) evokes a Greek temple frame.
- **Backgrounds:** warm animated gold gradient + drifting bronze column watermark + slow gold light sweep + ambient gold particles. (The hero originally specced a video; replaced per user request with an all-CSS Greek-gold ambient field.)
- **Animation:** slow and luxurious only. Duration 0.8–1.2s, ease `cubic-bezier(0.22, 1, 0.36, 1)`. Headlines reveal upward through masked containers; everything else fades up with slight stagger. Parallax on hero content (pointer) and GSAP ScrollTrigger image expansion on scroll. **Never** aggressive or bouncy.
- **Hover:** elegant fade to Champagne Gold + a soft gold glow (`0 8px 30px -8px rgba(168,132,95,.45)`); links grow a gold underline; buttons lift 1–2px. **Press:** settle back down (no harsh shrink).

### What NOT to do (from the guide)
- No saturated gradients or neon. No emojis or generic stock icons. No more than 3 type families.
- Don't over-fill the composition. Don't use the logo in negative (white-on-dark) in this first phase. Never redraw the column.

---

## 4. Iconography

- **Brand mark:** a single hand-drawn **Ionic column capital** (volute scrolls + fluted shaft) in line-art. Treated as a sacred asset — **never redrawn or recreated**; always used from the original artwork. Minimum digital height 240px; clear-space = the height of the "G".
- **Extracted assets** (transparent PNG, background knocked out programmatically from the source PDFs):
  - `assets/greek-studio-logo-bronze.png` — full lockup (column + GREEK STUDIO + BEAUTY SALON), bronze.
  - `assets/greek-studio-symbol-bronze.png` — column symbol only, bronze.
  - `assets/greek-studio-symbol-gold.png` — column symbol only, gold (for dark grounds).
  - `assets/aphrodite-logo-gold.png` — APHRODITE lockup, gold.
  - `ui_kits/website/assets/column-bronze.png` / `column-gold.png` — tight-cropped column (no padding) for watermarks.
- **UI icons:** there is no brand icon font. For interface chrome (menu, arrows) we use **Lucide React** (thin 1.4–1.6 stroke) loaded from CDN — its hairline weight matches the logo's line-art. Used minimally: `Menu`, `X`, `ArrowRight`, `ArrowUpRight`. _Substitution flagged: Lucide is not a brand-owned set; it was chosen for stroke-weight compatibility._
- **Ornaments** (from the guide, in place of icons): gold hairline + central diamond; 4–6px gold diamond as bullet/separator; double rectangular frame with diamond corners.
- **Emoji / unicode icons:** never.

---

## 5. Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — brand context, content + visual foundations, iconography, index. |
| `colors_and_type.css` | All design tokens: colour palette + semantic roles, type families + fluid scale, spacing, radii, shadows, motion. Plus `.gs-*` type preset classes. |
| `SKILL.md` | Agent-Skills manifest so this system works as a downloadable Claude skill. |
| `assets/` | Extracted logos & column symbols (bronze + gold, full + symbol-only). |
| `preview/` | Small HTML cards that populate the Design System tab (colours, type, components, logos). |
| `ui_kits/website/` | **Marketing-site UI kit** — the full-screen luxury hero experience (React + Framer Motion + GSAP ScrollTrigger + Lucide). See its own `README.md`. |

### UI kits
- **`ui_kits/website/`** — Greek Studio marketing hero: cinematic gold ambient background, floating transparent nav, masked-reveal headline, dual CTAs, glass info bar, full-screen mobile menu, GSAP scroll-expanding image gallery, luxury loader. Drop your own photos into the `<image-slot>` frames.

---

## 6. Open Questions / Flags for the user

1. **Headings typeface** — current build uses **Cormorant Garamond** (per the hero brief). The official guide says **Poppins/Montserrat**. Which is canonical? Easy to switch.
2. **Fonts are loaded from Google Fonts CDN** (Cormorant Garamond, Inter, Montserrat). If you need offline/self-hosted files, send them and they'll be vendored into `fonts/`.
3. **Photography** — the hero/gallery use drag-and-drop image slots (no stock used, per brand rules). Send real treatment/interior imagery to fill them.
4. **APHRODITE** — is this a sister brand, a former name, or a sub-line? It shares the column symbol; confirm how it should relate to GREEK STUDIO.
5. **Lucide icons** — acceptable as the UI icon set, or do you have a brand-owned set?
