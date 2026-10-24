#!/usr/bin/env node
/* build-faq.js (sitio de cliente) — reconstruye la sección "Preguntas
   frecuentes" de index.html (y los datos para Google, FAQPage) a partir de
   _data/faq.yml, que el cliente edita desde el Panel de Contenidos.
   Corre solo en GitHub Actions (deploy.yml). Si el archivo no existe o no
   tiene preguntas, no toca nada (queda lo que generó el sitio). */

const fs = require('fs');
const yaml = require('js-yaml');

if (!fs.existsSync('index.html') || !fs.existsSync('_data/faq.yml')) { console.log('Sin index.html o _data/faq.yml — nada para hacer.'); process.exit(0); }

let datos = {};
try { datos = yaml.load(fs.readFileSync('_data/faq.yml', 'utf8')) || {}; }
catch (e) { console.log('faq.yml inválido, no se toca la web:', e.message); process.exit(0); }
const items = (Array.isArray(datos.items) ? datos.items : []).filter(i => i && i.q && i.r);
if (!items.length) { console.log('faq.yml sin preguntas — no se toca la web.'); process.exit(0); }

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dual = (es, i2) => i2
  ? `<span data-i18n-dyn data-i18n-es="${esc(es)}" data-i18n-i2="${esc(i2)}">${esc(es)}</span>`
  : esc(es);

const bloque = items.map((it, i) => `
    <div class="faq-item reveal-up">
      <button class="faq-trigger" aria-expanded="false" aria-controls="faq${i}">
        <span>${dual(it.q, it.q_i2)}</span>
        <i class="fas fa-chevron-down faq-icon"></i>
      </button>
      <div class="faq-body" id="faq${i}">
        <p>${dual(it.r, it.r_i2)}</p>
      </div>
    </div>`).join('');

let html = fs.readFileSync('index.html', 'utf8');
const A = '<!-- FAQ-AUTO-START -->', B = '<!-- FAQ-AUTO-END -->';
const i0 = html.indexOf(A), i1 = html.indexOf(B);
if (i0 === -1 || i1 === -1) { console.log('No encontré las marcas FAQ en index.html — no se toca.'); process.exit(0); }
let nuevo = html.slice(0, i0 + A.length) + bloque + html.slice(i1);

// Datos estructurados para Google (FAQPage)
const schema = { '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(it => ({ '@type': 'Question', name: String(it.q), acceptedAnswer: { '@type': 'Answer', text: String(it.r) } })) };
nuevo = nuevo.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/,
  () => '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>');

if (nuevo !== html) { fs.writeFileSync('index.html', nuevo, 'utf8'); console.log(`FAQ actualizada: ${items.length} pregunta(s).`); }
else console.log('FAQ sin cambios.');
