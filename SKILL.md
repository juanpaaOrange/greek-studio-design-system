---
name: greek-studio-design
description: Use this skill to generate well-branded interfaces and assets for Greek Studio (a Mediterranean luxury beauty house — "El Templo de la Belleza"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `README.md` — brand context, content fundamentals (tone, casing, vocabulary), visual foundations, iconography, and an index of everything.
- `colors_and_type.css` — all design tokens (palette + semantic roles, Cormorant/Inter/Montserrat type scale, spacing, radii, warm shadows, luxury motion) plus `.gs-*` preset classes. Link or copy this into any artifact.
- `assets/` — the Ionic-column logo & symbols (bronze + gold). **Never redraw the column** — always use these files.
- `preview/` — small reference cards (colors, type, components, brand).
- `ui_kits/website/` — a full-screen luxury hero (React + Framer Motion + GSAP ScrollTrigger + Lucide). Lift components or the whole experience.

Core rules to honor: never pure black/white (warm marble + warm ink only); Champagne Gold is the single accent, used sparingly; generous whitespace; slow luxurious motion (ease `[0.22,1,0.36,1]`, 0.8–1.2s); no emoji, no stock icons; ceremonial/exclusive copy ("ritual", "experience", "reserve", "the few"). Feel: Aman / Four Seasons Spa / Aesop / Dior Beauty.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
