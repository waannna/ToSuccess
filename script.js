var $ = function (q) { return document.querySelector(q); };
var S = defaults();

function defaults() {
  var ev = CONFIG.events[CONFIG.event];
  return {
    e: CONFIG.event, t: CONFIG.theme,
    n: CONFIG.recipient.name, d: CONFIG.recipient.titleDegree, m: ev.milestone,
    s: CONFIG.sender.name, r: CONFIG.sender.role,
    h: CONFIG.headline, l: CONFIG.letter.join('\n\n'), p: '', v: 'cover'
  };
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function enc(o) {
  var b = new TextEncoder().encode(JSON.stringify(o)), s = '';
  b.forEach(function (x) { s += String.fromCharCode(x); });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function dec(t) {
  try {
    t = t.replace(/-/g, '+').replace(/_/g, '/');
    var s = atob(t), b = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(b));
  } catch (e) { return null; }
}

var PATS = {
  kawung: function (c) {
    return "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none' stroke='" + c + "' stroke-width='1.5'>" +
      "<ellipse cx='24' cy='12' rx='6' ry='11'/><ellipse cx='24' cy='36' rx='6' ry='11'/>" +
      "<ellipse cx='12' cy='24' rx='11' ry='6'/><ellipse cx='36' cy='24' rx='11' ry='6'/>" +
      "<circle cx='24' cy='24' r='2' fill='" + c + "'/></svg>";
  },
  parang: function (c) {
    return "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none' stroke='" + c + "' stroke-width='2.2' stroke-linecap='round'>" +
      "<path d='M0 40C14 40 14 20 20 20S26 0 40 0'/><path d='M0 20C7 20 7 10 12 10S17 0 20 0'/><path d='M20 40C27 40 27 30 32 30S37 20 40 20'/></svg>";
  },
  truntum: function (c) {
    return "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none' stroke='" + c + "' stroke-width='1.5' stroke-linecap='round'>" +
      "<path d='M18 7V29M7 18H29M10 10L26 26M26 10L10 26'/><circle cx='18' cy='18' r='2.5' fill='" + c + "' stroke='none'/>" +
      "<g fill='" + c + "' stroke='none'><circle cx='0' cy='0' r='1.6'/><circle cx='36' cy='0' r='1.6'/><circle cx='0' cy='36' r='1.6'/><circle cx='36' cy='36' r='1.6'/></g></svg>";
  },
  songket: function (c) {
    return "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none' stroke='" + c + "' stroke-width='1.4'>" +
      "<path d='M16 2L30 16L16 30L2 16Z'/><path d='M16 10L22 16L16 22L10 16Z' fill='" + c + "'/></svg>";
  }
};
function pat(name, color) {
  return 'url("data:image/svg+xml,' + encodeURIComponent(PATS[name](color)) + '")';
}

function applyTheme(key) {
  var t = CONFIG.themes[key] || CONFIG.themes[CONFIG.theme], st = document.body.style;
  ['c', 'p', 'k', 'a', 'b'].forEach(function (x) { st.setProperty('--' + x, t[x]); });
  st.setProperty('--patc', pat(t.pattern, t.pc));
  st.setProperty('--pati', pat(t.pattern, t.ip));
  st.setProperty('--pata', pat(t.pattern, t.a));
}

var G = {
  SP: '<svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg>',
  DOT: '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>',
  RING: '<svg class="o" viewBox="0 0 24 24" stroke-width="3"><circle cx="12" cy="12" r="9"/></svg>',
  SQ: '<svg class="o" viewBox="0 0 48 14" stroke-width="3" stroke-linecap="round"><path d="M2 7q5-8 10 0t10 0 10 0 10 0"/></svg>',
  TRI: '<svg viewBox="0 0 24 24"><path d="M12 3L22 21H2Z"/></svg>',
  STAR: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z"/></svg>',
  BAL: '<svg viewBox="0 0 40 84"><ellipse cx="20" cy="22" rx="16" ry="20"/><path d="M16 42h8l-4 5z"/><path class="s" d="M20 47q-7 11 0 18t0 18"/></svg>',
  CAP: '<svg viewBox="0 0 64 48"><path d="M32 2L62 16L32 30L2 16Z"/><path style="opacity:.75" d="M14 24v12q18 10 36 0V24L32 33Z"/><path class="s" stroke-width="2" d="M58 18v15"/><circle cx="58" cy="36" r="3"/></svg>',
  SCR: '<svg viewBox="0 0 64 32"><rect x="4" y="6" width="56" height="20" rx="10"/><rect x="28" y="3" width="8" height="26" rx="2" style="opacity:.55"/></svg>'
};

function dc(k, l, t, w, col, r, d) {
  return '<i class="dc" style="left:' + l + '%;top:' + t + '%;width:' + w + 'px;color:var(--' + col + ');--r:' + (r || 0) + 'deg;animation-delay:' + (d || 0) + 's">' + G[k] + '</i>';
}

function tumpal(pos) {
  var s = '<svg class="tum ' + pos + '" viewBox="0 0 520 26" preserveAspectRatio="none">';
  for (var i = 0; i < 13; i++) s += '<path d="M' + (i * 40) + ' 26L' + (i * 40 + 20) + ' 4L' + (i * 40 + 40) + ' 26Z"/>';
  return s + '</svg>';
}

var DECOR = {
  folio: function (g) {
    return g
      ? dc('CAP', 70, 5, 76, 'a', 10) + dc('STAR', 7, 20, 24, 'b', -8, 0.4) + dc('SP', 88, 46, 26, 'p', 0, 0.8) +
        dc('SCR', 5, 72, 86, 'a', -12, 0.2) + dc('DOT', 92, 30, 10, 'a') + dc('RING', 9, 52, 22, 'p', 0, 0.6) + dc('STAR', 84, 70, 18, 'b', 14, 1.2)
      : dc('BAL', 5, 14, 44, 'a', -8) + dc('BAL', 84, 12, 40, 'b', 9, 0.7) + dc('SP', 10, 56, 24, 'p', 0, 0.3) +
        dc('SP', 85, 54, 28, 'a', 0, 0.9) + dc('DOT', 92, 40, 10, 'p') + dc('DOT', 6, 42, 12, 'b', 0, 0.5) +
        dc('SQ', 70, 76, 58, 'p', -6, 0.4) + dc('RING', 9, 78, 22, 'b', 0, 1);
  },
  split: function (g) {
    return (g ? dc('CAP', 80, 8, 62, 'a', 10) : dc('BAL', 86, 8, 38, 'a', 8)) +
      dc('SP', 92, 58, 24, 'p', 0, 0.4) + dc('STAR', 56, 12, 16, 'b', 12, 0.8) + dc('DOT', 60, 88, 10, 'a') + dc('SQ', 76, 88, 54, 'p', -6, 0.5);
  },
  arch: function (g) {
    return (g ? dc('SCR', 4, 76, 74, 'a', -14) + dc('CAP', 80, 72, 56, 'a', 12)
              : dc('BAL', 5, 66, 38, 'a', -8) + dc('BAL', 86, 64, 36, 'b', 9, 0.6)) +
      dc('SP', 14, 28, 22, 'p', 0, 0.3) + dc('SP', 82, 26, 24, 'a', 0, 0.8) + dc('STAR', 50, 4, 18, 'a', 0, 0.5) + dc('DOT', 22, 92, 10, 'b');
  },
  polaroid: function (g) {
    return (g ? dc('CAP', 3, 20, 70, 'a', -12) + dc('SCR', 74, 74, 80, 'a', 10)
              : dc('BAL', 3, 24, 40, 'a', -8) + dc('BAL', 88, 20, 38, 'b', 9, 0.6)) +
      dc('SP', 8, 68, 24, 'p', 0, 0.3) + dc('STAR', 90, 52, 22, 'b', 12, 0.9) + dc('SQ', 70, 12, 56, 'p', -6, 0.4);
  }
};

var INDEC = {
  folio: function () { return dc('SP', 88, 8, 26, 'c') + dc('DOT', 80, 13, 9, 'a', 0, 0.5) + dc('STAR', 93, 16, 16, 'b', 10, 1); },
  split: function () { return dc('SP', 92, 6, 22, 'c') + dc('DOT', 86, 12, 8, 'a', 0, 0.5); },
  arch: function () { return dc('SP', 18, 7, 18, 'c') + dc('SP', 78, 7, 18, 'c', 0, 0.6) + dc('STAR', 48, 3, 16, 'a', 0, 0.3); },
  polaroid: function () { return dc('STAR', 90, 14, 20, 'b', 12) + dc('DOT', 6, 12, 9, 'a'); }
};

function edge(L, where) {
  if (L === 'folio') return where === 'cv' ? tumpal('b') : tumpal('t');
  if (L === 'polaroid') return '<div class="bands t"></div><div class="bands bt"></div>';
  return '';
}

function bgDecor() {
  return dc('SP', 4, 14, 36, 'a') + dc('RING', 92, 10, 34, 'c', 0, 0.5) + dc('STAR', 90, 48, 30, 'b', 12, 0.8) +
    dc('SQ', 3, 60, 70, 'c', -8, 0.3) + dc('DOT', 8, 86, 18, 'b', 0, 1) + dc('TRI', 94, 82, 26, 'a', 18, 0.6) + dc('SP', 48, 94, 26, 'c', 0, 1.4);
}

var COVERS = {
  folio: function (P) {
    return '<div class="eb">' + P.tag + '</div><div class="fw"><div class="frame">' + P.photo + '</div>' + P.badge + '</div>' +
      '<div class="pre">' + P.pre + '</div><h1>' + P.name + '</h1>' + P.ms + P.btn;
  },
  split: function (P) {
    return '<div class="sp-photo"><div class="sp-img">' + P.photo + '</div>' + P.badge + '</div>' +
      '<div class="sp-text"><div class="eb">' + P.tag + '</div><div class="pre">' + P.pre + '</div><h1>' + P.name + '</h1>' + P.ms + P.btn + '</div>';
  },
  arch: function (P) {
    return '<div class="eb">' + P.tag + '</div><div class="ar-photo"><div class="ar-img">' + P.photo + '</div>' + P.badge + '</div>' +
      '<div class="pre">' + P.pre + '</div><h1>' + P.name + '</h1>' + P.ms + P.btn;
  },
  polaroid: function (P) {
    return '<div class="eb">' + P.tag + '</div><div class="pl"><i class="tape l"></i><i class="tape r"></i>' +
      '<div class="pl-img">' + P.photo + '</div>' + P.badge +
      '<div class="pl-cap"><div class="pre">' + P.pre + '</div><h1>' + P.name + '</h1></div></div>' + P.ms + P.btn;
  }
};

function cardHTML(d, mode) {
  var th = CONFIG.themes[d.t] || CONFIG.themes[CONFIG.theme], L = COVERS[th.layout] ? th.layout : 'folio';
  var ev = CONFIG.events[d.e] || CONFIG.events.birthday, grad = d.e === 'graduation';
  var name = esc(d.n || 'Nama') + (grad && d.d ? ', ' + esc(d.d) : '');
  var photo = d.p ? '<img alt="Foto ' + esc(d.n) + '" src="' + esc(d.p) + '">' : esc((d.n || '?').trim().charAt(0).toUpperCase());
  var num = ((d.m || '').match(/\d+/) || [''])[0], bt = num || '★';
  var paras = (d.l || '').split(/\n{2,}/).filter(Boolean).map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('');
  var open = mode === 'open';
  var P = {
    tag: esc(ev.tag), pre: esc(ev.pre), name: name, photo: photo,
    badge: '<div class="badge" style="font-size:' + (bt.length > 2 ? '.78rem' : '1.4rem') + '">' + esc(bt) + '</div>',
    ms: d.m ? '<span class="ms">' + esc(d.m) + '</span>' : '',
    btn: open ? '<div class="open"><button class="btn" data-open type="button">Buka kartu</button></div>' : ''
  };

  return '<div class="card l-' + L + '"' + (mode === 'prev' ? ' data-v="' + (d.v || 'cover') + '"' : '') + '>' +
    '<section class="cover" data-cover>' + DECOR[L](grad) + edge(L, 'cv') + COVERS[L](P) + '</section>' +
    '<section class="inside" data-inside' + (open ? ' hidden' : '') + '>' + edge(L, 'in') + INDEC[L]() +
      '<div class="in-side">' + (d.h ? '<div class="hl">' + esc(d.h) + '</div>' : '') +
        '<div class="sign"><div><small>Dari</small><b>' + esc(d.s || '') + '</b></div>' +
        '<div class="rl">' + esc(d.r || '') +
        '<svg class="stamp" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/><path fill="currentColor" d="M40 22l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z"/></svg></div></div>' +
      '</div>' +
      '<div class="in-main"><h2>Hai ' + esc(d.n || '') + ',</h2>' + paras + '</div>' +
    '</section></div>';
}

function viewer(d) {
  document.title = 'Kartu untuk ' + (d.n || 'kamu');
  document.body.dataset.mode = 'view';
  applyTheme(d.t);
  $('#bgdec').innerHTML = bgDecor();
  $('#root').innerHTML = '<div class="viewer">' + cardHTML(d, 'open') +
    '<div class="acts hide" id="acts"><button class="btn" id="again" type="button">Tutup kartu</button>' +
    '<a class="btn" id="mk" href="#">Buat kartu sendiri</a></div></div>';

  $('[data-open]').onclick = function () {
    $('[data-cover]').classList.add('hide');
    $('[data-inside]').hidden = false;
    $('#acts').classList.remove('hide');
    window.scrollTo(0, 0);
    confetti();
  };
  $('#again').onclick = function () {
    $('[data-cover]').classList.remove('hide');
    $('[data-inside]').hidden = true;
    $('#acts').classList.add('hide');
  };
  $('#mk').onclick = function (e) {
    e.preventDefault();
    history.replaceState(null, '', location.pathname);
    S = defaults();
    document.body.dataset.mode = '';
    builder();
  };
}

function builder() {
  var site = CONFIG.site;
  document.title = site.title;
  $('#bgdec').innerHTML = bgDecor();

  var evBtns = Object.keys(CONFIG.events).map(function (k) {
    return '<button class="chip" data-e="' + k + '" type="button">' + esc(CONFIG.events[k].label) + '</button>';
  }).join('');

  $('#root').innerHTML =
  '<div class="wrap"><header class="hero">' + dc('SP', 66, 6, 34, 'a') + dc('STAR', 80, 40, 26, 'b', 14, 0.6) + dc('SQ', 58, 80, 64, 'c', -6, 0.3) +
  '<h1>' + esc(site.headline) + ' <em>' + esc(site.highlight) + '<svg viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M2 8q12-9 24 0t24 0 24 0 24 0 24 0 24 0 24 0 24 0 24 0"/></svg></em></h1>' +
  '<p>' + esc(site.subtitle) + '</p></header>' +
  '<div class="app"><div class="panel">' +
    '<div class="step"><i>1</i>Pilih acara</div><div class="seg">' + evBtns + '</div>' +
    '<div class="step"><i>2</i>Pilih motif &amp; warna</div><div class="tms" id="tms"></div>' +
    '<div class="step"><i>3</i>Untuk siapa?</div>' +
    '<label for="n">Nama penerima</label><input type="text" id="n" maxlength="40">' +
    '<div id="dw"><label for="d">Gelar (mis. S.T., S.Ds.)</label><input type="text" id="d" maxlength="20"></div>' +
    '<label for="m">Keterangan (mis. 24 Tahun / Angkatan 2026)</label><input type="text" id="m" maxlength="30">' +
    '<label for="ph">Foto penerima</label>' +
    '<label class="drop" id="drop" for="ph"><span class="th" id="th">+</span><span><b>Unggah foto</b><small>Klik atau seret ke sini</small></span></label>' +
    '<input id="ph" type="file" accept="image/*" hidden><button class="link hide" id="rm" type="button">Hapus foto</button>' +
    '<div class="step"><i>4</i>Tulis pesan</div>' +
    '<label for="h">Kutipan pembuka</label><input type="text" id="h" maxlength="90">' +
    '<label for="l">Isi surat <span class="cnt" id="lc"></span></label><textarea id="l" maxlength="900"></textarea>' +
    '<div class="hint">Pisahkan paragraf dengan satu baris kosong.</div>' +
    '<div class="step"><i>5</i>Dari siapa?</div>' +
    '<label for="s">Nama pengirim</label><input type="text" id="s" maxlength="40">' +
    '<label for="r">Peran (mis. Sahabatmu)</label><input type="text" id="r" maxlength="30">' +
    '<div class="row"><button class="btn" id="go" type="button">Buat link kartu &rarr;</button></div>' +
    '<div class="share" id="share"><label for="lk">Link kartu siap dikirim</label><input type="text" id="lk" readonly>' +
      '<div class="row"><button class="btn" id="cp" type="button">Salin link</button>' +
      '<a class="btn ghost" id="wa" target="_blank" rel="noopener" href="#">WhatsApp</a>' +
      '<button class="btn ghost hide" id="nat" type="button">Bagikan</button>' +
      '<button class="btn ghost" id="pvw" type="button">Coba sebagai penerima</button></div>' +
      '<div class="hint" id="hn"></div></div>' +
  '</div>' +
  '<div class="pv"><div class="tabs"><button class="chip" data-v="cover" type="button">Sampul</button>' +
  '<button class="chip" data-v="inside" type="button">Isi surat</button></div><div class="stage" id="pc"></div></div>' +
  '</div></div>';

  var tms = $('#tms');
  Object.keys(CONFIG.themes).forEach(function (k) {
    var t = CONFIG.themes[k], b = document.createElement('button');
    b.type = 'button'; b.className = 'tm'; b.dataset.t = k;
    b.innerHTML = '<span class="tmc" data-l="' + (t.layout || 'folio') + '" style="background-color:' + t.c + ';background-image:' + pat(t.pattern, t.pc).replace(/"/g, "'") + '"></span>' + esc(t.label) + '<small>' + esc(t.shape || '') + '</small>';
    tms.appendChild(b);
  });
  tms.onclick = function (e) { var b = e.target.closest('.tm'); if (b) { S.t = b.dataset.t; draw(); } };

  ['n', 'd', 'm', 'h', 'l', 's', 'r'].forEach(function (k) {
    var el = $('#' + k); el.value = S[k] || '';
    el.oninput = function () { S[k] = el.value; draw(); };
  });

  document.querySelectorAll('[data-e]').forEach(function (b) {
    b.onclick = function () {
      var presets = Object.keys(CONFIG.events).map(function (k) { return CONFIG.events[k].milestone; });
      S.e = b.dataset.e;
      if (presets.indexOf(S.m) > -1) S.m = CONFIG.events[S.e].milestone;
      $('#m').value = S.m; draw();
    };
  });
  document.querySelectorAll('.tabs [data-v]').forEach(function (b) { b.onclick = function () { S.v = b.dataset.v; draw(); }; });

  var ph = $('#ph'), dp = $('#drop');
  ph.onchange = function () { if (ph.files[0]) loadPhoto(ph.files[0]); };
  ['dragenter', 'dragover'].forEach(function (t) { dp.addEventListener(t, function (e) { e.preventDefault(); dp.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (t) { dp.addEventListener(t, function (e) { e.preventDefault(); dp.classList.remove('over'); }); });
  dp.addEventListener('drop', function (e) { var f = e.dataTransfer.files[0]; if (f && /^image\//.test(f.type)) loadPhoto(f); });
  $('#rm').onclick = function () { S.p = ''; ph.value = ''; draw(); };

  $('#go').onclick = makeLink;
  $('#cp').onclick = function () {
    var i = $('#lk'), b = $('#cp'); i.select();
    function ok() { b.textContent = 'Tersalin ✓'; }
    function legacy() { try { document.execCommand('copy'); ok(); } catch (x) {} }
    if (navigator.clipboard) navigator.clipboard.writeText(i.value).then(ok, legacy); else legacy();
  };
  $('#pvw').onclick = function () { viewer(Object.assign({}, S)); };
  if (navigator.share) $('#nat').classList.remove('hide');

  draw();
}

function draw() {
  applyTheme(S.t);
  document.querySelectorAll('[data-e]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.e === S.e); });
  document.querySelectorAll('.tabs [data-v]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.v === S.v); });
  document.querySelectorAll('.tm').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.t === S.t); });
  $('#dw').classList.toggle('hide', S.e !== 'graduation');
  $('#lc').textContent = (S.l || '').length + '/900';
  $('#th').innerHTML = S.p ? '<img alt="" src="' + S.p + '">' : '+';
  $('#rm').classList.toggle('hide', !S.p);
  $('#pc').innerHTML = cardHTML(S, 'prev');
}

function loadPhoto(file) {
  var r = new FileReader();
  r.onload = function () {
    var im = new Image();
    im.onload = function () {
      var W = 240, H = 280, c = document.createElement('canvas'); c.width = W; c.height = H;
      var x = c.getContext('2d'), sc = Math.max(W / im.width, H / im.height), w = im.width * sc, h = im.height * sc;
      x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
      x.drawImage(im, (W - w) / 2, (H - h) / 2.4, w, h);
      S.p = c.toDataURL('image/jpeg', 0.6); draw();
    };
    im.src = r.result;
  };
  r.readAsDataURL(file);
}

function makeLink() {
  var o = { e: S.e, t: S.t, n: S.n, d: S.d, m: S.m, s: S.s, r: S.r, h: S.h, l: S.l, p: S.p };
  $('#share').classList.add('on');
  $('#lk').value = 'Membuat link...';

  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(o)
  })
    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
    .then(function (j) { showLink(location.origin + '/?c=' + j.id, true); })
    .catch(function () {
      showLink(location.href.split('#')[0].split('?')[0] + '#c=' + enc(o), false);
    });
}

function showLink(url, short) {
  var msg = CONFIG.shareMessage.replace('{nama}', S.n || 'kamu').replace('{link}', url);
  $('#lk').value = url; $('#cp').textContent = 'Salin link';
  $('#wa').href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  $('#nat').onclick = function () { navigator.share({ title: 'Kartu untuk ' + S.n, text: msg, url: url }).catch(function () {}); };
  $('#hn').textContent = (!short && S.p) ? 'Link lebih panjang karena membawa foto. Kirim lewat tombol salin atau WhatsApp agar tidak terpotong.' : '';
  $('#share').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function confetti() {
  var c = $('#fx'), x = c.getContext('2d'), st = getComputedStyle(document.body);
  c.width = innerWidth; c.height = innerHeight;
  var cols = ['--c', '--a', '--b', '--p'].map(function (v) { return st.getPropertyValue(v).trim(); }), P = [];
  for (var i = 0; i < 130; i++) P.push({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    w: 6 + Math.random() * 7, h: 4 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3,
    a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: cols[i % 4]
  });
  var t = 0;
  (function f() {
    x.clearRect(0, 0, c.width, c.height); t++;
    P.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.a += p.va;
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); x.restore();
    });
    if (t < 240) requestAnimationFrame(f); else x.clearRect(0, 0, c.width, c.height);
  })();
}

(function () {
  var q = location.search.match(/[?&]c=([A-Za-z0-9]+)/),
      m = location.hash.match(/^#c=(.+)$/);

  function open(d) {
    if (d && CONFIG.themes[d.t]) viewer(Object.assign(defaults(), d)); else builder();
  }

  if (q) {
    fetch('/api/get?id=' + q[1])
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(open)
      .catch(function () { open(null); });
  } else {
    open(m && dec(m[1]));
  }
})();