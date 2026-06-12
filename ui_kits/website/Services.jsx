/* global React, Motion */

const SERVICE_GROUPS = [
  {
    cat: 'Cabello · Estilismo',
    items: [
      'Corte ejecutivo & secado de autor',
      'Hidratación profunda con Olaplex',
      'Color, balayage & técnicas de luz',
      'Keratina orgánica & alisado vegano',
    ],
  },
  {
    cat: 'Manos & Pies',
    items: [
      'Manicura premium · Rubber & Gelish',
      'Pedicura ritual con veloterapia',
      'Sistemas de extensión & arte personalizado',
    ],
  },
  {
    cat: 'Mirada · Pestañas & Cejas',
    items: [
      'Extensión & lifting de pestañas',
      'Diseño, laminado & pigmentado de cejas',
    ],
  },
  {
    cat: 'Barbería Ejecutiva',
    items: [
      'Corte caballero & perfilado de barba',
      'Ritual facial con mascarilla purificante',
    ],
  },
];

const RITUALS = [
  { t: 'Bebida de cortesía', s: 'té premium · café · espumante' },
  { t: 'Hidratación capilar', s: 'solo en el paquete Greek Hair Experience' },
  { t: 'Veloterapia', s: 'ritual exclusivo de manos & pies' },
  { t: 'Mascarilla facial', s: 'purificante para caballeros' },
];

function Servicios({ onBook }) {
  return (
    <section id="servicios" className="sec sec--center">
      <Reveal><p className="gs-eyebrow">La Carta</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Experiencias &amp; Servicios</h2></Reveal>
      <Reveal delay={0.1} className="orna"><span className="orna__line" /><span className="orna__dia" /><span className="orna__line" /></Reveal>
      <Reveal delay={0.12}>
        <p className="menu__kicker">Estética · Exclusividad · Ritual</p>
      </Reveal>

      <div className="menu">
        {SERVICE_GROUPS.map((g, i) => (
          <Reveal key={g.cat} delay={0.05 * i} amount={0.15} className="menu__group">
            <h3 className="menu__cat">{g.cat}</h3>
            <ul className="menu__list">
              {g.items.map(it => (
                <li key={it} className="menu__item">
                  <span className="menu__name">{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} amount={0.2} className="ritualbar">
        <p className="ritualbar__title">Rituales incluidos en cada experiencia</p>
        <div className="ritualbar__grid">
          {RITUALS.map(r => (
            <div key={r.t} className="ritualbar__item">
              <span className="ritualbar__dia" />
              <div>
                <p className="ritualbar__t">{r.t}</p>
                <p className="ritualbar__s">{r.s}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.05} className="menu__cta">
        <button className="gs-btn gs-btn--primary" onClick={onBook}>
          <span>Reserva tu Experiencia</span>
        </button>
        <p className="menu__note">Tarifas compartidas en consulta privada · Club privado de belleza</p>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Servicios });
