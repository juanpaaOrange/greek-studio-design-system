/* global React, Lucide */

/* ════════════════ F · CÓMO UNIRTE (4 pasos) ════════════════ */
const STEPS = [
  { n: '01', t: 'Elige tu nivel', s: 'Essentials, Signature o Black. Mensual o anual.' },
  { n: '02', t: 'Escríbenos por WhatsApp', s: 'El botón de tu plan abre el chat con todo prearmado.' },
  { n: '03', t: 'Paga por Pago Móvil o Binance', s: 'Te enviamos los datos y confirmas con tu comprobante.' },
  { n: '04', t: 'Recibe tu tarjeta digital', s: 'Tarjeta Athena Reserve el mismo día. Bienvenido/a al club.' },
];

function HowToJoin() {
  return (
    <section id="como-unirte" className="sec sec--center sec--join">
      <Reveal><p className="gs-eyebrow">El Camino</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Cómo unirte</h2></Reveal>
      <Reveal delay={0.1}><p className="sec__lead sec__lead--narrow">Por ahora la inscripción es manual: simple, personal, y siempre acompañada por nuestro equipo.</p></Reveal>

      <div className="join">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={0.05 * i} amount={0.2} className="join__step">
            <span className="join__n">{s.n}</span>
            <h3 className="join__t">{s.t}</h3>
            <p className="join__s">{s.s}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05}>
        {/* Botón final — abre el modal de inscripción (conserva el ?ref de embajador) */}
        <button className="gs-btn gs-btn--primary join__cta" type="button"
           onClick={() => window.__openJoin && window.__openJoin(null)}>
          <span>Quiero pertenecer</span>
        </button>
      </Reveal>
    </section>
  );
}

/* ════════════════ G · FAQ (acordeón) ════════════════ */
const FAQS = [
  { q: '¿Qué es Athena Reserve?', a: 'La membresía privada de Greek Studio. Pagas una cuota mensual o anual y recibes créditos para canjear por servicios, además de beneficios exclusivos.' },
  { q: '¿Qué son los créditos?', a: 'Tu saldo mensual para canjear por servicios. Cada servicio tiene un costo en créditos (entre 1 y 6) — 1 crédito equivale a $10 de servicio.' },
  { q: '¿La membresía es solo para mujeres?', a: 'No. Athena Reserve es para ella y para él: el menú de créditos incluye barbería ejecutiva (corte, barba, manicura caballero y ritual facial), y los regalos mensuales tienen su versión para caballeros.' },
  { q: '¿Los créditos se acumulan?', a: 'No, se renuevan cada mes; aprovéchalos a tiempo. Te avisamos 5 días antes del cierre del ciclo.' },
  { q: '¿Y si un servicio cuesta más créditos de los que tengo?', a: 'Pagas la diferencia a precio de miembro. Nunca te quedas sin tu cita.' },
  { q: '¿El programa de referidos es solo para miembros?', a: 'No, es para todos. Cualquier cliente puede generar su enlace personal y ganar premios.' },
  { q: '¿Cómo pago?', a: 'Por ahora Pago Móvil o Binance; pronto integraremos pago automático con tarjeta.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí, sin penalidad. Cambias o cancelas tu plan cuando lo necesites.' },
];

function FAQ() {
  const { Plus, Minus } = Lucide;
  const [open, setOpen] = React.useState(0); // primero abierto por defecto

  return (
    <section id="faq" className="sec sec--center sec--faq">
      <Reveal><p className="gs-eyebrow">Preguntas</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Resolvemos tus dudas</h2></Reveal>

      <Reveal delay={0.1} amount={0.15} className="faq">
        {FAQS.map((item, i) => {
          const isOpen = i === open;
          return (
            <div key={item.q} className={'faq__item' + (isOpen ? ' is-open' : '')}>
              <button
                className="faq__q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="faq__ic">{isOpen ? <Minus size={16} strokeWidth={1.6} /> : <Plus size={16} strokeWidth={1.6} />}</span>
              </button>
              <div className="faq__a" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}

Object.assign(window, { HowToJoin, FAQ });
