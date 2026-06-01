/* global React, Motion */
const { motion } = Motion;
const EASE = [0.22, 1, 0.36, 1];

/* ── Luxury loading veil: the Greek Studio column draws in, then lifts away ── */
function LoadingScreen({ done }) {
  return (
    <div className={'gs-loader' + (done ? ' is-hidden' : '')}>
      <motion.div
        className="gs-loader__inner"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.img
          src="assets/symbol-bronze.png"
          alt="Greek Studio"
          className="gs-loader__mark"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <div className="gs-loader__word">GREEK STUDIO</div>
        <div className="gs-loader__line">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          />
        </div>
        <div className="gs-loader__sub">El Templo de la Belleza</div>
      </motion.div>
    </div>
  );
}

/* ── Floating ambient particles — slow, weightless motes of warm light ── */
function Particles({ count = 14 }) {
  const motes = React.useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 5,
      dur: 14 + Math.random() * 18,
      delay: Math.random() * -20,
      drift: (Math.random() - 0.5) * 60,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  ), [count]);

  return (
    <div className="gs-particles" aria-hidden="true">
      {motes.map(m => (
        <motion.span
          key={m.id}
          className="gs-mote"
          style={{
            left: m.left + '%', top: m.top + '%',
            width: m.size, height: m.size, opacity: m.opacity,
          }}
          animate={{ y: [0, -40, 0], x: [0, m.drift, 0], opacity: [m.opacity, m.opacity * 0.4, m.opacity] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

Object.assign(window, { LoadingScreen, Particles, EASE });
