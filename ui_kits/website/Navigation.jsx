/* global React, Motion, Lucide */
const { motion } = Motion;
const { Menu, X } = Lucide;

const NAV_LINKS = [
  { label: 'Nosotros', href: '#historia' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Club', href: '#club' },
  { label: 'Contacto', href: '#contacto' },
];

/* ── Transparent navigation floating above the video ── */
function Navigation({ onOpenMenu }) {
  return (
    <motion.header
      className="gs-nav"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
    >
      {/* Left — logo lockup */}
      <a className="gs-nav__brand" href="#">
        <img src="assets/symbol-bronze.png" alt="" className="gs-nav__mark" />
        <span className="gs-nav__word">
          GREEK STUDIO
          <em>Beauty Salon</em>
        </span>
      </a>

      {/* Center — desktop links */}
      <nav className="gs-nav__links">
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="gs-nav__link"><span>{l.label}</span></a>
        ))}
      </nav>

      {/* Right — circular gold menu button */}
      <button className="gs-nav__menu" onClick={onOpenMenu} aria-label="Open menu">
        <Menu size={18} strokeWidth={1.6} />
      </button>
    </motion.header>
  );
}

/* ── Full-screen mobile / overlay menu ── */
function MobileMenu({ open, onClose }) {
  const { AnimatePresence } = Motion;
  const { ArrowUpRight } = Lucide;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="gs-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="gs-overlay__top">
            <span className="gs-overlay__brand">GREEK STUDIO</span>
            <button className="gs-overlay__close" onClick={onClose} aria-label="Close menu">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="gs-overlay__nav">
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label} href={l.href} className="gs-overlay__link" onClick={onClose}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.07 }}
              >
                <span className="gs-overlay__index">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#reservar" className="gs-overlay__cta" onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          >
            Reserva tu Experiencia
            <ArrowUpRight size={26} strokeWidth={1.4} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Object.assign(window, { Navigation, MobileMenu, NAV_LINKS });
