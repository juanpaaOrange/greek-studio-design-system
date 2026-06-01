/* global React, Lucide */

const ATHENA_SYSTEM = `Eres ATHENA, la concierge virtual de Greek Studio Beauty Salon ("El Templo de la Belleza"), un salón de belleza de lujo en Maracaibo, Venezuela. Inspirado en la Antigua Grecia y en Afrodita: belleza clásica, lujo silencioso y sofisticación moderna.

TONO: elegante, profesional, cálida, hospitalaria. Trato de usted o cercano pero refinado. Respuestas BREVES (2-4 frases). Español. Usa vocabulario de marca: experiencia, ritual, cortesía, reservar (nunca "servicio barato", precios agresivos ni emojis).

SERVICIOS:
• Cabello: corte ejecutivo, color/balayage, hidratación Olaplex, keratina orgánica & alisado vegano.
• Manos & Pies: manicura premium (rubber & gelish), pedicura ritual con veloterapia, extensiones & arte.
• Mirada: extensión y lifting de pestañas; diseño, laminado y pigmentado de cejas.
• Barbería Ejecutiva: corte caballero, perfilado de barba, ritual facial purificante.
Cada experiencia incluye cortesías: bebida de bienvenida, hidratación capilar, veloterapia y mascarilla.

PRECIOS: las tarifas se comparten en consulta privada. No inventes cifras; invita amablemente a reservar para una cotización personalizada.
HORARIO: Lunes a Sábado de 9:00 a 18:00. Domingos solo con cita reservada con al menos 3 días de anticipación.
UBICACIÓN: Av. Universidad, local 9B, Maracaibo, Estado Zulia. Tel +58 0186964. Instagram @greekstudiomcbo.
RESERVAS: anima a usar la sección "Reserva tu Experiencia" de la página o WhatsApp.
Si preguntan algo fuera de tu alcance, ofrece contactar al salón. Nunca inventes datos.`;

function Athena() {
  const { MessageCircle, X, Send } = Lucide;
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([
    { role: 'assistant', content: 'Bienvenida a Greek Studio. Soy Athena, tu concierge. ¿Cómo puedo asistirte con tu experiencia de belleza hoy?' },
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scroller = React.useRef(null);

  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [msgs, busy, open]);

  const suggestions = ['¿Qué experiencias ofrecen?', '¿Cómo reservo una cita?', '¿Dónde están ubicados?'];

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: 'user', content: q }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    try {
      const convo = next.map(m => (m.role === 'user' ? 'Cliente' : 'Athena') + ': ' + m.content).join('\n');
      const prompt = ATHENA_SYSTEM + '\n\n' + convo + '\nAthena:';
      const reply = await window.claude.complete(prompt);
      setMsgs([...next, { role: 'assistant', content: (reply || '').trim() || 'Con gusto te ayudo. ¿Podrías contarme un poco más?' }]);
    } catch (_) {
      setMsgs([...next, { role: 'assistant', content: 'Disculpa, en este momento no puedo responder. Escríbenos por WhatsApp al +58 0186964 y con gusto te atendemos.' }]);
    } finally {
      setBusy(false);
    }
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
