/* global React, Lucide */

/* ════════════════════════════════════════════════════════════
   ATHENA — concierge por reglas (sin API, sin costo, funciona
   en cualquier hosting). Responde con la información oficial
   del salón; lo que no sabe, lo deriva a WhatsApp.
   Para conectarla a Claude API más adelante: ver MAINTENANCE.md
   ════════════════════════════════════════════════════════════ */

const ATHENA_PHONE = (window.GS_CONFIG && window.GS_CONFIG.phoneDisplay) || '+58 422-018-6946';
const ATHENA_WA = 'https://wa.me/' + ((window.GS_CONFIG && window.GS_CONFIG.whatsapp) || '584220186946');

/* Cada intención: palabras clave (sin acentos, minúsculas) + respuesta */
const ATHENA_INTENTS = [
  {
    k: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey'],
    r: 'Bienvenido/a a Greek Studio, El Templo de la Belleza. ¿Te ayudo con nuestras experiencias, la membresía Athena Reserve o una reserva?',
  },
  {
    k: ['servicio', 'experiencia', 'ofrecen', 'hacen', 'tratamiento', 'carta', 'menu'],
    r: 'Nuestras experiencias: Cabello (corte ejecutivo, color y balayage, keratina orgánica), Manos & Pies (manicura premium, pedicura ritual), Mirada (pestañas y cejas) y Barbería Ejecutiva para caballeros. Cada visita incluye cortesías de bienvenida. Puedes reservar en la sección "Reserva tu Experiencia".',
  },
  {
    k: ['hombre', 'caballero', 'barba', 'barberia', 'corte de caballero', 'masculino', 'para el'],
    r: 'Nuestra Barbería Ejecutiva atiende al caballero con corte, perfilado de barba, manicura y ritual facial purificante. La membresía Athena Reserve también tiene planes pensados para él — por ejemplo, Signature equivale a 3 combos de corte + barba al mes.',
  },
  {
    k: ['precio', 'costo', 'cuanto cuesta', 'tarifa', 'cuanto vale', 'cobran'],
    r: 'Las tarifas de cada experiencia se comparten en consulta privada por WhatsApp. Lo que sí es público: la membresía Athena Reserve — Essentials $25, Signature $45 y Black $85 al mes, con créditos para tus servicios. ¿Te muestro cómo funciona?',
  },
  {
    k: ['membresia', 'athena reserve', 'plan', 'club', 'suscripcion', 'unirme', 'socio', 'socia', 'essentials', 'signature', 'black'],
    r: 'Athena Reserve es nuestra membresía privada: Essentials $25/mes (3 créditos), Signature $45/mes (6 créditos + regalo Greek Glow) y Black $85/mes (12 créditos + glam de evento). En el plan anual pagas 10 meses y recibes 12. Encuentra los detalles en la sección "Elige tu nivel" — o escríbenos por WhatsApp y te inscribimos hoy.',
  },
  {
    k: ['credito', 'creditos', 'canjear', 'cuantos servicios'],
    r: 'Cada crédito equivale a $10 de servicio: una manicura tradicional o un secado valen 1 crédito; una manicura gel, 2; una keratina, 5. Tus créditos se renuevan cada mes, son compartibles con tu familia, y si un servicio cuesta más, pagas solo la diferencia con tu 15% de miembro.',
  },
  {
    k: ['pago', 'pagar', 'pago movil', 'binance', 'transferencia', 'zelle', 'efectivo', 'tarjeta'],
    r: 'Aceptamos Pago Móvil y Binance para la membresía; al inscribirte por WhatsApp te enviamos los datos y confirmas con tu comprobante. En el salón también puedes pagar tus servicios en efectivo.',
  },
  {
    k: ['horario', 'hora', 'abren', 'cierran', 'domingo', 'abierto'],
    r: 'Te recibimos de lunes a sábado de 9:00 a 18:00. Los domingos atendemos solo con cita reservada con al menos 3 días de anticipación.',
  },
  {
    k: ['ubicacion', 'donde', 'direccion', 'llegar', 'local', 'maracaibo'],
    r: 'Estamos en Av. Universidad, local 9B, Maracaibo, Estado Zulia. Encuentras el mapa al final de la página, en la sección "Visítanos".',
  },
  {
    k: ['reserva', 'reservar', 'cita', 'agendar', 'agenda', 'apartar', 'turno'],
    r: 'Con gusto. Usa la sección "Reserva tu Experiencia" de esta página — eliges servicio, fecha y hora, y tu solicitud llega prearmada a nuestro WhatsApp. Tu cita queda confirmada cuando el equipo te responde.',
  },
  {
    k: ['referido', 'embajador', 'embajadora', 'recomendar', 'invitar', 'enlace', 'link'],
    r: 'Nuestro programa "Recomienda y Gana" es para todos: genera tu enlace personal en la sección de referidos, compártelo, y cuando alguien entra con tu enlace ambos ganan — 25% para tu invitado/a y un servicio de cortesía para ti.',
  },
  {
    k: ['rewards', 'lealtad', 'premio', 'recompensa', 'visitas', 'puntos'],
    r: 'Greek Rewards premia tu lealtad, seas miembro o no: a las 5 visitas recibes un regalo de cortesía, a las 10 una keratina o ritual facial, y a las 20 una experiencia completa Greek Signature o Greek Gentleman. Cada visita cuenta.',
  },
  {
    k: ['instagram', 'redes', 'fotos'],
    r: 'Encuéntranos en Instagram como @greekstudiomcbo — ahí compartimos nuestros trabajos y novedades del club.',
  },
  {
    k: ['gracias', 'perfecto', 'excelente', 'ok', 'listo', 'genial'],
    r: 'Un placer asistirte. Cuando quieras, reserva tu experiencia o escríbenos por WhatsApp — en Greek Studio siempre eres bienvenido/a.',
  },
  {
    k: ['adios', 'chao', 'hasta luego', 'nos vemos'],
    r: 'Hasta pronto. El Templo de la Belleza te espera.',
  },
];

