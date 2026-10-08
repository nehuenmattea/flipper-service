// Menú móvil
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Efecto de tipeo en el hero
const boot = document.getElementById('boot');
const text = boot.textContent;
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  boot.textContent = '';
  let i = 0;
  const t = setInterval(() => {
    boot.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(t);
  }, 90);
}

// Botón "Insertar ficha" con beep retro
let credits = 0;
const creditsEl = document.getElementById('credits');
document.getElementById('coin').addEventListener('click', () => {
  credits++;
  creditsEl.textContent = String(credits).padStart(2, '0');
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.25);
  } catch (e) {}
});

// Formulario -> WhatsApp (cambiar el número)
const WA_NUMBER = '5491159793232';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('nombre').value.trim();
  const t = document.getElementById('tipo').value;
  const m = document.getElementById('msg').value.trim();
  const msg = `Hola, soy ${n}. Consulta por ${t}: ${m}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// ---------- Referencias: fotos y videos ----------
// Poné los archivos en la carpeta /media y editá esta lista.
// type: 'img' (foto), 'video' (archivo mp4) o 'youtube' (solo el id del video)
const REFERENCIAS = [
  { type: 'img',     src: 'media/ref1.jpg', caption: 'Flipper restaurado, Bar El Ejemplo' },
  { type: 'video',   src: 'media/ref2.mp4', caption: 'Arcade funcionando después del service' },
  { type: 'img',     src: 'media/ref3.jpg', caption: 'Poole con paño nuevo' },
  // { type: 'youtube', id: 'ID_DEL_VIDEO', caption: 'Video del taller' },
];

const gallery = document.getElementById('gallery');
const lb = document.getElementById('lb');
const lbimg = document.getElementById('lbimg');

function placeholder(el) {
  const p = document.createElement('div');
  p.className = 'm ph';
  p.textContent = 'FOTO / VIDEO PRÓXIMAMENTE';
  el.replaceWith(p);
}

REFERENCIAS.forEach(r => {
  const fig = document.createElement('figure');
  let el;
  if (r.type === 'video') {
    el = document.createElement('video');
    el.src = r.src; el.controls = true; el.preload = 'metadata'; el.playsInline = true;
    el.addEventListener('error', () => placeholder(el));
  } else if (r.type === 'youtube') {
    el = document.createElement('iframe');
    el.src = 'https://www.youtube-nocookie.com/embed/' + r.id;
    el.title = r.caption || 'Video'; el.loading = 'lazy'; el.allowFullscreen = true;
  } else {
    el = document.createElement('img');
    el.src = r.src; el.alt = r.caption || ''; el.loading = 'lazy';
    el.addEventListener('error', () => placeholder(el));
    el.addEventListener('click', () => { lbimg.src = el.src; lbimg.alt = el.alt; lb.showModal(); });
  }
  el.classList.add('m');
  fig.appendChild(el);
  if (r.caption) { const c = document.createElement('figcaption'); c.textContent = r.caption; fig.appendChild(c); }
  gallery.appendChild(fig);
});

document.getElementById('lbx').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
