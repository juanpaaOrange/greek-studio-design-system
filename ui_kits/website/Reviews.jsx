/* global React, Lucide */

/* NOTE: sample testimonials — replace with live Google reviews. */
const REVIEWS = [
  { name: 'Valentina R.', stars: 5, text: 'Una experiencia de otro nivel. Cada detalle está pensado para consentirte. Salí sintiéndome la mejor versión de mí.' },
  { name: 'Daniela M.', stars: 5, text: 'El lugar más elegante de Maracaibo. El trato es impecable y el resultado, simplemente perfecto.' },
  { name: 'Andrea G.', stars: 5, text: 'Más que un salón, un verdadero templo. La veloterapia y la bebida de cortesía hacen toda la diferencia.' },
  { name: 'María José P.', stars: 5, text: 'Profesionalismo y lujo silencioso. Mis cejas y pestañas quedaron espectaculares. Volveré sin dudarlo.' },
  { name: 'Gabriela L.', stars: 5, text: 'Atención personalizada de principio a fin. Ya es mi lugar favorito para reservar mi ritual de belleza.' },
];

function Stars({ n }) {
  const { Star } = Lucide;
  return (
    <span className="rev__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} strokeWidth={1.2}
          fill={i < n ? 'var(--champagne-gold)' : 'none'}
          color="var(--champagne-gold)" />
      ))}
    </span>
  );
}

function Reviews() {
  const [idx, setIdx] = React.useState(0);
  const count = REVIEWS.length;
  const go = (d) => setIdx((p) => (p + d + count) % count);

  React.useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const { ChevronLeft, ChevronRight, Star } = Lucide;

  return (
    <section id="resenas" className="sec sec--center sec--raised">
      <Reveal><p className="gs-eyebrow">Reseñas</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">La Experiencia<br />de Nuestras Clientes</h2></Reveal>

      <Reveal delay={0.1} className="rev__summary">
        <span className="rev__avg">4.9</span>
        <span className="rev__sumstars"><Stars n={5} /></span>
        <span className="rev__count">Basado en reseñas verificadas de Google</span>
      </Reveal>

      <Reveal delay={0.12} className="rev__carousel">
        <div className="rev__viewport">
          <div className="rev__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {REVIEWS.map((r) => (
              <figure className="rev__card" key={r.name}>
                <Star className="rev__quotemark" size={26} strokeWidth={1} fill="var(--sand-deep)" color="var(--sand-deep)" />
                <Stars n={r.stars} />
                <blockquote className="rev__text">{r.text}</blockquote>
                <figcaption className="rev__name">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="rev__controls">
          <button className="rev__arrow" onClick={() => go(-1)} aria-label="Anterior"><ChevronLeft size={18} strokeWidth={1.5} /></button>
          <div className="rev__dots">
            {REVIEWS.map((_, i) => (
              <button key={i} className={'rev__dot' + (i === idx ? ' is-on' : '')} onClick={() => setIdx(i)} aria-label={'Reseña ' + (i + 1)} />
            ))}
          </div>
          <button className="rev__arrow" onClick={() => go(1)} aria-label="Siguiente"><ChevronRight size={18} strokeWidth={1.5} /></button>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Reviews });
