/* global React, Lucide */

const MILESTONES = {
  ella: [
    { v: 5,  t: 'Diseño de cejas o hidratación premium', s: 'de regalo' },
    { v: 10, t: 'Keratina orgánica', s: 'gratis' },
    { v: 15, t: 'Lifting de pestañas o laminado de cejas', s: 'a elección' },
    { v: 20, t: 'Sesión "Greek Signature"', s: 'glam completo · o 1 mes de membresía' },
  ],
  el: [
    { v: 5,  t: 'Perfilado de barba o corte de cortesía', s: 'de regalo' },
    { v: 10, t: 'Ritual facial purificante', s: 'gratis' },
    { v: 15, t: 'Corte + barba premium', s: 'a elección' },
    { v: 20, t: 'Experiencia "Greek Gentleman"', s: 'grooming completo · o 1 mes de membresía' },
  ],
};

/* ════════════════ D · GREEK REWARDS ════════════════
   Línea de tiempo (horizontal en desktop, vertical en móvil)
   El programa aplica a todos: socios y no socios, ella y él.
   ════════════════════════════════════════════════════ */
function GreekRewards() {
  const { Star } = Lucide;
  const [tab, setTab] = React.useState('ella');
  const list = MILESTONES[tab];
  return (
    <section id="rewards" className="sec sec--center sec--rewards">
      <Reveal><p className="gs-eyebrow">Lealtad</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Greek Rewards<br />La Recompensa de la Lealtad</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="sec__lead sec__lead--narrow">
          Tu lealtad tiene premio. Aplica para <strong>socios y no socios</strong>:
          cada visita suma hacia tu próxima recompensa.
        </p>
      </Reveal>

      {/* Toggle Para ella / Para él */}
      <Reveal delay={0.12} className="ctabs ctabs--center" amount={0.4}>
        <button role="tab" aria-selected={tab === 'ella'} onClick={() => setTab('ella')} className={'ctabs__opt' + (tab === 'ella' ? ' is-on' : '')}>Para ella</button>
        <button role="tab" aria-selected={tab === 'el'}   onClick={() => setTab('el')}   className={'ctabs__opt' + (tab === 'el' ? ' is-on' : '')}>Para él</button>
      </Reveal>

      <div className="path" key={tab}>
        <span className="path__rail" aria-hidden="true" />
        {list.map((m, i) => (
          <Reveal key={m.v} delay={0.06 * i} amount={0.2} className="path__step">
            <span className="path__node">
              <Star size={14} strokeWidth={1.6} fill="var(--marble-pearl)" color="var(--marble-pearl)" />
            </span>
            <span className="path__count">{m.v} visitas</span>
            <span className="path__reward">{m.t}</span>
            <span className="path__sub">{m.s}</span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="path__quote">
        <p>"La fidelidad, por primera vez en Maracaibo, tiene premio<br />—y el premio te trae de vuelta."</p>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="path__note">Cada visita suma. El ciclo se reinicia tras el hito de 20 visitas.</p>
      </Reveal>
    </section>
  );
}

Object.assign(window, { GreekRewards });
