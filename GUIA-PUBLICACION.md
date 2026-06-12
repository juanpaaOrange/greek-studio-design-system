# Greek Studio — Guía de publicación y mantenimiento

Esta guía cubre: publicar el sitio, comprar el dominio, mantener el bot Athena,
y cómo operar las membresías, referidos y Greek Rewards en tu Excel.

---

## 1 · Dónde publicar el sitio (recomendado: Vercel, gratis)

El sitio es 100% estático — no necesita servidor ni base de datos. **Vercel**
(plan Hobby, $0/mes) es la mejor opción: rápido, con HTTPS automático y se
actualiza solo cada vez que subes cambios a GitHub.

1. Sube esta carpeta actualizada a GitHub (repo `greek-studio-design-system`).
2. Entra a <https://vercel.com/new>, inicia sesión con GitHub e importa el repo.
3. Framework Preset: **Other** · Root Directory: `./` (el `vercel.json` ya
   apunta a `ui_kits/website`). Deploy.
4. En ~30 segundos tienes una URL tipo `https://greek-studio.vercel.app`.

Alternativas válidas: **Netlify** (igual de bueno) o **Cloudflare Pages**
(mejor velocidad en Venezuela por su red CDN). Los tres son gratis para esto.

## 2 · Dónde comprar el dominio

Compra en **Porkbun** (<https://porkbun.com>) o **Namecheap**
(<https://namecheap.com>) — precios honestos (~$10–12/año), WHOIS privado
gratis y panel sencillo. Evita GoDaddy (renovaciones caras).

Sugerencias de nombre (verifica disponibilidad):
- `greekstudio.com` (si está libre, cómpralo ya)
- `greekstudiomcbo.com` — coincide con tu Instagram, ideal
- `greekstudio.beauty` o `greekstudio.club` — modernos y de marca

Conectar el dominio a Vercel: en Vercel → Settings → Domains → Add, escribe tu
dominio y sigue las instrucciones (2 registros DNS en Porkbun/Namecheap).
HTTPS se configura solo. **Importante:** cuando tengas el dominio final,
actualiza el enlace en tu bio de Instagram y en Google Business Profile.

## 3 · Configuración del negocio (un solo lugar)

Todos los datos del negocio viven en `ui_kits/website/index.html`, bloque
`window.GS_CONFIG` (al inicio del archivo):

```js
window.GS_CONFIG = {
  whatsapp: '584220186946',        // ← solo dígitos: 58 + número sin el 0
  phoneDisplay: '+58 422-018-6946',
  instagram: '...', email: '...',
};
```

Si cambias de número de WhatsApp, **edita solo estas dos líneas** — todos los
botones del sitio (reservas, membresía, barra móvil, Athena, contacto) lo
toman de aquí.

## 4 · El bot Athena — cómo funciona y cómo mantenerlo

**Hoy:** Athena es un concierge por reglas (archivo `ui_kits/website/Athena.jsx`).
Responde con la información oficial del salón: servicios, planes y precios de
membresía, créditos, horario, ubicación, pagos, referidos y rewards. Lo que no
sabe, lo deriva a WhatsApp. **Costo: $0. No requiere mantenimiento** salvo
actualizar las respuestas cuando cambien precios u horarios — edita el array
`ATHENA_INTENTS` al inicio del archivo (cada intención = palabras clave + respuesta).

**Mañana (opcional): Athena con IA real.** Cuando quieras respuestas libres:
1. Crea una API key en <https://console.anthropic.com>.
2. En Vercel, añade una *serverless function* (`/api/athena.js`) que reciba la
   pregunta, llame a la API de Claude (modelo Haiku — el más económico) con el
   prompt de marca, y devuelva la respuesta. La key vive en una variable de
   entorno de Vercel, nunca en el código del sitio.
3. En `Athena.jsx`, cambia `athenaReply(q)` por un `fetch('/api/athena')`.

Costo estimado con Haiku: ~$1–5/mes con tráfico normal de un salón. Pídeme
este upgrade cuando lo quieras y lo dejo listo.

## 5 · Qué pasa cuando alguien se quiere unir (flujo completo)

1. Clic en **"Unirme a Essentials/Signature/Black"** (o "Únete al Club" en la
   barra móvil) → se abre el modal **"Solicita tu membresía"**.
2. Elige plan, mensual/anual, para ella/él y escribe su nombre.
3. Clic en **"Completar por WhatsApp"** → se abre tu WhatsApp con el mensaje
   prearmado: plan, precio, nombre y — si entró por enlace de embajador —
   **"Vengo recomendado por: [código]"**.
4. Tu equipo responde con los datos de Pago Móvil / Binance, recibe el
   comprobante y envía la tarjeta digital.
5. **Registra la inscripción en el Excel** (ver sección 7).

## 6 · Qué pasa con el enlace de embajador

1. Cualquier persona escribe su nombre en "Recomienda y Gana" → se genera
   `tusitio.com/?ref=sunombre`.
2. Botones **Copiar** y **Compartir por WhatsApp** (mensaje prearmado).
3. Quien abre ese enlace ve un aviso "Entraste por recomendación de X · 25%
   en tu primer servicio", y el código viaja automáticamente en su mensaje
   de inscripción por WhatsApp.
4. Tú registras el referido en la hoja **👥 Referidos** del Excel — la hoja
   cuenta sola cuántos miembros trajo cada embajador y avisa cuando alguien
   llega a 3 (bono: 1 mes gratis o keratina).

## 7 · Registro en GREEK STUDIO FINANCE.xlsx

Se agregaron 4 hojas (hay un respaldo: "GREEK STUDIO FINANCE (respaldo 2026-06-11)"):

| Hoja | Qué registras | Qué calcula sola |
|---|---|---|
| **💳 Membresías** | fecha, nombre, teléfono, ella/él, plan, mensual/anual, créditos usados, código de referido, estado | cuota $, créditos/mes, % de uso, próximo cobro, **socios activos, MRR e ingreso anualizado** |
| **👥 Referidos** | fecha, código del embajador, invitado, asistió/se hizo miembro, premios entregados | total de referidos, % de conversión, **miembros por embajador y aviso de bono (3 → 1 mes gratis)** |
| **⭐ Greek Rewards** | cliente, ella/él, visitas acumuladas (+1 por visita), premios entregados | próximo hito (5/10/15/20), cuántas visitas faltan y **qué premio toca según ella/él** |
| **📐 Economía Club** | tus costos reales (3 celdas doradas) | margen $ y % de cada plan con uso de créditos al 70 / 85 / 100% |

**Rutina sugerida:** al cerrar cada día, suma +1 visita en Rewards a quienes
vinieron; al cobrar una membresía, llena una fila en Membresías; al llegar un
WhatsApp con "Vengo recomendado por...", llena una fila en Referidos.

**Vigila en 📐 Economía Club:** si el % de uso real del plan Black (hoja
Membresías, columna % uso) se acerca al 100% sostenido, el margen se comprime —
es tu señal para ajustar precio o créditos en la siguiente cohorte.

## 8 · Checklist antes del lanzamiento

- [ ] Confirmar que +58 422-018-6946 es el WhatsApp correcto y tiene WhatsApp Business
- [ ] Configurar respuestas rápidas en WhatsApp Business (datos de Pago Móvil / Binance)
- [ ] Comprar dominio y conectarlo a Vercel
- [ ] Crear/actualizar Google Business Profile con el dominio
- [ ] Poner el dominio en la bio de Instagram
- [ ] (Opcional) Añadir Meta Pixel + Google Analytics para medir conversión
