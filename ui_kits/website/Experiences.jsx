/* global React, Motion */
const { motion } = Motion;

const CATEGORIES = [
  { id: 'gs-cat-cabello', n: '01', label: 'Cabello', tall: true },
  { id: 'gs-cat-manos', n: '02', label: 'Manicure & Pedicure' },
  { id: 'gs-cat-mirada', n: '03', label: 'Pestañas & Cejas' },
  { id: 'gs-cat-barberia', n: '04', label: 'Barbería Ejecutiva' },
  { id: 'gs-cat-salon', n: '05', label: 'Experiencia en Salón', tall: true },
  { id: 'gs-cat-antes', n: '06', label: 'Antes & Después' },
];

/* GSAP-driven: a signature image expands to full-bleed while pinned,
   then an editorial category gallery with parallax + hover zoom. */
function Experiences() {
  const rootRef = React.useRef(null);
  const expandRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const capRef = React.useRef(null);

  React.useEffect(() => {
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: expandRef.current, start: 'top top', end: '+=120%', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      .fromTo(frameRef.current, { width: '54%', height: '60vh', borderRadius: 26 }, { width: '100%', height: '100vh', borderRadius: 0, ease: 'none' }, 0)
      .fromTo(capRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: 'none', duration: 0.35 }, 0)
      .to(capRef.current, { opacity: 0, y: -14, ease: 'none', duration: 0.3 }, 0.72);
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef} id="experiencias">
      {/* signature expanding image */}
      <section ref={expandRef} className="gs-expand">
        <div className="gs-expand__pin">
          <div ref={frameRef} className="gs-expand__frame">
            <image-slot id="gs-signature" src="assets/photos/gs-signature.jpg" shape="rect" fit="cover" placeholder="Imagen firma"></image-slot>
            <div className="slot-hint"><span className="slot-hint__plus">+</span><span className="slot-hint__t">Agregar foto</span></div>
            <div className="gs-expand__veil"></div>
            <div ref={capRef} className="gs-expand__cap">
              <p className="gs-eyebrow gs-eyebrow--light">Estética · Exclusividad · Ritual</p>
              <h2 className="gs-expand__title">Un santuario<br />diseñado para pocos</h2>
            </div>
          </div>
        </div>
      </section>

      {/* category gallery */}
      <section className="sec sec--center cats">
        <Reveal><p className="gs-eyebrow">Galería</p></Reveal>
        <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Experiencias Greek Studio</h2></Reveal>
        <Reveal delay={0.1}><p className="sec__lead sec__lead--narrow">Fotografía profesional que transmite lujo, confianza y bienestar. Arrastra tus imágenes a cada categoría.</p></Reveal>

        <div className="cats__grid">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} as="figure" amount={0.15} delay={(i % 3) * 0.06}
              className={'cat' + (c.tall ? ' cat--tall' : '')}>
              <div className="cat__frame">
                <image-slot id={c.id} src={'assets/photos/' + c.id + '.jpg'} shape="rect" fit="cover" placeholder={'Fotografía · ' + c.label}></image-slot>
                <div className="cat__overlay"></div>
                <div className="slot-hint"><span className="slot-hint__plus">+</span><span className="slot-hint__t">Agregar foto</span></div>
                <figcaption className="cat__cap">
                  <span className="cat__n">{c.n}</span>
                  <span className="cat__label">{c.label}</span>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Experiences });
