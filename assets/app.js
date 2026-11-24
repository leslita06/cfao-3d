import { VEHICULES } from './data.js?v=20261124e';

const $ = s => document.querySelector(s);
const etat = { v: VEHICULES[0], couleur: null, vue: '1', zoom: 1, px: 0, py: 0, point: null };
const mobile = () => matchMedia('(max-width: 760px)').matches;
const img = (v, c, a) => `assets/img/${v}-${c}-${a}${mobile() ? '-m' : ''}.webp?v=20261124`;

// Choix du vehicule
const nav = $('#modeles');
VEHICULES.forEach(v => {
  const b = document.createElement('button');
  b.className = 'modele'; b.dataset.id = v.id;
  b.innerHTML = `<img src="assets/img/${v.id}-${v.couleurs[0].id}-1-m.webp?v=20261124" alt="" width="120" height="75"><span><strong>${v.nom}</strong><small>${v.type}</small></span>`;
  b.onclick = () => choisir(v.id);
  nav.appendChild(b);
});

function choisir(id) {
  etat.v = VEHICULES.find(x => x.id === id);
  etat.couleur = etat.v.couleurs[0];
  etat.vue = '1'; etat.point = null;
  nav.querySelectorAll('.modele').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  const on = nav.querySelector('.modele.on'); if (on) nav.scrollTo({ left: on.offsetLeft - nav.offsetLeft - 14, behavior: 'instant' });
  history.replaceState(null, '', '#' + id);
  couleurs(); fiche(); pastilles(); recentrer(); afficher(); fermerInfo();
}

function couleurs() {
  const z = $('#couleurs'); z.innerHTML = '';
  etat.v.couleurs.forEach(c => {
    const b = document.createElement('button');
    b.className = 'pastille-couleur' + (c === etat.couleur ? ' on' : '');
    b.style.background = c.hex; b.setAttribute('aria-label', c.nom); b.title = c.nom;
    b.onclick = () => { etat.couleur = c; couleurs(); afficher(); };
    z.appendChild(b);
  });
  $('#nom-couleur').textContent = etat.couleur.nom;
  // prechargement des autres couleurs et angles
  etat.v.couleurs.forEach(c => ['1', '2'].forEach(a => { const i = new Image(); i.src = img(etat.v.id, c.id, a); }));
}

