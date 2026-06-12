/* global React, Lucide */

/* ════════════════════════════════════════════════════════════
   ATHENA RESERVE — Membresía privada de Greek Studio
   Helpers compartidos + Hero con tarjeta 3D + Planes + Créditos
   ════════════════════════════════════════════════════════════ */

/* ─── Datos del negocio: ver GS_CONFIG en index.html ─── */
const WHATSAPP_NUMBER = (window.GS_CONFIG && window.GS_CONFIG.whatsapp) || '584220186946';

/* ─── REF: leer ?ref de la URL una sola vez al cargar ─── */
function readRef() {
  try {
    const p = new URLSearchParams(window.location.search);
    const r = (p.get('ref') || '').trim();
    if (!r) return null;
    return r.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '').slice(0, 32) || null;
  } catch (_) { return null; }
}
window.__greekRef = readRef();

/* ─── Inscripción: abre el modal de membresía (JoinModal escucha este evento) ─── */
function openJoin(planId) {
  window.dispatchEvent(new CustomEvent('gs:join', { detail: { plan: planId || null } }));
}
window.__openJoin = openJoin;

function slugifyName(name) {
  return (name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '').slice(0, 32);
}
window.__slugifyName = slugifyName;

function RefBanner() {
  const ref = window.__greekRef;
  if (!ref) return null;
  return (
    <div className="refbanner">
      <span className="refbanner__dia" />
      <span>Entraste por recomendación de <strong>{ref}</strong> · tienes <strong>25%</strong> en tu primer servicio</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   A · ATHENA RESERVE HERO — Tarjeta 3D dorada estilo Centurion
   ════════════════════════════════════════════════════════════ */

const AR_BENEFITS = [
  'Créditos mensuales para servicios',
  'Créditos compartibles con tu familia',
  '15% en servicios fuera de créditos · 10% en productos',
  'Greek Glow — regalo mensual: maquillaje o ritual facial (Signature & Black)',
  'Prioridad de agenda y atención',
  'Regalos exclusivos y beneficios de cumpleaños',
  'Invitaciones privadas a eventos',
  'Recompensas por referidos',
];

function MembershipCard({ variant = 'gold', tier, number = '0001', credits = '', stageless = false }) {
  const stageRef = React.useRef(null);
  const cardRef = React.useRef(null);

  /* Mouse parallax: tilt the card based on cursor position over the stage.
     We write to CSS variables so the transform stays composable. */
  React.useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;

    let raf = 0;
    let target = { rx: 0, ry: 0, gx: 50, gy: 30 };

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;   // 0..1
      const y = (e.clientY - r.top)  / r.height;  // 0..1
      // tilt ranges: -10..10 deg
      target = {
        rx: (0.5 - y) * 14,            // up = positive rotateX
        ry: (x - 0.5) * 22,            // right = positive rotateY
        gx: x * 100,                   // sheen position
        gy: y * 100,
      };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      target = { rx: 0, ry: 0, gx: 50, gy: 30 };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      card.style.setProperty('--rx', target.ry.toFixed(2) + 'deg');  // mouse-X → rotateY
      card.style.setProperty('--ry', (-target.rx).toFixed(2) + 'deg'); // mouse-Y → rotateX (inverted)
      card.style.setProperty('--gx', target.gx + '%');
      card.style.setProperty('--gy', target.gy + '%');
    };

    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={stageRef} className={'ar-card-stage ar-card-stage--' + variant + (stageless ? ' ar-card-stage--mini' : '')} aria-hidden="true">
      <div ref={cardRef} className={'ar-card ar-card--' + variant}>
        <div className="ar-card__face">
          {/* layered surfaces */}
          <div className="ar-card__metal" />
          <div className="ar-card__brush" />
          <div className="ar-card__sheen" />
          <div className="ar-card__bevel" />

          {/* engraved content */}
          <div className="ar-card__top">
            <img className="ar-card__crest" src="assets/column-bronze.png" alt="" />
            <span className="ar-card__corner">{tier ? tier.toUpperCase() : 'MEMBER · EST. 2025'}</span>
          </div>

          <div className="ar-card__center">
            <span className="ar-card__brand">Athena Reserve</span>
            <span className="ar-card__sub">PRIVATE BEAUTY MEMBERSHIP</span>
            {credits && <span className="ar-card__credits">{credits}</span>}
          </div>

          <div className="ar-card__bottom">
            <div className="ar-card__field">
              <span className="ar-card__lab">Member N°</span>
              <span className="ar-card__val">GS · ATHENA · {number}</span>
            </div>
            <div className="ar-card__qr" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </div>
      {!stageless && <span className="ar-card__hint">Pasa el cursor sobre la tarjeta</span>}
    </div>
  );
}

