# Odontologia Prueba — Checklist post-entrega

## Datos del cliente
- **Dominio:** prueba-panel.com
- **Ciudad:** Esperanza, Santa Fe
- **WhatsApp:** 5493496526318
- **Email:** prueba@jfserviciosweb.com
- **Formspree ID:** movnpobb
- **Generado:** 2026-10-24

## 🔑 Cómo entrar al Panel de Contenidos (para pasarle al cliente)
1. Abrir https://[usuario].github.io/prueba-panel/admin/ desde una **ventana normal** del navegador (NO incógnito).
2. Tocar "Iniciar sesión con GitHub". Se abre una ventanita: si el navegador la bloquea, permitir ventanas emergentes para github.io y volver a intentar.
3. El cliente tiene que haber aceptado la invitación como colaborador del repositorio (le llega sola por mail al correr el comando de más abajo).

## ✅ Checklist antes de publicar
- [ ] Avisar al cliente: entrar al Panel desde ventana normal y permitir emergentes de github.io
- [ ] Reemplazar img/whatsapp-flotante.webp con el ícono real
- [ ] Confirmar email Formspree del cliente (revisar SPAM)
- [ ] Verificar Schema en search.google.com/test/rich-results
- [ ] Probar formulario enviando mensaje real
- [ ] Probar botón WA flotante en mobile
- [ ] Correr Lighthouse — Performance ≥85, SEO ≥90, Accessibility ≥90
- [ ] Subir a GitHub Pages
- [ ] Configurar dominio en Cloudflare
- [ ] Verificar SSL activo (https://)
- [ ] (Si tiene video) Activar "Permitir embeber" en YouTube Studio

## 🚀 Publicación
```
git init
git add .
git commit -m "Sitio Odontologia Prueba — JF Servicios Web"
git branch -M main
git remote add origin https://github.com/[usuario]/prueba-panel.git
git push -u origin main
```

## 👥 Invitar al cliente al Panel de Contenidos (una sola vez, apenas el repo esté subido)
Usuario de GitHub que cargó el cliente en el Tally: **jfserviciosweb10**

```
node D:\JF_SISTEMA04_GENERADOR\JF_GENERADORES_4_NIVELES\invitar-colaborador.js prueba-panel jfserviciosweb10
```

Si dice que el usuario no existe, pedirle al cliente que lo copie desde su perfil de GitHub.
