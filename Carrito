/* Carrito de pedidos por WhatsApp - Distribuciones El Gran Papelero
   Uso: pegar  <script src="carrito.js"></script>  justo antes de </body>, después del script existente. */
(function () {
  const TELEFONO = '573163318879';
  const NEGOCIO = 'Distribuciones El Gran Papelero';
  const LS_KEY = 'gran_papelero_carrito_v1';

  /* ---------- Estilos ---------- */
  const css = `
  .add{display:block;width:100%;border:0;cursor:pointer;background:#073b74;color:#fff;padding:10px;border-radius:8px;font-weight:bold;font-size:14px;margin-top:auto}
  .add:hover{background:#0879a8}
  .add.en-carrito{background:#168c51}
  .info .wa{margin-top:6px!important}
  #cart-fab{position:fixed;right:16px;bottom:16px;z-index:50;background:#168c51;color:#fff;border:0;border-radius:999px;padding:14px 20px;font-size:16px;font-weight:bold;box-shadow:0 4px 14px #0004;cursor:pointer}
  #cart-fab span{background:#d62828;border-radius:999px;padding:2px 9px;margin-left:6px;font-size:14px}
  #cart-overlay{position:fixed;inset:0;background:#0006;z-index:60;display:none}
  #cart-panel{position:fixed;top:0;right:0;height:100%;width:min(420px,100%);background:#fff;z-index:61;display:none;flex-direction:column;box-shadow:-4px 0 18px #0004}
  #cart-panel.open,#cart-overlay.open{display:flex}
  #cart-overlay.open{display:block}
  #cart-panel header{padding:14px 16px;display:flex;justify-content:space-between;align-items:center}
  #cart-panel header h3{margin:0;font-size:20px}
  #cart-close{background:none;border:0;color:#fff;font-size:28px;cursor:pointer;line-height:1}
  #cart-items{flex:1;overflow:auto;padding:10px 14px}
  .ci{display:grid;grid-template-columns:56px 1fr;gap:10px;padding:10px 0;border-bottom:1px solid #e2e8f0}
  .ci img{width:56px;height:56px;object-fit:contain;border:1px solid #e2e8f0;border-radius:6px;background:#fff}
  .ci-name{font-size:14px;font-weight:bold;line-height:1.3}
  .ci-ref{font-size:12px;color:#64748b;margin:2px 0 6px}
  .ci-ctl{display:flex;align-items:center;gap:6px}
  .ci-ctl button{width:30px;height:30px;border:1px solid #cbd5e1;background:#f8fafc;border-radius:6px;font-size:18px;cursor:pointer}
  .ci-ctl input{width:54px;text-align:center;padding:5px;font-size:15px}
  .ci-ctl .del{margin-left:auto;width:auto;padding:0 10px;font-size:13px;color:#d62828;border-color:#f3b4b4}
  #cart-empty{text-align:center;color:#64748b;padding:40px 10px}
  #cart-foot{padding:12px 14px;border-top:1px solid #e2e8f0;display:flex;flex-direction:column;gap:8px}
  #cart-foot input,#cart-foot textarea{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit}
  #cart-send{background:#168c51;color:#fff;border:0;border-radius:8px;padding:13px;font-size:16px;font-weight:bold;cursor:pointer}
  #cart-send:disabled{background:#94a3b8;cursor:not-allowed}
  #cart-clear{background:none;border:0;color:#64748b;cursor:pointer;font-size:13px;text-decoration:underline}
  #cart-total{font-weight:bold}
  @media(max-width:600px){.add{font-size:12px;padding:8px}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- Estado ---------- */
  let carrito = {};
  try { carrito = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { carrito = {}; }
  const guardar = () => { try { localStorage.setItem(LS_KEY, JSON.stringify(carrito)); } catch (e) {} };

  /* ---------- Leer datos de cada tarjeta ---------- */
  function datosTarjeta(card) {
    const img = card.querySelector('img');
    const id = img.getAttribute('src');                       // único por producto
    const nombre = card.querySelector('h2').textContent.trim();
    const refTxt = card.querySelector('.ref').textContent.trim();
    const ref = /^Ref\./.test(refTxt) ? refTxt.replace(/^Ref\.\s*/, '') : 'por confirmar';
    const pagM = card.querySelector('small').textContent.match(/pág\.\s*(\d+)/);
    const pag = pagM ? pagM[1] : '';
    return { id, nombre, ref, pag, img: id };
  }

  /* ---------- Botones "Agregar al pedido" ---------- */
  const tarjetas = [...document.querySelectorAll('.card')];
  tarjetas.forEach(card => {
    const d = datosTarjeta(card);
    const btn = document.createElement('button');
    btn.className = 'add';
    btn.type = 'button';
    btn.dataset.id = d.id;
    btn.textContent = '🛒 Agregar al pedido';
    btn.addEventListener('click', () => agregar(d));
    const wa = card.querySelector('.wa');
    wa.parentNode.insertBefore(btn, wa);
  });

  /* ---------- HTML del carrito ---------- */
  const fab = document.createElement('button');
  fab.id = 'cart-fab';
  fab.type = 'button';
  fab.innerHTML = '🛒 Mi pedido <span id="cart-count">0</span>';
  const overlay = document.createElement('div');
  overlay.id = 'cart-overlay';
  const panel = document.createElement('aside');
  panel.id = 'cart-panel';
  panel.innerHTML = `
    <header style="background:linear-gradient(120deg,#073b74,#0879a8);color:#fff">
      <h3>🛒 Mi pedido</h3><button id="cart-close" type="button" aria-label="Cerrar">×</button>
    </header>
    <div id="cart-items"></div>
    <div id="cart-foot">
      <div id="cart-total"></div>
      <input id="cart-nombre" type="text" placeholder="Tu nombre (opcional)">
      <textarea id="cart-notas" rows="2" placeholder="Notas: dirección, colores, tallas… (opcional)"></textarea>
      <button id="cart-send" type="button">Enviar pedido por WhatsApp</button>
      <button id="cart-clear" type="button">Vaciar pedido</button>
    </div>`;
  document.body.append(fab, overlay, panel);

  const $ = s => panel.querySelector(s);
  const lista = $('#cart-items');

  /* ---------- Acciones ---------- */
  function agregar(d) {
    if (carrito[d.id]) carrito[d.id].cant += 1;
    else carrito[d.id] = { ...d, cant: 1 };
    guardar(); pintar();
    fab.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 250 });
  }
  function cambiar(id, cant) {
    cant = parseInt(cant, 10);
    if (!cant || cant < 1) cant = 1;
    carrito[id].cant = Math.min(cant, 9999);
    guardar(); pintar();
  }
  function quitar(id) { delete carrito[id]; guardar(); pintar(); }
  function abrir(v) { panel.classList.toggle('open', v); overlay.classList.toggle('open', v); }

  /* ---------- Pintar ---------- */
  function pintar() {
    const items = Object.values(carrito);
    const totalUnidades = items.reduce((s, i) => s + i.cant, 0);
    document.getElementById('cart-count').textContent = items.length;
    fab.style.display = items.length || panel.classList.contains('open') ? 'block' : 'block';

    document.querySelectorAll('.add').forEach(b => {
      const en = carrito[b.dataset.id];
      b.classList.toggle('en-carrito', !!en);
      b.textContent = en ? `✓ En el pedido (${en.cant}) · agregar otro` : '🛒 Agregar al pedido';
    });

    lista.innerHTML = '';
    if (!items.length) {
      lista.innerHTML = '<div id="cart-empty">Tu pedido está vacío.<br>Toca “Agregar al pedido” en los productos que quieras.</div>';
    }
    items.forEach(i => {
      const row = document.createElement('div');
      row.className = 'ci';
      const im = document.createElement('img'); im.src = i.img; im.alt = '';
      const box = document.createElement('div');
      const n = document.createElement('div'); n.className = 'ci-name'; n.textContent = i.nombre;
      const r = document.createElement('div'); r.className = 'ci-ref';
      r.textContent = `Ref. ${i.ref}` + (i.pag ? ` · pág. ${i.pag}` : '');
      const ctl = document.createElement('div'); ctl.className = 'ci-ctl';
      const menos = document.createElement('button'); menos.type = 'button'; menos.textContent = '−';
      const inp = document.createElement('input'); inp.type = 'number'; inp.min = 1; inp.value = i.cant; inp.inputMode = 'numeric';
      const mas = document.createElement('button'); mas.type = 'button'; mas.textContent = '+';
      const del = document.createElement('button'); del.type = 'button'; del.className = 'del'; del.textContent = 'Quitar';
      menos.onclick = () => cambiar(i.id, i.cant - 1);
      mas.onclick = () => cambiar(i.id, i.cant + 1);
      inp.onchange = () => cambiar(i.id, inp.value);
      del.onclick = () => quitar(i.id);
      ctl.append(menos, inp, mas, del);
      box.append(n, r, ctl);
      row.append(im, box);
      lista.appendChild(row);
    });

    $('#cart-total').textContent = items.length
      ? `${items.length} producto${items.length > 1 ? 's' : ''} · ${totalUnidades} unidad${totalUnidades > 1 ? 'es' : ''}`
      : '';
    $('#cart-send').disabled = !items.length;
    $('#cart-clear').style.display = items.length ? 'block' : 'none';
  }

  /* ---------- Mensaje de WhatsApp con viñetas ---------- */
  function construirMensaje() {
    const items = Object.values(carrito);
    const nombre = $('#cart-nombre').value.trim();
    const notas = $('#cart-notas').value.trim();
    const totalUnidades = items.reduce((s, i) => s + i.cant, 0);

    let m = `Hola, quisiera hacer el siguiente pedido en ${NEGOCIO}:\n\n`;
    if (nombre) m += `*Cliente:* ${nombre}\n\n`;
    m += `*PEDIDO:*\n`;
    items.forEach(i => {
      m += `• ${i.cant} x ${i.nombre} (Ref. ${i.ref}` + (i.pag ? `, pág. ${i.pag}` : '') + `)\n`;
    });
    m += `\n*Total:* ${items.length} producto${items.length > 1 ? 's' : ''}, ${totalUnidades} unidad${totalUnidades > 1 ? 'es' : ''}`;
    if (notas) m += `\n\n*Notas:* ${notas}`;
    m += `\n\nQuedo atento(a) a la disponibilidad y el valor. ¡Gracias!`;
    return m;
  }

  function enviar() {
    if (!Object.keys(carrito).length) return;
    const url = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(construirMensaje())}`;
    if (url.length > 7000) {
      alert('Tu pedido es muy largo para enviarlo en un solo mensaje. Divídelo en dos pedidos, por favor.');
      return;
    }
    window.open(url, '_blank', 'noopener');
  }

  /* ---------- Eventos ---------- */
  fab.onclick = () => abrir(true);
  overlay.onclick = () => abrir(false);
  $('#cart-close').onclick = () => abrir(false);
  $('#cart-send').onclick = enviar;
  $('#cart-clear').onclick = () => { if (confirm('¿Vaciar todo el pedido?')) { carrito = {}; guardar(); pintar(); } };

  pintar();
})();
