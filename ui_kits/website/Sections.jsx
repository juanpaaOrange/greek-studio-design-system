/* global React */

/* Reliable scroll-reveal — IntersectionObserver + CSS (no prop-gated framer) */
function Reveal({ children, y = 30, delay = 0, className = '', amount = 0.2, as = 'div' }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: amount, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={'reveal' + (shown ? ' is-in' : '') + (className ? ' ' + className : '')}
      style={{ '--rv-delay': delay + 's', '--rv-y': y + 'px' }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────  NUESTRA HISTORIA  ───────────────────────── */
function Historia() {
  return (
    <section id="historia" className="sec sec--split">
      <div className="split__media">
        <Reveal className="split__imgwrap" amount={0.2}>
          <image-slot id="gs-historia" src="assets/photos/gs-historia.jpg" shape="rect" fit="cover" placeholder="Fotografía · nuestro espacio"></image-slot>
          <div className="slot-hint"><span className="slot-hint__plus">+</span><span className="slot-hint__t">Agregar foto</span></div>
          <span className="split__tag">Maracaibo · Zulia</span>
        </Reveal>
      </div>
      <div className="split__body">
        <Reveal><p className="gs-eyebrow">Nosotros</p></Reveal>
        <Reveal delay={0.05}><h2 className="sec__title">Nuestra Historia</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="sec__lead">
            Greek Studio nace con una visión clara: elevar los estándares de la belleza y el
            bienestar en Maracaibo a través de experiencias exclusivas, atención personalizada
            y un servicio de clase mundial.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="sec__p">
            Fundado por inversionistas mexicanos que decidieron apostar por Venezuela, Greek Studio
            representa la confianza en el talento venezolano, el compromiso con el desarrollo local
            y la creación de oportunidades para profesionales apasionados por la belleza y el servicio.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sec__p">
            Más que un salón de belleza, somos un espacio diseñado para inspirar confianza, bienestar
            y elegancia. Nuestro propósito es combinar excelencia, hospitalidad y atención al detalle
            para crear experiencias memorables que trasciendan lo estético.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────  EL SIGNIFICADO DE NUESTRO NOMBRE  ────────────────── */
function Nombre() {
  return (
    <section id="nombre" className="sec sec--center sec--raised">
      <Reveal><p className="gs-eyebrow">¿Por qué Greek Studio?</p></Reveal>
      <Reveal delay={0.05}><h2 className="sec__title sec__title--lg">El Significado<br />de Nuestro Nombre</h2></Reveal>
      <Reveal delay={0.1} className="orna"><span className="orna__line" /><span className="orna__dia" /><span className="orna__line" /></Reveal>
      <Reveal delay={0.12}>
        <p className="sec__lead sec__lead--narrow">
          Inspirado en la Antigua Grecia, una civilización reconocida por su búsqueda constante de
          la perfección, la armonía, la belleza y la excelencia.
        </p>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="sec__p sec__p--narrow">
          Nuestra inspiración proviene también de la mitología griega y, especialmente, de
          <em> Afrodita</em> — diosa de la belleza, el amor y la elegancia. Para nosotros, la belleza
          no se trata únicamente de la apariencia, sino de la confianza, la seguridad y la mejor
          versión de cada persona.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="sec__quote">
          Greek Studio representa el equilibrio entre la belleza clásica, el lujo silencioso
          y la sofisticación moderna.
        </p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────  NUESTRO COMPROMISO SOCIAL  ───────────────────── */
const COMPROMISO = [
  'La generación de empleo de calidad',
  'El desarrollo profesional del talento venezolano',
  'La formación continua de nuestro equipo',
  'El fortalecimiento de la economía local',
  'La promoción de la autoestima y el bienestar',
];
function Compromiso() {
  return (
    <section id="compromiso" className="sec sec--split sec--reverse">
      <div className="split__body">
        <Reveal><p className="gs-eyebrow">Belleza con Propósito</p></Reveal>
        <Reveal delay={0.05}><h2 className="sec__title">Nuestro<br />Compromiso Social</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="sec__lead">
            Creemos que una empresa exitosa también debe generar un impacto positivo en su comunidad.
          </p>
        </Reveal>
        <ul className="commit">
          {COMPROMISO.map((c, i) => (
            <Reveal as="li" key={c} delay={0.12 + i * 0.05} className="commit__item">
              <span className="commit__dia" />{c}
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.4}>
          <p className="sec__p">
            Cada visita a Greek Studio contribuye a impulsar oportunidades, apoyar talento local
            y construir un proyecto con impacto positivo para la ciudad.
          </p>
        </Reveal>
      </div>
      <div className="split__media">
        <Reveal className="commit__panel" amount={0.2}>
          <span className="commit__dia-lg" />
          <p className="commit__stat-t">Belleza con propósito</p>
          <p className="commit__stat-s">Empleo · Formación · Comunidad</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────  EL TEMPLO DE LA BELLEZA  ──────────────────── */
function Filosofia() {
  return (
    <section id="filosofia" className="sec sec--temple">
      <div className="temple__inner">
        <Reveal><p className="gs-eyebrow gs-eyebrow--light">Filosofía de Marca</p></Reveal>
        <Reveal delay={0.05}><h2 className="temple__title">El Templo<br />de la Belleza</h2></Reveal>
        <Reveal delay={0.12}>
          <p className="temple__lead">
            En Greek Studio creemos que la belleza es una experiencia. Cada detalle de nuestro
            espacio ha sido diseñado para ofrecer exclusividad, relajación y atención personalizada.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="temple__p">
            No solo ofrecemos servicios de belleza. Creamos experiencias diseñadas para elevar la
            confianza, celebrar la individualidad y redefinir el concepto del cuidado personal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Reveal, Historia, Nombre, Compromiso, Filosofia });
