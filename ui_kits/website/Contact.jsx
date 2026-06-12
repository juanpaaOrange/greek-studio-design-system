/* global React, Lucide */

const MAP_SRC = 'https://www.google.com/maps?q=' +
  encodeURIComponent('Av. Universidad, local 9B, Maracaibo, Zulia, Venezuela') + '&output=embed';
const IG = 'https://instagram.com/greekstudiomcbo';
const MAPS_LINK = 'https://share.google/z5tx1Mi7S3L0I8682';
const GS_PHONE = (window.GS_CONFIG && window.GS_CONFIG.phoneDisplay) || '+58 422-018-6946';
const GS_WA = 'https://wa.me/' + ((window.GS_CONFIG && window.GS_CONFIG.whatsapp) || '584220186946');

function Contact() {
  const { Instagram, Phone, Mail, MapPin, ArrowUpRight, Clock } = Lucide;
  const rows = [
    { icon: MapPin, label: 'Dirección', value: 'Av. Universidad, local 9B · Maracaibo, Estado Zulia, Venezuela', href: MAPS_LINK },
    { icon: Phone, label: 'WhatsApp', value: GS_PHONE, href: GS_WA },
    { icon: Mail, label: 'Correo', value: 'greekstudio.tn@gmail.com', href: 'mailto:greekstudio.tn@gmail.com' },
    { icon: Instagram, label: 'Instagram', value: '@greekstudiomcbo', href: IG },
  ];

  return (
    <section id="contacto" className="sec sec--contact">
      <div className="contact__grid">
        <div className="contact__info">
          <Reveal><p className="gs-eyebrow">Visítanos</p></Reveal>
          <Reveal delay={0.05}><h2 className="sec__title">Greek Studio<br />Beauty Salon</h2></Reveal>
          <Reveal delay={0.1}><p className="sec__lead">Un templo de la belleza en el corazón de Maracaibo. Te recibimos con una cortesía de bienvenida.</p></Reveal>
          <div className="contact__rows">
            {rows.map((r, i) => (
              <Reveal as="div" key={r.label} delay={0.12 + i * 0.05} className="contact__row" amount={0.4}>
                <a className="contact__rowlink" href={r.href} target="_blank" rel="noopener">
                  <span className="contact__ic"><r.icon size={17} strokeWidth={1.5} /></span>
                  <span className="contact__txt">
                    <span className="contact__label">{r.label}</span>
                    <span className="contact__value">{r.value}</span>
                  </span>
                  <ArrowUpRight className="contact__go" size={16} strokeWidth={1.4} />
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.26} className="contact__hours" amount={0.4}>
            <span className="contact__hours-ic"><Clock size={16} strokeWidth={1.5} /></span>
            <span className="contact__hours-txt">
              <strong>Lunes a Sábado</strong> · 9:00 – 18:00<br />
              Domingos solo con cita (mín. 3 días de anticipación)
            </span>
          </Reveal>
          <Reveal delay={0.3} className="contact__cta">
            <a className="gs-btn gs-btn--primary" href="#reservar"><span>Reservar Cita</span></a>
            <button className="gs-btn gs-btn--ghost" type="button" onClick={() => window.__openJoin && window.__openJoin(null)}><span>Unirme al Club</span></button>
          </Reveal>
        </div>

        <Reveal delay={0.1} amount={0.2} className="contact__mapwrap">
          <iframe
            className="contact__map"
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Greek Studio"
          ></iframe>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="foot">
        <div className="foot__top">
          <a className="foot__brand" href="#top">
            <img src="assets/symbol-bronze.png" alt="" className="foot__mark" />
            <span className="foot__word">GREEK STUDIO<em>El Templo de la Belleza</em></span>
          </a>
          <nav className="foot__links">
            <a href={IG} target="_blank" rel="noopener">Instagram</a>
            <a href={GS_WA} target="_blank" rel="noopener">{GS_PHONE}</a>
            <a href="mailto:greekstudio.tn@gmail.com">greekstudio.tn@gmail.com</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener">Google Maps</a>
          </nav>
        </div>
        <div className="foot__bottom">
          <span>© {new Date().getFullYear()} Greek Studio C.A · Maracaibo, Venezuela</span>
          <span className="foot__tag">Greek Studio — El Templo de la Belleza</span>
        </div>
      </footer>
    </section>
  );
}

Object.assign(window, { Contact });
