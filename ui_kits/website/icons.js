/* global React */
/* ════════════════════════════════════════════════════════════
   Icons.jsx — iconos SVG inline (trazos de Lucide, hairline)
   Reemplaza la dependencia CDN de lucide-react, que resultó
   poco fiable (esm.sh devolvía un módulo vacío y tumbaba todo).
   Misma API: <Icon size strokeWidth color fill className />
   Expone window.Lucide para no tocar el resto de componentes.
   ════════════════════════════════════════════════════════════ */
(function () {
  const PATHS = {
    Menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    ArrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    Calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    Check: '<path d="M20 6 9 17l-5-5"/>',
    MessageCircle: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    Send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    Minus: '<path d="M5 12h14"/>',
    Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    Instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    Phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    Mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
    ChevronRight: '<path d="m9 18 6-6-6-6"/>',
    Copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    Gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  };

  function makeIcon(name, inner) {
    function Icon(props) {
      const {
        size = 24,
        strokeWidth = 2,
        color = 'currentColor',
        fill = 'none',
        className,
        style,
      } = props || {};
      return React.createElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: fill,
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className: className,
        style: style,
        'aria-hidden': 'true',
        dangerouslySetInnerHTML: { __html: inner },
      });
    }
    Icon.displayName = name;
    return Icon;
  }

  const icons = {};
  for (const name in PATHS) icons[name] = makeIcon(name, PATHS[name]);

  // Reemplaza/define el namespace global que consumen los componentes.
  window.Lucide = icons;
})();
