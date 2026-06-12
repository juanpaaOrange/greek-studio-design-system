/* global React, Lucide */

const SERVICES = [
  'Cabello · Corte ejecutivo & secado',
  'Cabello · Color, balayage & luz',
  'Cabello · Keratina & alisado vegano',
  'Manos & Pies · Manicura premium',
  'Manos & Pies · Pedicura ritual',
  'Mirada · Pestañas (extensión / lifting)',
  'Mirada · Cejas (diseño / laminado)',
  'Barbería Ejecutiva',
];
const TIMES = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00'];
const WHATSAPP = (window.GS_CONFIG && window.GS_CONFIG.whatsapp) || '584220186946';

function Field({ label, children }) {
  return (
    <label className="fld">
      <span className="fld__label">{label}</span>
      {children}
    </label>
  );
}

/* ───────────────────────────  BOOKING  ─────────────────────────── */
function Booking() {
  const { Calendar, Clock, ArrowRight, Check, MessageCircle } = Lucide;
  const [form, setForm] = React.useState({ service: SERVICES[0], date: '', time: TIMES[0], name: '', phone: '' });
  const [done, setDone] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const waText = encodeURIComponent(
    `Hola Greek Studio, deseo reservar mi experiencia:\n• ${form.service}\n• ${form.date} ${form.time}\n• ${form.name} · ${form.phone}`
  );
  const waHref = `https://wa.me/${WHATSAPP}?text=${waText}`;

  /* La reserva se confirma por WhatsApp: al enviar, abrimos el chat con
     todo prearmado (gesto del usuario, no lo bloquea el navegador). */
  const submit = (e) => {
    e.preventDefault();
    window.open(waHref, '_blank', 'noopener');
    setDone(true);
  };

  return (
    <section id="reservar" className="sec sec--center sec--book">
      <Reveal><p className="gs-eyebrow">Reserva</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Reserva tu Experiencia</h2></Reveal>
      <Reveal delay={0.1}><p className="sec__lead sec__lead--narrow">Agenda tu ritual de belleza. Confirmamos tu cita por WhatsApp en minutos.</p></Reveal>

      <Reveal delay={0.12} amount={0.15} className="bookcard">
        {!done ? (
          <form className="bookform" onSubmit={submit}>
            <Field label="Experiencia">
              <select className="inp" value={form.service} onChange={set('service')}>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div className="bookform__row">
              <Field label="Fecha">
                <input className="inp" type="date" required value={form.date} onChange={set('date')} />
              </Field>
              <Field label="Hora">
                <select className="inp" value={form.time} onChange={set('time')}>
                  {TIMES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Nombre completo">
              <input className="inp" type="text" required placeholder="Tu nombre" value={form.name} onChange={set('name')} />
            </Field>
            <Field label="Teléfono / WhatsApp">
              <input className="inp" type="tel" required placeholder="+58 ..." value={form.phone} onChange={set('phone')} />
            </Field>
            <button className="gs-btn gs-btn--primary bookform__submit" type="submit">
              <span>Reservar por WhatsApp</span><ArrowRight size={17} strokeWidth={1.6} />
            </button>
            <p className="bookform__hint">Al enviar se abre WhatsApp con tu reserva prearmada — solo presiona enviar.</p>
          </form>
        ) : (
          <div className="booksuccess">
            <span className="booksuccess__check"><Check size={26} strokeWidth={1.6} /></span>
            <h3 className="booksuccess__title">Tu solicitud está lista.<br />Confírmala por WhatsApp.</h3>
            <p className="booksuccess__sub">
              {form.name ? form.name + ', ' : ''}abrimos WhatsApp con tu reserva del <strong>{form.date || '—'}</strong> a las <strong>{form.time}</strong> ya
              escrita — solo presiona enviar. Tu cita queda confirmada cuando nuestro equipo te responda.
            </p>
            <div className="booksuccess__actions">
              <a className="gs-btn gs-btn--primary" href={waHref} target="_blank" rel="noopener">
                <MessageCircle size={16} strokeWidth={1.6} /><span>Abrir WhatsApp de nuevo</span>
              </a>
              <button className="gs-btn gs-btn--ghost" onClick={() => setDone(false)}><span>Nueva reserva</span></button>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* La antigua sección "Loyalty" (club genérico con 20%) fue reemplazada por
   Athena Reserve (Membership.jsx) — se eliminó para evitar incongruencias. */

Object.assign(window, { Booking });
