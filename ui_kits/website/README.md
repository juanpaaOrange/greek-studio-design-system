# Greek Studio — Website UI Kit

A full **luxury beauty-salon platform** for Greek Studio (Maracaibo, Venezuela). Long-scroll,
all in Spanish, built to feel like a boutique hotel / private members club.

## Run it
Open `index.html`. Loads from CDN (React 18, Framer Motion, GSAP + ScrollTrigger, Lucide, Google
Fonts). A luxury loader (the column draws in) shows ~2.2s, then the hero reveals.

## Sections (in order)
1. **Hero** — animated Greek-gold background + drifting bronze column, masked-reveal headline, dual CTAs, glass info bar.
2. **Nuestra Historia** — editorial split with a drag-and-drop space photo.
3. **El Significado de Nuestro Nombre** — Antigua Grecia / Afrodita.
4. **Servicios (La Carta)** — full menu by category + rituals incluidos.
5. **Experiencias** — signature image expands to full-bleed (pinned GSAP), then a 6-category gallery with hover-zoom.
6. **Reseñas** — Google-style reviews carousel (4.9★) — *sample testimonials, replace with live data*.
7. **Compromiso Social** — belleza con propósito.
8. **El Templo de la Belleza** — brand philosophy (dark bronze section).
9. **Reserva** — booking form → success screen + WhatsApp confirm link (stores to localStorage).
10. **Club Privado** — loyalty signup, 20% reward → success (stores leads).
11. **Contacto** — details + Google Maps embed + footer.
12. **Athena** — floating AI concierge (uses the built-in Claude helper; Spanish, brand-aware).

## Components
`LoadingScreen.jsx` (loader + particles) · `Navigation.jsx` (nav + mobile overlay) · `HeroContent.jsx`
(hero + info bar) · `Sections.jsx` (Reveal + Historia/Nombre/Compromiso/Filosofia) · `Services.jsx` ·
`Experiences.jsx` · `Reviews.jsx` · `Engage.jsx` (Booking + Loyalty) · `Contact.jsx` (contact + footer) ·
`Athena.jsx` (concierge). Styles in `colors_and_type.css` + `sections.css`.

## Animation
Hero uses Framer Motion (mount-time animations). All scroll sections use a bulletproof
`Reveal` (IntersectionObserver + CSS transitions) so they fade/rise in reliably on scroll.
GSAP ScrollTrigger drives the signature image expand. Ease `[0.22,1,0.36,1]`, 0.8–1.2s.

## Notes / caveats
- **Images** — Historia, the signature image and the 6 gallery categories are empty `<image-slot>`s; drag real photos in (drops persist via a sidecar at project root).
- **Booking / Club** — store to `localStorage` only; a static prototype can't truly send email/WhatsApp. The success screen offers a real `wa.me` confirm link. Wire a backend for production.
- **Athena** — answers via the in-artifact Claude helper; falls back to a WhatsApp prompt if unavailable. Pricing is intentionally "consulta privada" (no price list provided); confirm opening hours.
- **Reviews** — sample testimonials; swap for live Google reviews.
- **Map** — Google Maps `output=embed`; the `share.google` short link is used for the "open in Maps" actions.
- Components are cosmetic recreations for prototyping, not production code.
