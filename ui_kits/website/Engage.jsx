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
const WHATSAPP = '580186964';

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
  const [form, setForm] = React.useState({ service: SERVICES[0], date: '', time: TIMES[0], name: '', phone: '', email: '' });
  const [done, setDone] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    try {
      const all = JSON.parse(localStorage.getItem('gs_bookings') || '[]');
      all.push({ ...form, at: Date.now() });
      localStorage.setItem('gs_bookings', JSON.stringify(all));
    } catch (_) {}
    setDone(true);
  };

  const waText = encodeURIComponent(
    `Hola Greek Studio, deseo confirmar mi reserva:\n• ${form.service}\n• ${form.date} ${form.time}\n• ${form.name} · ${form.phone}`
  );

  return (
    <section id="reservar" className="sec sec--center sec--book">
      <Reveal><p className="gs-eyebrow">Reserva</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">Reserva tu Experiencia</h2></Reveal>
      <Reveal delay={0.1}><p className="sec__lead sec__lead--narrow">Agenda tu ritual de belleza. Recibirás confirmación por correo y WhatsApp.</p></Reveal>

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
            <div className="bookform__row">
              <Field label="Teléfono">
                <input className="inp" type="tel" required placeholder="+58 ..." value={form.phone} onChange={set('phone')} />
              </Field>
              <Field label="Correo electrónico">
                <input className="inp" type="email" required placeholder="tu@correo.com" value={form.email} onChange={set('email')} />
              </Field>
            </div>
            <button className="gs-btn gs-btn--primary bookform__submit" type="submit">
              <span>Reservar Cita</span><ArrowRight size={17} strokeWidth={1.6} />
            </button>
          </form>
        ) : (
          <div className="booksuccess">
            <span className="booksuccess__check"><Check size={26} strokeWidth={1.6} /></span>
            <h3 className="booksuccess__title">Tu experiencia de belleza<br />ha sido reservada.</h3>
            <p className="booksuccess__sub">
              {form.name ? form.name + ', ' : ''}te esperamos el <strong>{form.date || '—'}</strong> a las <strong>{form.time}</strong>.
              Hemos enviado la confirmación a <strong>{form.email}</strong>.
            </p>
            <div className="booksuccess__actions">
              <a className="gs-btn gs-btn--primary" href={`https://wa.me/${WHATSAPP}?text=${waText}`} target="_blank" rel="noopener">
                <MessageCircle size={16} strokeWidth={1.6} /><span>Confirmar por WhatsApp</span>
              </a>
              <button className="gs-btn gs-btn--ghost" onClick={() => setDone(false)}><span>Nueva reserva</span></button>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* ──────────────────────  PRIVATE BEAUTY CLUB  ────────────────────── */
function Loyalty() {
  const { ArrowUpRight, Check } = Lucide;
  const [form, setForm] = React.useState({ name: '', email: '', phone: '' });
  const [done, setDone] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    try {
      const all = JSON.parse(localStorage.getItem('gs_club') || '[]');
      all.push({ ...form, at: Date.now() });
      localStorage.setItem('gs_club', JSON.stringify(all));
    } catch (_) {}
    setDone(true);
  };

  return (
    <section id="club" className="sec sec--club">
      <div className="club__inner">
        <div className="club__left">
          <Reveal><p className="gs-eyebrow gs-eyebrow--light">Membresía</p></Reveal>
          <Reveal delay={0.05}><h2 className="club__title">Únete al Club Privado<br />de Belleza Greek Studio</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="club__lead">
              Ofertas exclusivas, reservas con prioridad, lanzamientos de nuevos tratamientos
              y privilegios especiales de miembro.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="club__reward">
            <span className="club__pct">20%</span>
            <span className="club__rewardt">de cortesía<br />en tu próxima visita</span>
          </Reveal>
        </div>

        <Reveal delay={0.1} amount={0.2} className="club__formwrap">
          {!done ? (
            <form className="club__form" onSubmit={submit}>
              <Field label="Nombre"><input className="inp" type="text" required value={form.name} onChange={set('name')} placeholder="Tu nombre" /></Field>
              <Field label="Correo electrónico"><input className="inp" type="email" required value={form.email} onChange={set('email')} placeholder="tu@correo.com" /></Field>
              <Field label="Teléfono"><input className="inp" type="tel" required value={form.phone} onChange={set('phone')} placeholder="+58 ..." /></Field>
              <button className="gs-btn gs-btn--primary club__submit" type="submit">
                <span>Unirme al Club</span><ArrowUpRight size={17} strokeWidth={1.5} />
              </button>
            </form>
          ) : (
            <div className="clubsuccess">
              <span className="booksuccess__check"><Check size={24} strokeWidth={1.6} /></span>
              <h3 className="clubsuccess__title">Bienvenida al Club Privado de Belleza</h3>
              <p className="clubsuccess__sub">
                {form.name ? form.name + ', ' : ''}tu beneficio de miembro del <strong>20%</strong> ha sido activado.
                Lo enviamos a <strong>{form.email}</strong>.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Booking, Loyalty });
