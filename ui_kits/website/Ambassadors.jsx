/* global React, Lucide */

/* ════════════════ E · EMBAJADORAS GREEK ════════════════
   Programa de referidos abierto a todos + Generador de enlace.
   100% del lado del cliente. Sin backend.
   ════════════════════════════════════════════════════════ */

const BENEFITS = [
  {
    role: 'QUIEN INVITAS RECIBE',
    headline: '25% en su primer servicio',
    detail: 'O un servicio cortesía: diseño de cejas o secado.',
  },
  {
    role: 'TÚ RECIBES',
    headline: 'Servicio de cabello gratis · o descuento',
    detail: 'Por cada persona que invites y asista: un servicio de cabello de cortesía o un descuento en tu próxima visita. Si eres miembro, además 1 crédito extra.',
    featured: true,
  },
  {
    role: 'BONO EXTRA',
    headline: '3 invitados que se hacen miembros → 1 mes gratis',
    detail: 'O una keratina orgánica. Premiamos a quien más comparte.',
  },
];

function Embajadoras() {
  const { Copy, Check, MessageCircle, Gift } = Lucide;

  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('');     // slug generado
  const [link, setLink] = React.useState('');     // URL completa de referido
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef(null);

  /* Generar el enlace de embajadora */
  const generate = (e) => {
    if (e) e.preventDefault();
    const slug = window.__slugifyName(name);
    if (!slug) {
      // resaltar campo si no hay nombre válido
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setCode(slug);
    // URL base = origin + pathname actual de la página
    const base = window.location.origin + window.location.pathname;
    setLink(base + '?ref=' + slug);
    setCopied(false);
  };

  /* Copiar al portapapeles */
  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
    } catch (_) {
      // fallback
      const t = document.createElement('textarea');
      t.value = link; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  /* Compartir por WhatsApp con mensaje pre-escrito */
  const waHref = (() => {
    if (!link) return '#';
    const msg =
      'Hola, te recomiendo Greek Studio y su membresía Athena Reserve — ' +
      'el club de belleza con créditos y premios en Maracaibo, para ella y para él. ' +
      'Entra con mi enlace y tienes 25% en tu primer servicio: ' + link;
    return 'https://wa.me/?text=' + encodeURIComponent(msg);
  })();

  return (
    <section id="embajadoras" className="sec sec--center sec--ambassadors">
      <Reveal><p className="gs-eyebrow">Referidos</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Recomienda y Gana</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="sec__lead sec__lead--narrow">
          "Cuando alguien te recomienda, vale más que cualquier publicidad.
          Por eso en Greek, recomendar tiene premio para ambos."
        </p>
      </Reveal>

      {/* 3 bloques de beneficios */}
      <div className="amb__grid">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.role} delay={0.05 * i} amount={0.2}
            className={'amb__card' + (b.featured ? ' amb__card--featured' : '')}>
            <span className="amb__role">{b.role}</span>
            <h3 className="amb__head">{b.headline}</h3>
            <p className="amb__detail">{b.detail}</p>
          </Reveal>
        ))}
      </div>

      {/* Generador de enlace */}
      <Reveal delay={0.05} amount={0.15} className="reflink">
        <div className="reflink__head">
          <span className="reflink__ic"><Gift size={18} strokeWidth={1.5} /></span>
          <div>
            <p className="reflink__title">Genera tu enlace personal</p>
            <p className="reflink__sub">Compártelo con quien quieras. Cuando entran por tu enlace y agendan, ambos ganan.</p>
          </div>
        </div>

        <form className="reflink__form" onSubmit={generate}>
          <input
            ref={inputRef}
            className="inp reflink__input"
            type="text"
            placeholder="Escribe tu nombre (ej. Alex)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Tu nombre"
          />
          <button className="gs-btn gs-btn--primary reflink__gen" type="submit">
            <span>Generar mi enlace</span>
          </button>
        </form>

        {link && (
          <div className="reflink__result">
            <div className="reflink__box">
              <span className="reflink__label">Tu enlace</span>
              <span className="reflink__url" title={link}>{link}</span>
              <button className="reflink__copy" onClick={copy} type="button" aria-label="Copiar enlace">
                {copied
                  ? <><Check size={14} strokeWidth={2} /><span>Copiado</span></>
                  : <><Copy size={14} strokeWidth={1.6} /><span>Copiar</span></>}
              </button>
            </div>
            <a className="gs-btn reflink__wa" href={waHref} target="_blank" rel="noopener">
              <MessageCircle size={16} strokeWidth={1.6} />
              <span>Compartir por WhatsApp</span>
            </a>
            <p className="reflink__hint">
              Tu código personal: <strong>{code}</strong>. Cuando alguien entra con tu enlace
              y se inscribe, tu nombre llega automáticamente en su mensaje de WhatsApp —
              así registramos tu premio. Menciónalo también al llegar al salón.
            </p>
          </div>
        )}
      </Reveal>
    </section>
  );
}

Object.assign(window, { Embajadoras });