// Modele 3D (model-viewer) : actif seulement si data.js donne un fichier glb pour le vehicule
let mvCharge = null;
function vue3d() {
  const v = etat.v, sc = $('#scene');
  let mv = sc.querySelector('model-viewer');
  if (!v.glb) { if (mv) mv.remove(); sc.classList.remove('en3d'); return false; }
  if (!mvCharge) { mvCharge = document.createElement('script'); mvCharge.type = 'module'; mvCharge.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'; document.head.appendChild(mvCharge); }
  if (!mv) { mv = document.createElement('model-viewer'); ['camera-controls', 'auto-rotate', 'ar', 'shadow-intensity'].forEach(a => mv.setAttribute(a, a === 'shadow-intensity' ? '1' : '')); mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look'); mv.setAttribute('environment-image', 'neutral'); sc.appendChild(mv); }
  mv.src = v.glb + '?v=20261124'; if (v.usdz) mv.setAttribute('ios-src', v.usdz + '?v=20261124');
  mv.alt = v.nom + ' en 3D'; sc.classList.add('en3d');
  return true;
}

function afficher() {
  vue3d();
  const p = $('#photo');
  p.src = img(etat.v.id, etat.couleur.id, etat.vue);
  p.alt = `${etat.v.nom}, couleur ${etat.couleur.nom.toLowerCase()}, vue ${etat.vue === '1' ? 'trois quarts avant' : 'de profil'}`;
  document.querySelectorAll('#vues .chip').forEach(b => b.classList.toggle('on', b.dataset.vue === etat.vue));
  points();
}

// Points d'interet : places sur la vue de profil, listes en pastilles pour les deux vues
function points() {
  const z = $('#points'); z.innerHTML = '';
  if (etat.vue !== '2') return;
  etat.v.points.forEach((pt, i) => {
    const b = document.createElement('button');
    b.className = 'point' + (etat.point === pt.id ? ' on' : '');
    b.style.left = pt.x + '%'; b.style.top = pt.y + '%';
    b.setAttribute('aria-label', pt.titre); b.textContent = i + 1;
    b.onclick = e => { e.stopPropagation(); ouvrir(pt); };
    z.appendChild(b);
  });
}
function pastilles() {
  const z = $('#pastilles'); z.innerHTML = '';
  etat.v.points.forEach((pt, i) => {
    const b = document.createElement('button');
    b.className = 'chip' + (etat.point === pt.id ? ' on' : ''); b.dataset.id = pt.id;
    b.innerHTML = `<span class="num">${i + 1}</span>${pt.titre}`;
    b.onclick = () => ouvrir(pt);
    z.appendChild(b);
  });
}
function ouvrir(pt) {
  etat.point = pt.id;
  if (etat.vue !== '2') { etat.vue = '2'; recentrer(); afficher(); } else points();
  pastilles();
  $('#info-titre').textContent = pt.titre;
  $('#info-texte').textContent = pt.texte;
  const s = etat.v.sources[pt.src];
  const a = $('#info-source'); a.href = s.url; a.textContent = 'Source : ' + s.lib;
  $('#info').hidden = false;
}
function fermerInfo() { etat.point = null; $('#info').hidden = true; points(); pastilles(); }
$('#info-fermer').onclick = fermerInfo;

// Fiche
function fiche() {
  const v = etat.v;
  $('#f-type').textContent = v.type; $('#f-nom').textContent = v.nom;
  $('#f-kpis').innerHTML = v.fiche.map(k => `<div class="kpi"><div class="k-lib">${k.lib}</div><div class="k-val">${k.val}</div><div class="k-ref">${k.note}</div></div>`).join('');
  const txt = `Bonjour CFAO Mobility, je souhaite des informations sur le ${v.nom} et réserver un essai.`;
  $('#wa').href = 'https://wa.me/?text=' + encodeURIComponent(txt);
  $('#f-sources').innerHTML = 'Chiffres : ' + Object.values(v.sources).map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.lib}</a>`).join(', ') + '. Valeurs constructeur indicatives, à confirmer selon la version vendue en Côte d\'Ivoire.';
}

// Vues, rotation par glissement, zoom
document.querySelectorAll('#vues .chip').forEach(b => b.onclick = () => { etat.vue = b.dataset.vue; recentrer(); afficher(); });
const toile = $('#toile'), scene = $('#scene');
function appliquer() {
  etat.zoom = Math.min(3, Math.max(1, etat.zoom));
  const m = (etat.zoom - 1) * 50;
  etat.px = Math.max(-m, Math.min(m, etat.px)); etat.py = Math.max(-m, Math.min(m, etat.py));
  toile.style.transform = `translate(${etat.px}%, ${etat.py}%) scale(${etat.zoom})`;
  scene.classList.toggle('zoome', etat.zoom > 1.01);
}
function recentrer() { etat.zoom = 1; etat.px = 0; etat.py = 0; appliquer(); }
$('#zoom-plus').onclick = () => { etat.zoom += .4; appliquer(); };
$('#zoom-moins').onclick = () => { etat.zoom -= .4; appliquer(); };
$('#recentrer').onclick = recentrer;
scene.addEventListener('wheel', e => { if (scene.classList.contains('en3d')) return; e.preventDefault(); etat.zoom += e.deltaY < 0 ? .2 : -.2; appliquer(); }, { passive: false });

const ptrs = new Map(); let dep = null, dist0 = 0, zoom0 = 1;
scene.addEventListener('pointerdown', e => {
  if (e.target.closest('.point') || scene.classList.contains('en3d')) return;
  scene.setPointerCapture(e.pointerId);
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptrs.size === 1) dep = { x: e.clientX, y: e.clientY, px: etat.px, py: etat.py, tourne: false };
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; dist0 = Math.hypot(a.x - b.x, a.y - b.y); zoom0 = etat.zoom; }
  $('#aide').classList.add('cache');
});
scene.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; etat.zoom = zoom0 * Math.hypot(a.x - b.x, a.y - b.y) / dist0; appliquer(); return; }
  if (!dep) return;
  const dx = e.clientX - dep.x, dy = e.clientY - dep.y, w = scene.clientWidth;
  if (etat.zoom > 1.01) { etat.px = dep.px + dx / w * 100 / etat.zoom; etat.py = dep.py + dy / scene.clientHeight * 100 / etat.zoom; appliquer(); return; }
  if (!dep.tourne && Math.abs(dx) > w * .12) { dep.tourne = true; etat.vue = etat.vue === '1' ? '2' : '1'; afficher(); }
});
const fin = e => { ptrs.delete(e.pointerId); if (!ptrs.size) dep = null; };
scene.addEventListener('pointerup', fin); scene.addEventListener('pointercancel', fin);

// Essai simule
const me = $('#m-essai');
$('#essai').onclick = () => { $('#me-modele').textContent = etat.v.nom + ', ' + etat.couleur.nom.toLowerCase(); $('#form-essai').hidden = false; $('#me-ok').hidden = true; me.hidden = false; };
$('#form-essai').onsubmit = e => {
  e.preventDefault(); const f = new FormData(e.target);
  if (!f.get('nom') || !f.get('tel') || !f.get('date')) { e.target.reportValidity(); return; }
  e.target.hidden = true; $('#me-ok').hidden = false;
  $('#me-recap').textContent = `${etat.v.nom}, le ${new Date(f.get('date')).toLocaleDateString('fr-FR')}. Un conseiller CFAO Mobility vous rappellerait au ${f.get('tel')}.`;
};

// Voir chez moi
$('#ar-go').onclick = () => {
  const v = etat.v, mv = document.querySelector('#scene model-viewer');
  if (v.glb && mv && mv.canActivateAR) { mv.activateAR(); return; }
  $('#ma-texte').textContent = v.glb
    ? 'Sur un téléphone Android ou un iPhone, le véhicule apparaît à taille réelle chez vous, grâce à la caméra.'
    : `Le ${v.nom} n'a pas encore de modèle 3D sous licence libre : la vue en réalité augmentée s'activera dès que BYD ou CFAO Mobility fournira le fichier 3D du véhicule. En attendant, ce sont les photos studio officielles BYD qui s'affichent.`;
  $('#m-ar').hidden = false;
};
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.hidden = true; }));
addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.hidden = true); });

$('#pied').innerHTML = 'Visuels : vues studio officielles BYD (configurateurs <a href="https://bydautomotive.com.au" target="_blank" rel="noopener">BYD Australie</a>), deux angles par couleur ; modèles 3D sous licence libre ajoutés dès qu\'ils seront disponibles. Logos BYD et CFAO Mobility, propriété de leurs titulaires. Page non publiée, réservée à CFAO Mobility Côte d\'Ivoire.';

const h = location.hash.slice(1);
choisir(VEHICULES.some(v => v.id === h) ? h : VEHICULES[0].id);
let mq = mobile(); addEventListener('resize', () => { if (mobile() !== mq) { mq = mobile(); afficher(); } });
