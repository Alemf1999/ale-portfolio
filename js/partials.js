// ============================================
// HEADER / FOOTER / MODAL DE CONTACTO COMPARTIDOS
// ============================================
// Este es el ÚNICO sitio donde debes editar el header,
// el footer y el modal de contacto. Se inyectan solos
// en todas las páginas (index, about, works y cada
// proyecto), así que nunca hace falta tocarlos en cada
// archivo HTML por separado.

(function () {

  // Detecta si la página actual está dentro de /projects/
  // para poder usar rutas relativas correctas (../).
  const isProjectPage = window.location.pathname.includes('/projects/');
  const prefix = isProjectPage ? '../' : '';

  // Detecta qué enlace del menú debe marcarse como activo.
  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  let currentPage = 'index';
  if (fileName === 'about.html') currentPage = 'about';
  if (fileName === 'works.html' || isProjectPage) currentPage = 'works';
  if (fileName === 'mediakit.html') currentPage = 'mediakit';

  // ---- HEADER --------------------------------------------
  // Edita aquí el logo, los enlaces del menú y el botón de idioma.
  const headerHTML = `
    <a href="${prefix}index.html" class="logo" aria-label="Inicio">
      <img src="${prefix}assets/images/logo.gif" alt="">
    </a>
    <nav class="main-nav">
      <a href="${prefix}about.html"${currentPage === 'about' ? ' class="active"' : ''}>sobre mí</a>
      <a href="${prefix}works.html"${currentPage === 'works' ? ' class="active"' : ''}>proyectos</a>
      <a id="nav-media-kit" href="${prefix}mediakit.html"${currentPage === 'mediakit' ? ' class="active"' : ''}>media kit</a>
      <button id="open-contact" class="nav-link-btn">contacto</button>
    </nav>
    <div class="header-controls">
      <span class="missions-anchor" data-missions-anchor></span>
      <button id="lang-toggle" class="lang-btn">EN</button>
      <button id="music-toggle" class="music-btn" type="button" aria-label="Reproducir música" aria-pressed="false">♫</button>
    </div>
    <audio id="background-music" src="${prefix}assets/m%C3%BAsica.mp3" autoplay loop preload="auto" hidden></audio>
    <img id="animated-cursor" src="${prefix}assets/images/cursor.gif" alt="" aria-hidden="true">
  `;

  // ---- FOOTER ---------------------------------------------
  const footerHTML = `
    <nav class="footer-links" aria-label="Redes y tienda">
      <a id="footer-instagram" href="https://instagram.com/ale_mariiin" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a id="footer-shop" href="https://alemf.es" target="_blank" rel="noopener noreferrer">Tienda</a>
    </nav>
    <p class="footer-copyright">© 2026 Ale Marín</p>
  `;

  // ---- MODAL DE CONTACTO ------------------------------------
  // Edita aquí tu email y tus redes sociales.
  const contactModalHTML = `
    <div class="modal-content">
      <button id="close-contact" class="modal-close">×</button>
      <ul class="contact-list">
        <li>♡ alemarin.ilustracion@gmail.com</li>
        <li>♡ instagram — <a href="https://instagram.com/ale_mariiin" target="_blank">@ale_mariiin</a></li>
        <li>♡ tienda — <a href="https://alemf.es" target="_blank"> Alemf.es </a></li>
        <li>♡ disponible para encargos y proyectos</li>
      </ul>
    </div>
  `;

  const headerRoot = document.getElementById('site-header-root');
  if (headerRoot) headerRoot.innerHTML = headerHTML;

  const footerRoot = document.getElementById('site-footer-root');
  if (footerRoot) footerRoot.innerHTML = footerHTML;

  const contactRoot = document.getElementById('contact-modal-root');
  if (contactRoot) contactRoot.innerHTML = contactModalHTML;

})();