/* Teaser compacto — aparece justo después del Hero, enlaza a la membresía */
function AthenaTeaser() {
  const { ArrowUpRight } = Lucide;
  return (
    <section className="sec ar-teaser">
      <div className="ar-teaser__inner">
        <div className="ar-teaser__copy">
          <Reveal><p className="gs-eyebrow gs-eyebrow--light">La Membresía Privada</p></Reveal>
          <Reveal delay={0.05}><h2 className="ar-teaser__title">Athena Reserve</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="ar-teaser__lead">
              Convierte tus visitas en una experiencia exclusiva: créditos mensuales,
              prioridad de agenda y recompensas por tu fidelidad.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <a className="ar-teaser__cta" href="#athena-reserve">
              <span>Conoce la membresía</span>
              <ArrowUpRight size={17} strokeWidth={1.4} />
            </a>
          </Reveal>
        </div>
        <div className="ar-teaser__card">
          <Reveal delay={0.08} amount={0.2}>
            <MembershipCard variant="gold" tier="Signature" number="0001" stageless={true} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AthenaIntro() {
  const { ArrowUpRight } = Lucide;
  return (
    <section id="athena-reserve" className="sec sec--ar-hero">
      <div className="ar-bg" aria-hidden="true">
        <div className="ar-bg__glow ar-bg__glow--top" />
        <div className="ar-bg__glow ar-bg__glow--bottom" />
        <div className="ar-bg__grain" />
      </div>

      <div className="ar-grid">
        <div className="ar-copy">
          <Reveal><p className="gs-eyebrow gs-eyebrow--light ar-eyebrow">La Membresía Privada</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="ar-headline">
              <em>Athena</em>
              <em>Reserve</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="ar-rule"><span /></Reveal>
          <Reveal delay={0.12}>
            <p className="ar-lead">La primera membresía de belleza premium de Maracaibo.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="ar-body">
              Convierte tus visitas al salón en una experiencia exclusiva. Recibe créditos
              mensuales para tus servicios favoritos, beneficios reservados para miembros,
              recompensas por tu fidelidad y privilegios especiales para compartir con quienes
              invites.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="ar-founder">
            <span className="ar-founder__dia" />
            <span>Forma parte de un <strong>club exclusivo de belleza</strong></span>
          </Reveal>

          <ul className="ar-benefits">
            {AR_BENEFITS.map((b, i) => (
              <Reveal key={b} as="li" delay={0.18 + i * 0.04} amount={0.2} className="ar-benefit">
                <span className="ar-benefit__dia" />
                <span>{b}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.36}>
            <a className="ar-cta" href="#planes">
              <span>Quiero pertenecer</span>
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </a>
          </Reveal>
        </div>

        <div className="ar-cardcol">
          <Reveal delay={0.08} amount={0.1}>
            <MembershipCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   B · PLANES (toggle Mensual/Anual) — contenidos actualizados
   ════════════════════════════════════════════════════════════ */
const PLANS = [
  {
    id: 'essentials', name: 'Essentials', tier: 'Essentials', variant: 'silver',
    tagline: 'Tu entrada al club',
    monthly: 25, yearly: 250, save: 50,
    credits: 3, creditLine: '3 créditos al mes',
    perks: [
      '3 créditos al mes para tus servicios',
      '15% en servicios fuera de créditos · 10% en productos',
      'Créditos compartibles con tu familia',
      'Tarjeta digital de miembro + Greek Rewards + Referidos',
    ],
    profiles: [
      { who: 'Para ella', items: '1 combo manos + pies · 1 diseño de cejas' },
      { who: 'Para él',  items: '1 corte + barba · 1 perfilado de barba' },
    ],
    savingLine: 'Por separado pagarías ~$32 → con Essentials, $25',
    cta: 'Unirme a Essentials',
  },
  {
    id: 'signature', name: 'Signature', tier: 'Signature', variant: 'gold', featured: true,
    badge: 'El más elegido',
    tagline: 'El equilibrio perfecto',
    monthly: 45, yearly: 450, save: 90,
    credits: 6, creditLine: '6 créditos al mes',
    perks: [
      '6 créditos al mes para tus servicios',
      'Greek Glow de REGALO al mes: maquillaje social (él: ritual facial)',
      'Prioridad de agenda sobre no-miembros',
      '15% en servicios fuera de créditos · 10% en productos',
      'Créditos compartibles + regalos exclusivos',
    ],
    profiles: [
      { who: 'Para ella', items: '2 combos de uñas · 2 secados' },
      { who: 'Para él',  items: '3 combos de corte + barba' },
    ],
    savingLine: 'Por separado pagarías ~$64 → con Signature, $45 + tu regalo Greek Glow',
    cta: 'Unirme a Signature',
  },
  {
    id: 'black', name: 'Black', tier: 'Black', variant: 'black', dark: true,
    badge: 'BLACK',
    tagline: 'El club privado',
    monthly: 85, yearly: 850, save: 170,
    credits: 12, creditLine: '12 créditos al mes',
    perks: [
      '12 créditos al mes para tus servicios',
      'Glam de evento cada mes: maquillaje + peinado (él: ritual facial + arreglo ejecutivo)',
      'MÁXIMA prioridad de agenda y atención',
      '15% en servicios fuera de créditos · 10% en productos',
      'Créditos compartibles + regalos premium',
    ],
    profiles: [
      { who: 'Para ella', items: 'keratina · 2 manicuras · cejas · 2 secados' },
      { who: 'Para él',  items: '5 cortes · 4 barbas · 1 manicura' },
    ],
    savingLine: 'Por separado pagarías ~$110 → con Black, $85 + tu glam de evento',
    cta: 'Unirme a Black',
  },
];

function Plans() {
  const { Check, ArrowRight } = Lucide;
  const [billing, setBilling] = React.useState('monthly');

  return (
    <section id="planes" className="sec sec--center sec--plans">
      <Reveal><p className="gs-eyebrow">Los Niveles</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Elige tu nivel</h2></Reveal>
      <Reveal delay={0.1}><p className="sec__lead sec__lead--narrow">Tres niveles diseñados para distintas frecuencias de visita. Cambia o cancela cuando quieras.</p></Reveal>

      <RefBanner />

      <Reveal delay={0.14} className="bill">
        <button className={'bill__opt' + (billing === 'monthly' ? ' is-on' : '')} onClick={() => setBilling('monthly')} aria-pressed={billing === 'monthly'}>Mensual</button>
        <button className={'bill__opt' + (billing === 'yearly' ? ' is-on' : '')} onClick={() => setBilling('yearly')} aria-pressed={billing === 'yearly'}>Anual <em>· 2 meses gratis</em></button>
      </Reveal>

      <div className="plans">
        {PLANS.map((p, i) => {
          const isYearly = billing === 'yearly';
          const price = isYearly ? p.yearly : p.monthly;
          const cadence = isYearly ? '/ año' : '/ mes';
          return (
            <Reveal key={p.id} delay={0.05 * i} amount={0.15}
              className={'plan' + (p.featured ? ' plan--featured' : '') + (p.dark ? ' plan--dark' : '')}>
              {p.badge && <span className={'plan__badge' + (p.dark ? ' plan__badge--black' : '')}>{p.badge}</span>}

              {/* tarjeta digital del nivel — plata / oro / negra */}
              <div className="plan__cardwrap">
                <MembershipCard
                  variant={p.variant}
                  tier={p.tier}
                  number={'00' + (i + 1).toString().padStart(2, '0')}
                  credits={p.creditLine}
                  stageless={true}
                />
              </div>

              <h3 className="plan__name">{p.name}</h3>
              {p.tagline && <p className="plan__tagline">{p.tagline}</p>}

              <div className="plan__price">
                <span className="plan__currency">$</span>
                <span className="plan__amt">{price}</span>
                <span className="plan__cadence">{cadence}</span>
              </div>
              {isYearly && (<p className="plan__save">2 meses gratis · ahorras ${p.save}</p>)}
              <p className="plan__credits">{p.creditLine}</p>
              <span className="plan__hr" />

              <ul className="plan__perks">
                {p.perks.map(perk => (<li key={perk}><Check size={14} strokeWidth={2.2} /><span>{perk}</span></li>))}
              </ul>

              {/* perfil ideal: él + ella */}
              {p.profiles && (
                <div className="plan__profiles">
                  {p.profiles.map(pf => (
                    <div key={pf.who} className="plan__profile">
                      <span className="plan__profile-who">{pf.who}</span>
                      <span className="plan__profile-it">{pf.items}</span>
                    </div>
                  ))}
                </div>
              )}

              {p.savingLine && (
                <p className="plan__saving-line">{p.savingLine}</p>
              )}

              <button className={'gs-btn ' + (p.dark ? 'gs-btn--gold-on-dark' : (p.featured ? 'gs-btn--primary' : 'gs-btn--ghost')) + ' plan__cta'}
                 type="button" onClick={() => openJoin(p.id)}>
                <span>{p.cta}</span><ArrowRight size={15} strokeWidth={1.6} />
              </button>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="plans__note">
        <p>Tus créditos se recargan cada mes. En el plan anual pagas 10 meses y recibes 12. Puedes cambiar o cancelar tu plan cuando quieras.</p>
      </Reveal>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   C · CÓMO FUNCIONAN LOS CRÉDITOS — menú unisex (1 crédito = $10)
   ════════════════════════════════════════════════════════════ */
const CREDIT_STEPS = [
  { n: '01', t: 'Eliges tu nivel', s: 'Recibes tus créditos cada mes según el plan que elijas.' },
  { n: '02', t: 'Canjeas créditos', s: '1 crédito = $10 de servicio. Tú eliges qué te haces, cuando quieras.' },
  { n: '03', t: 'Comparte y suma', s: 'Compartibles con tu familia. Y cada visita suma para Greek Rewards.' },
];

const CREDIT_SERVICES = {
  ella: [
    ['Diseño / depilación de cejas', 1],
    ['Depilación facial (bozo, mentón)', 1],
    ['Secado / blowout', 1],
    ['Manicura tradicional / semipermanente', 1],
    ['Manicura gel · gelish · rubber', 2],
    ['Pedicura gel', 2],
    ['Acrílico / Polygel', 2],
    ['Mani rubber + pedi gelish', 2],
    ['Pestañas pelo a pelo', 3],
    ['Keratina (según largo)', 5],
    ['Tinte completo', 6],
  ],
  el: [
    ['Perfilado de barba', 1],
    ['Depilación (cejas / facial)', 1],
    ['Corte de caballero', 2],
    ['Corte + barba', 2],
    ['Manicura caballero', 2],
    ['Ritual facial purificante', 2],
  ],
};

function Credits() {
  const [tab, setTab] = React.useState('ella');
  const list = CREDIT_SERVICES[tab];
  return (
    <section id="creditos" className="sec sec--center sec--raised">
      <Reveal><p className="gs-eyebrow">Cómo Funciona</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">¿Cómo funcionan<br />los créditos?</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="sec__lead sec__lead--narrow">
          1 crédito equivale a <strong>$10 de servicio</strong>. Tú eliges qué te haces — lo que cuesta más, lo completas con tu 15% de miembro.
        </p>
      </Reveal>

      <div className="csteps">
        {CREDIT_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={0.05 * i} amount={0.2} className="cstep">
            <span className="cstep__n">{s.n}</span>
            <h3 className="cstep__t">{s.t}</h3>
            <p className="cstep__s">{s.s}</p>
          </Reveal>
        ))}
      </div>

      {/* Tabs Para ella / Para él — controlan los ejemplos y la tabla */}
      <Reveal delay={0.08} amount={0.3} className="ctabs ctabs--center" role="tablist">
        <button role="tab" aria-selected={tab === 'ella'} onClick={() => setTab('ella')} className={'ctabs__opt' + (tab === 'ella' ? ' is-on' : '')}>Para ella</button>
        <button role="tab" aria-selected={tab === 'el'}   onClick={() => setTab('el')}   className={'ctabs__opt' + (tab === 'el' ? ' is-on' : '')}>Para él</button>
      </Reveal>

      {/* Mini-ejemplos: qué puedes hacer con los créditos de cada plan (siguen el tab ella/él) */}
      <Reveal delay={0.1} amount={0.2} className="cex">
        <p className="cex__title">Por ejemplo, cada mes puedes hacerte…</p>
        <div className="cex__grid">
          {(tab === 'ella' ? [
            { tier: 'Essentials', n: 3, items: '1 manicura gel + diseño de cejas' },
            { tier: 'Signature', n: 6, items: '2 manicuras gel + 2 secados', featured: true },
            { tier: 'Black', n: 12, items: 'Keratina + 2 manicuras + 2 secados + cejas' },
          ] : [
            { tier: 'Essentials', n: 3, items: '1 corte + barba y 1 perfilado' },
            { tier: 'Signature', n: 6, items: '3 combos de corte + barba', featured: true },
            { tier: 'Black', n: 12, items: '5 cortes + 4 barbas + 1 manicura' },
          ]).map(ex => (
            <div key={ex.tier} className={'cex__card' + (ex.featured ? ' cex__card--on' : '')}>
              <span className="cex__tier">{ex.tier}</span>
              <span className="cex__credits">{ex.n} créditos</span>
              <span className="cex__eq">=</span>
              <span className="cex__items">{ex.items}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} amount={0.15} className="ctable">
        <p className="ctable__title">Cuánto cuesta cada servicio en créditos</p>

        <ul className="ctable__list">
          {list.map(([name, n]) => (
            <li key={name} className="ctable__row">
              <span className="ctable__name">{name}</span>
              <span className="ctable__dots" />
              <span className="ctable__cost">{n} <em>{n === 1 ? 'crédito' : 'créditos'}</em></span>
            </li>
          ))}
        </ul>

        <div className="ctable__notes">
          <p>Tus créditos se renuevan cada mes (te avisamos antes de que venzan).</p>
          <p>¿Un servicio cuesta más créditos de los que tienes? Pagas solo la diferencia a precio de miembro, con tu 15% incluido.</p>
          <p>Compártelos con tu familia o pareja — para ella y para él: la belleza se disfruta en familia y nada se desperdicia.</p>
        </div>
      </Reveal>

      {/* Tabla “El ahorro real” */}
      <Reveal delay={0.1} amount={0.15} className="savings">
        <p className="savings__title">El ahorro real</p>
        <p className="savings__sub">Lo que pagarías servicio por servicio, comparado con lo que pagas siendo miembro.</p>
        <table className="savings__table">
          <thead>
            <tr><th>Tu rutina al mes</th><th>Por separado</th><th>Con tu plan</th><th>Ahorras</th></tr>
          </thead>
          <tbody>
            <tr><td data-label="Rutina">1 combo de uñas + cejas</td><td data-label="Por separado">$32</td><td data-label="Con plan">Essentials $25</td><td data-label="Ahorras">$7</td></tr>
            <tr><td data-label="Rutina">3 secados</td><td data-label="Por separado">$30</td><td data-label="Con plan">Essentials $25</td><td data-label="Ahorras">$5</td></tr>
            <tr><td data-label="Rutina">Caballero: 1 corte + barba y 1 perfilado</td><td data-label="Por separado">$32</td><td data-label="Con plan">Essentials $25</td><td data-label="Ahorras">$7</td></tr>
            <tr><td data-label="Rutina">2 combos de uñas + 2 secados</td><td data-label="Por separado">$64</td><td data-label="Con plan">Signature $45</td><td data-label="Ahorras">$19 + maquillaje</td></tr>
            <tr><td data-label="Rutina">Caballero: 3 combos de corte + barba</td><td data-label="Por separado">$66</td><td data-label="Con plan">Signature $45</td><td data-label="Ahorras">$21 + ritual facial</td></tr>
            <tr><td data-label="Rutina">Keratina + 2 manicuras + cejas + 2 secados</td><td data-label="Por separado">$110</td><td data-label="Con plan">Black $85</td><td data-label="Ahorras">$25 + glam de evento</td></tr>
          </tbody>
        </table>
        <p className="savings__note">
          “Y eso es solo el ahorro en dólares. Los regalos, la prioridad y los premios… no tienen precio.”
        </p>
      </Reveal>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   H · JOIN MODAL — qué pasa al hacer clic en "Unirme"
   Recoge nombre + para quién + facturación y abre WhatsApp con
   todo prearmado (plan, precio, ref de embajador). Sin backend.
   ════════════════════════════════════════════════════════════ */
function JoinModal() {
  const { X, ArrowRight, MessageCircle } = Lucide;
  const [open, setOpen] = React.useState(false);
  const [planId, setPlanId] = React.useState('signature');
  const [billing, setBilling] = React.useState('monthly');
  const [who, setWho] = React.useState('ella');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const onJoin = (e) => {
      if (e.detail && e.detail.plan) setPlanId(e.detail.plan);
      setOpen(true);
    };
    window.addEventListener('gs:join', onJoin);
    return () => window.removeEventListener('gs:join', onJoin);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const plan = PLANS.find(p => p.id === planId) || PLANS[1];
  const isYearly = billing === 'yearly';
  const price = isYearly ? plan.yearly : plan.monthly;
  const ref = window.__greekRef;

  const waText = encodeURIComponent(
    'Hola Greek Studio, quiero unirme a Athena Reserve.\n' +
    '• Plan: ' + plan.name + ' (' + (isYearly ? 'anual $' + plan.yearly : 'mensual $' + plan.monthly) + ')\n' +
    '• Para: ' + (who === 'ella' ? 'ella' : 'él') + '\n' +
    (name ? '• Nombre: ' + name + '\n' : '') +
    (ref ? '• Vengo recomendado por: ' + ref + '\n' : '') +
    '¿Me comparten los datos de pago (Pago Móvil / Binance) para completar mi inscripción?'
  );
  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waText;

  return (
    <div className="jm" role="dialog" aria-modal="true" aria-label="Inscripción Athena Reserve">
      <div className="jm__backdrop" onClick={() => setOpen(false)} />
      <div className="jm__panel">
        <button className="jm__close" onClick={() => setOpen(false)} aria-label="Cerrar">
          <X size={18} strokeWidth={1.6} />
        </button>

        <p className="jm__eyebrow">Athena Reserve</p>
        <h3 className="jm__title">Solicita tu membresía</h3>

        {/* Selector de plan */}
        <div className="jm__plans">
          {PLANS.map(p => (
            <button key={p.id} type="button"
              className={'jm__plan' + (p.id === plan.id ? ' is-on' : '') + (p.dark ? ' jm__plan--dark' : '')}
              onClick={() => setPlanId(p.id)}>
              <span className="jm__plan-name">{p.name}</span>
              <span className="jm__plan-price">${isYearly ? p.yearly : p.monthly}<em>{isYearly ? '/año' : '/mes'}</em></span>
            </button>
          ))}
        </div>

        {/* Facturación */}
        <div className="jm__row">
          <span className="jm__lab">Facturación</span>
          <div className="jm__seg">
            <button type="button" className={billing === 'monthly' ? 'is-on' : ''} onClick={() => setBilling('monthly')}>Mensual</button>
            <button type="button" className={billing === 'yearly' ? 'is-on' : ''} onClick={() => setBilling('yearly')}>Anual · 2 meses gratis</button>
          </div>
        </div>

        {/* Para quién */}
        <div className="jm__row">
          <span className="jm__lab">La membresía es</span>
          <div className="jm__seg">
            <button type="button" className={who === 'ella' ? 'is-on' : ''} onClick={() => setWho('ella')}>Para ella</button>
            <button type="button" className={who === 'el' ? 'is-on' : ''} onClick={() => setWho('el')}>Para él</button>
          </div>
        </div>

        {/* Nombre */}
        <div className="jm__row jm__row--field">
          <span className="jm__lab">Tu nombre</span>
          <input className="inp jm__input" type="text" value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" />
        </div>

        {ref && (
          <p className="jm__ref">Recomendación de <strong>{ref}</strong> — 25% en tu primer servicio.</p>
        )}

        <a className="gs-btn gs-btn--primary jm__cta" href={waHref} target="_blank" rel="noopener">
          <MessageCircle size={16} strokeWidth={1.6} />
          <span>Completar por WhatsApp · ${price}{isYearly ? '/año' : '/mes'}</span>
          <ArrowRight size={15} strokeWidth={1.6} />
        </a>
        <p className="jm__note">
          Te atendemos personalmente: por WhatsApp recibes los datos de pago
          (Pago Móvil o Binance) y tu tarjeta digital de miembro el mismo día.
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   I · BARRA CTA MÓVIL — siempre a un toque de WhatsApp y el Club
   ════════════════════════════════════════════════════════════ */
function MobileCTABar() {
  const { MessageCircle } = Lucide;
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
    encodeURIComponent('Hola Greek Studio, quiero reservar una experiencia.');

  return (
    <div className={'mcta' + (show ? ' is-on' : '')} aria-hidden={!show}>
      <a className="mcta__wa" href={waHref} target="_blank" rel="noopener">
        <MessageCircle size={17} strokeWidth={1.7} />
        <span>WhatsApp</span>
      </a>
      <button className="mcta__join" type="button" onClick={() => openJoin(null)}>
        <span>Únete al Club</span>
      </button>
    </div>
  );
}

Object.assign(window, { AthenaTeaser, AthenaIntro, MembershipCard, Plans, Credits, RefBanner, JoinModal, MobileCTABar, WHATSAPP_NUMBER });
