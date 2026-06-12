# Greek Studio — publicar el sitio web

Esta guía te lleva del proyecto a un sitio en vivo en **Vercel**, usando **GitHub** como repositorio.

El sitio que se publica vive en `ui_kits/website/index.html`. El archivo `vercel.json`
en la raíz le dice a Vercel que sirva esa carpeta como el sitio.

---

## 1 · Subir a GitHub (sin instalar nada)

1. Entra a <https://github.com/new>.
2. Nombre del repo: **`greek-studio`** (o el que quieras). Privacidad: **Public** o **Private**, como prefieras.
3. **No** marques "Add a README", "gitignore" ni "license" (este proyecto ya los trae).
4. Crea el repo. En la página siguiente verás "**Quick setup — if you've done this kind of thing before**". Justo debajo, haz clic en **"uploading an existing file"** (un enlace pequeño).
5. **Descomprime** el `.zip` que te dejo aquí y **arrastra TODO el contenido** (no la carpeta `greek-studio/`, sino lo que está dentro) al área de "Drag files here". Espera a que se suban.
6. Abajo escribe el mensaje del commit (p. ej. "Sitio inicial") y haz clic en **Commit changes**.

✅ Ya tienes tu repo. La URL será `https://github.com/TU-USUARIO/greek-studio`.

> *Alternativa con terminal:* si prefieres `git`, en el zip ya está el `.gitignore`. Desde la carpeta descomprimida corre `git init && git add . && git commit -m "init" && git branch -M main && git remote add origin https://github.com/TU-USUARIO/greek-studio.git && git push -u origin main`.

---

## 2 · Conectar Vercel

1. Entra a <https://vercel.com/new>. Inicia sesión con tu cuenta de GitHub.
2. En "Import Git Repository" busca **`greek-studio`** y haz clic en **Import**.
3. En la pantalla de configuración:
   - **Framework Preset:** *Other* (o "No framework")
   - **Root Directory:** déjalo en **`./`** (la raíz). El `vercel.json` se encarga del resto.
   - **Build & Output Settings:** déjalos vacíos (sitio estático).
4. Haz clic en **Deploy**.

En ~30 segundos Vercel te da una URL pública del tipo `https://greek-studio.vercel.app`. ¡Listo!

> Si Vercel se queja del subdirectorio, abre **Project → Settings → General → Root Directory** y cámbialo a `ui_kits/website`. Luego en **Deployments → Redeploy**.

---

## 3 · Dominio propio (opcional)

En Vercel → **Settings → Domains** agrega `greekstudiomcbo.com` (o el tuyo). Vercel te muestra los registros DNS que debes apuntar en tu proveedor (GoDaddy, NIC.ve, etc).

---

## 4 · Hacer cambios después

- Edita los archivos en GitHub (web o local) y haz commit.
- Vercel **despliega automáticamente** cada push a `main`. Cada cambio se ve en vivo en ~30 s.

---

## Estructura del proyecto

```
.
├── vercel.json              ← config de despliegue (apunta a ui_kits/website)
├── .gitignore
├── README.md                ← sistema de diseño (info de marca)
├── SKILL.md                 ← manifiesto del skill de marca
├── colors_and_type.css      ← tokens (colores + tipografía)
├── assets/                  ← logos extraídos del PDF (raíz del DS)
├── preview/                 ← tarjetas del sistema de diseño
└── ui_kits/website/         ← EL SITIO QUE SE PUBLICA
    ├── index.html
    ├── *.jsx                ← componentes (React + Framer Motion)
    ├── *.css                ← estilos
    ├── image-slot.js
    └── assets/photos/       ← tus 8 fotos (Historia + galería)
```

---

## Cosas que querrás revisar antes de publicar

- **Athena Reserve — formulario y WhatsApp**: edita los placeholders en `ui_kits/website/Membership.jsx` (líneas 9–10):
  - `FORM_URL` → tu link de Tally / Google Forms
  - `WHATSAPP_NUMBER` → tu número (formato: `58414XXXXXXX`, sin signos)
  Todos los botones "Unirme" / "Quiero ser socia" y "Generar mi enlace" los usan automáticamente.
- **Captura de ?ref**: cuando alguien entra a `tudominio.com/?ref=isabella`, la página muestra un banner sutil sobre los planes ("Entraste recomendada por…") y los botones de inscripción agregan `?ref=isabella` al URL del formulario. En el formulario crea un campo OCULTO llamado `ref` para recibir el valor.
- **Athena** (chat con IA): usa una integración interna de Claude. **En Vercel no funcionará** sin un backend. Para producción, conecta una API key real (puedo ayudarte a implementarlo cuando estés listo).
- **Reseñas**: son testimoniales de muestra; cámbialas por tus reseñas reales de Google.
- **Reserva / Club**: los formularios guardan localmente; conecta un servicio (Formspree, Netlify Forms, EmailJS) para recibir los datos.
- **Mapa**: usa `output=embed` de Google Maps; verifica que la dirección sea correcta.
- **Logo y fotos**: si la guía oficial pide cambios, sustitúyelos en `assets/` y `ui_kits/website/assets/photos/`.

---

**¿Te ayudo con el siguiente paso?** Si quieres, te ayudo a conectar formularios reales, el dominio, o reemplazo Athena por una integración con API key.