/* Normaliza: minúsculas y sin acentos, para comparar con las keywords */
function athenaNorm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function athenaReply(question) {
  const q = athenaNorm(question);
  let best = null, bestScore = 0;
  for (const intent of ATHENA_INTENTS) {
    let score = 0;
    for (const kw of intent.k) {
      if (q.includes(kw)) score += kw.length; /* keywords más largas pesan más */
    }
    if (score > bestScore) { bestScore = score; best = intent; }
  }
  if (best) return best.r;
  return 'Esa consulta merece atención personal. Escríbenos por WhatsApp al ' + ATHENA_PHONE +
    ' y nuestro equipo te responde en minutos — o pregúntame por servicios, membresía, créditos, horarios o reservas.';
}

function Athena() {
  const { MessageCircle, X, Send } = Lucide;
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([
    { role: 'assistant', content: 'Bienvenido/a a Greek Studio. Soy Athena, tu concierge. ¿Te ayudo con nuestras experiencias, la membresía o una reserva?' },
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scroller = React.useRef(null);

  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [msgs, busy, open]);

  const suggestions = ['¿Cómo funciona la membresía?', '¿Qué experiencias ofrecen?', '¿Cómo reservo una cita?'];

  const send = (text) => {
    const q = (text || input).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: 'user', content: q }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    /* Pequeña pausa para que se sienta conversacional */
    setTimeout(() => {
      setMsgs([...next, { role: 'assistant', content: athenaReply(q) }]);
      setBusy(false);
    }, 600 + Math.random() * 500);
  };

  return (
    <div className="athena">
      <button className={'athena__fab' + (open ? ' is-open' : '')} onClick={() => setOpen(o => !o)} aria-label="Concierge Athena">
        {open ? <X size={20} strokeWidth={1.6} /> : <MessageCircle size={20} strokeWidth={1.6} />}
      </button>

      {open && (
        <div className="athena__panel">
          <header className="athena__head">
            <img src="assets/symbol-bronze.png" alt="" className="athena__mark" />
            <div>
              <p className="athena__name">Athena</p>
              <p className="athena__role">Concierge de Belleza</p>
            </div>
            <span className="athena__dot" />
          </header>

          <div className="athena__body" ref={scroller}>
            {msgs.map((m, i) => (
              <div key={i} className={'athena__msg athena__msg--' + m.role}>{m.content}</div>
            ))}
            {busy && <div className="athena__msg athena__msg--assistant athena__typing"><span></span><span></span><span></span></div>}
            {msgs.length <= 1 && !busy && (
              <div className="athena__sugs">
                {suggestions.map(s => (
                  <button key={s} className="athena__sug" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <form className="athena__input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu mensaje…" aria-label="Mensaje" />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Enviar"><Send size={16} strokeWidth={1.7} /></button>
          </form>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Athena });
