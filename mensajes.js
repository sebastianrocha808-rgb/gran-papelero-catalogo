/* Contacto y opiniones por WhatsApp - Distribuciones El Gran Papelero
   Independiente del carrito y de los productos.
   Cargar después de carrito.js, justo antes de </body>.
*/
(function () {
  'use strict';
  const TELEFONO = '573163318879';
  const NEGOCIO = 'Distribuciones El Gran Papelero';

  const style = document.createElement('style');
  style.textContent = `
    #msg-fab{position:fixed;right:16px;bottom:84px;z-index:50;background:#073b74;color:white;border:0;border-radius:999px;padding:14px 18px;font-size:15px;font-weight:bold;box-shadow:0 4px 14px #0004;cursor:pointer}
    #msg-fab:hover{background:#0879a8}
    #msg-overlay{position:fixed;inset:0;background:#0006;z-index:70;display:none}
    #msg-panel{position:fixed;right:0;top:0;height:100%;height:100dvh;width:min(420px,100%);background:#fff;z-index:71;display:none;flex-direction:column;box-shadow:-4px 0 18px #0004;font-family:Arial,sans-serif;color:#183047}
    #msg-overlay.open{display:block}
    #msg-panel.open{display:flex}
    #msg-head{background:linear-gradient(120deg,#073b74,#0879a8);color:#fff;padding:16px;display:flex;align-items:center;justify-content:space-between}
    #msg-head h3{margin:0;font-size:20px}
    #msg-close{background:transparent;border:0;color:#fff;font-size:30px;cursor:pointer;line-height:1}
    #msg-form{padding:20px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:12px}
    #msg-form p{margin:0 0 5px;line-height:1.5;font-size:14px;color:#526475}
    #msg-form label{font-size:14px;font-weight:bold}
    #msg-form input,#msg-form select,#msg-form textarea{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:9px;background:#fff;padding:12px;font:15px Arial,sans-serif;color:#183047}
    #msg-form textarea{resize:vertical;min-height:120px}
    #msg-send{background:#168c51;color:#fff;border:0;border-radius:9px;padding:13px;cursor:pointer;font-size:15px;font-weight:bold}
    #msg-send:hover{background:#117443}
    #msg-note{font-size:12px!important;color:#64748b!important}
    @media(max-width:600px){#msg-fab{right:16px;bottom:80px;padding:12px 15px;font-size:13px}}
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.id = 'msg-fab';
  fab.type = 'button';
  fab.textContent = '💬 Mensajes / Opiniones';
  fab.setAttribute('aria-label', 'Abrir mensajes y opiniones');

  const overlay = document.createElement('div');
  overlay.id = 'msg-overlay';

  const panel = document.createElement('aside');
  panel.id = 'msg-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Contacto y opiniones');
  panel.innerHTML = `
    <div id="msg-head">
      <h3>💬 Mensajes y opiniones</h3>
      <button id="msg-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <form id="msg-form">
      <p>¿Tienes una pregunta, sugerencia u opinión? Escríbenos directamente, sin agregar productos al pedido.</p>
      <label for="msg-name">Tu nombre (opcional)</label>
      <input id="msg-name" type="text" maxlength="100" autocomplete="name" placeholder="¿Cómo te llamas?">
      <label for="msg-type">Motivo del mensaje</label>
      <select id="msg-type">
        <option value="Consulta general">Consulta general</option>
        <option value="Opinión">Opinión</option>
        <option value="Sugerencia">Sugerencia</option>
        <option value="Queja o reclamo">Queja o reclamo</option>
      </select>
      <label for="msg-text">Tu mensaje</label>
      <textarea id="msg-text" maxlength="3000" required placeholder="Escribe aquí lo que nos quieras contar..."></textarea>
      <button id="msg-send" type="submit">Enviar por WhatsApp</button>
      <p id="msg-note">Se abrirá WhatsApp con el mensaje preparado para que confirmes el envío.</p>
    </form>
  `;
  document.body.append(fab, overlay, panel);

  const closeButton = panel.querySelector('#msg-close');
  const form = panel.querySelector('#msg-form');
  const nameInput = panel.querySelector('#msg-name');
  const typeInput = panel.querySelector('#msg-type');
  const textInput = panel.querySelector('#msg-text');

  function abrir(estado) {
    panel.classList.toggle('open', estado);
    overlay.classList.toggle('open', estado);
    if (estado) nameInput.focus();
    else fab.focus();
  }

  fab.addEventListener('click', () => abrir(true));
  overlay.addEventListener('click', () => abrir(false));
  closeButton.addEventListener('click', () => abrir(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) abrir(false);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = nameInput.value.trim();
    const tipo = typeInput.value;
    const contenido = textInput.value.trim();
    if (!contenido) {
      textInput.focus();
      return;
    }
    const mensaje = `Hola, ${NEGOCIO}.\n\n*Motivo:* ${tipo}` +
      (nombre ? `\n*Nombre:* ${nombre}` : '') +
      `\n\n*Mensaje:*\n${contenido}`;
    const url = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
  });
})();
