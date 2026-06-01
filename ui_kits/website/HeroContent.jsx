/* global React, Motion, Lucide */
const { motion } = Motion;

/* Masked upward reveal for each headline line */
function RevealLine({ children, delay }) {
  return (
    <span className="gs-reveal">
      <motion.span
        className="gs-reveal__inner"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Center hero content with subtle pointer parallax ── */
function HeroContent({ onBook }) {
  const { ArrowRight } = Lucide;
  const [par, setPar] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      setPar({ x: x * 16, y: y * 12 });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <motion.div
      className="gs-hero__content"
      animate={{ x: par.x, y: par.y }}
      transition={{ type: 'spring', stiffness: 40, damping: 18 }}
    >
      <motion.p
        className="gs-eyebrow gs-hero__eyebrow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
      >
        El Templo de la Belleza
      </motion.p>

      <h1 className="gs-hero__title">
        <RevealLine delay={0.5}>Experiencia</RevealLine>
        <RevealLine delay={0.62}>Belleza</RevealLine>
        <RevealLine delay={0.74}>Redefinida</RevealLine>
      </h1>

      <motion.p
        className="gs-hero__sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.95 }}
      >
        Experiencias de belleza de lujo inspiradas en la elegancia,
        la confianza y la atención personalizada.
      </motion.p>

      <motion.div
        className="gs-hero__cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
      >
        <button className="gs-btn gs-btn--primary" onClick={onBook}>
          <span>Reservar Cita</span>
          <ArrowRight size={17} strokeWidth={1.6} />
        </button>
        <a className="gs-btn gs-btn--ghost" href="#servicios">
          <span>Explorar Experiencias</span>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ── Floating glass information bar ── */
const INFO = [
  { n: '01', t: 'Experiencias de Lujo' },
  { n: '02', t: 'Atención Personalizada' },
  { n: '03', t: 'Rituales Premium' },
];

function InfoBar() {
  return (
    <motion.div
      className="gs-infobar"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
    >
      {INFO.map((it, i) => (
        <div className="gs-infobar__col" key={it.n}>
          <span className="gs-infobar__n">{it.n}</span>
          <span className="gs-infobar__t">{it.t}</span>
          {i < INFO.length - 1 && <span className="gs-infobar__div" />}
        </div>
      ))}
    </motion.div>
  );
}

Object.assign(window, { HeroContent, InfoBar, RevealLine });
