// Publication list with search, filters and sorting. Data: assets/data/publications.js
(function () {
  var lang = document.currentScript.getAttribute('data-lang') || 'id';
  var L = {
    id: {
      types: { J: 'Jurnal', P: 'Prosiding', B: 'Buku' },
      topics: { kapal: 'Kapal & hidrodinamika', wec: 'Energi gelombang', offshore: 'Lepas pantai & hidrogen', fluida: 'Fluida & perpipaan' },
      all: 'Semua', allTopics: 'Semua topik', first: 'Penulis pertama', firstOnly: 'Penulis pertama saja',
      link: 'Tautan', offline: 'Tidak tersedia daring', count: function (n) { return n + ' publikasi'; }
    },
    en: {
      types: { J: 'Journal', P: 'Conference', B: 'Book' },
      topics: { kapal: 'Ships & hydrodynamics', wec: 'Wave energy', offshore: 'Offshore & hydrogen', fluida: 'Fluids & piping' },
      all: 'All', allTopics: 'All topics', first: 'First author', firstOnly: 'First author only',
      link: 'Link', offline: 'Not available online', count: function (n) { return n === 1 ? '1 publication' : n + ' publications'; }
    }
  }[lang];

  var all = (window.PUBLICATIONS || []).map(function (p, i) {
    var doi = p.url && p.url.indexOf('doi.org/') >= 0 ? 'doi.org/' + p.url.split('doi.org/')[1] : '';
    return {
      ord: i, y: p.y, type: p.type, topic: p.topic,
      t: (lang === 'en' && p.t_en) || p.t,
      v: (lang === 'en' && p.v_en) || p.v,
      a1: p.a1 || '', a3: p.a3 || '', url: p.url || '',
      isFirst: !p.a1, urlText: doi || p.lbl || L.link
    };
  });

  var state = { type: 'all', topic: 'all', q: '', first: false, sort: 'desc' };
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  function chips(container, key, defs) {
    container.textContent = '';
    defs.forEach(function (d) {
      var on = state[key] === d.k;
      var b = el('button', { type: 'button', 'aria-pressed': on ? 'true' : 'false', 'class': on ? 'chipon' : 'chip' }, [
        d.label + ' ',
        el('span', { 'class': 'mono', style: on ? 'font-size: 12px; opacity: 0.85' : 'font-size: 12px; color: #2C4A5C', text: String(d.n) })
      ]);
      b.addEventListener('click', function () { state[key] = d.k; render(); });
      container.appendChild(b);
    });
  }

  function count(k, v) { return all.filter(function (p) { return p[k] === v; }).length; }

  function render() {
    var ql = state.q.trim().toLowerCase();
    var list = all.filter(function (p) {
      return (state.type === 'all' || p.type === state.type) &&
        (state.topic === 'all' || p.topic === state.topic) &&
        (!state.first || p.isFirst) &&
        (!ql || (p.t + ' ' + p.a1 + ' Waskito K.T. ' + p.a3 + ' ' + p.v).toLowerCase().indexOf(ql) >= 0);
    });
    list.sort(function (a, b) {
      return state.sort === 'desc' ? (b.y - a.y || a.ord - b.ord) : (a.y - b.y || a.ord - b.ord);
    });

    chips($('pub-types'), 'type', [
      { k: 'all', label: L.all, n: all.length },
      { k: 'J', label: L.types.J, n: count('type', 'J') },
      { k: 'P', label: L.types.P, n: count('type', 'P') },
      { k: 'B', label: L.types.B, n: count('type', 'B') }
    ]);
    chips($('pub-topics'), 'topic', [{ k: 'all', label: L.allTopics, n: all.length }].concat(
      ['kapal', 'wec', 'offshore', 'fluida'].map(function (k) { return { k: k, label: L.topics[k], n: count('topic', k) }; })
    ));

    var fb = $('pub-first');
    fb.className = state.first ? 'chipon' : 'chip';
    fb.setAttribute('aria-pressed', state.first ? 'true' : 'false');
    fb.textContent = (state.first ? '✓ ' : '') + L.firstOnly;

    $('pub-shown').textContent = list.length;
    $('pub-total').textContent = all.length;
    $('pub-reset').hidden = !(state.type !== 'all' || state.topic !== 'all' || state.first || ql);
    var empty = $('pub-empty');
    empty.hidden = list.length > 0;
    empty.style.display = list.length ? 'none' : 'flex';

    var box = $('pub-list');
    box.textContent = '';
    var groups = [];
    list.forEach(function (p) {
      var g = groups[groups.length - 1];
      if (!g || g.year !== p.y) { g = { year: p.y, items: [] }; groups.push(g); }
      g.items.push(p);
    });
    groups.forEach(function (g) {
      var ol = el('ol', { style: 'flex: 999 1 600px; min-width: 0; list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; border-top: 2px solid #155A75' });
      g.items.forEach(function (p) {
        var badges = el('div', { style: 'display: flex; flex-wrap: wrap; gap: 6px' }, [
          el('span', { 'class': 'badge', style: 'background: #155A75; color: #FFFFFF', text: L.types[p.type] }),
          el('span', { 'class': 'badge', text: L.topics[p.topic] }),
          p.isFirst ? el('span', { 'class': 'badge', style: 'background: #FDF1CF; color: #5A4300', text: L.first }) : null
        ]);
        var link = p.url
          ? el('a', { 'class': 'lk mono', href: p.url, style: 'font-size: 13px; overflow-wrap: anywhere; align-self: flex-start', text: p.urlText + ' ↗' })
          : el('span', { 'class': 'mono', style: 'font-size: 13px; color: #2C4A5C', text: L.offline });
        ol.appendChild(el('li', { style: 'background: #FFFFFF; border: 1px solid #C3DDE6; border-top: 0; padding: 18px 22px; display: flex; flex-direction: column; gap: 8px' }, [
          badges,
          el('h3', { style: 'margin: 0; font-size: 17px; font-weight: 600; line-height: 1.45', text: p.t }),
          el('span', { style: 'font-size: 14px; line-height: 1.5; color: #2C4A5C' }, [p.a1, el('strong', { style: 'color: #0A2A3D', text: 'Waskito K.T.' }), p.a3]),
          el('span', { style: 'font-size: 14px; color: #2C4A5C' }, [el('em', { text: p.v })]),
          link
        ]));
      });
      box.appendChild(el('div', { style: 'display: flex; flex-wrap: wrap; gap: 16px 40px' }, [
        el('div', { style: 'flex: 0 0 120px; display: flex; flex-direction: column; gap: 4px' }, [
          el('h2', { style: "margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 34px; font-weight: 700; color: #155A75", text: String(g.year) }),
          el('span', { 'class': 'mono', style: 'font-size: 12px; color: #2C4A5C', text: L.count(g.items.length) })
        ]),
        ol
      ]));
    });
  }

  function reset() { state.type = 'all'; state.topic = 'all'; state.q = ''; state.first = false; $('pub-q').value = ''; render(); }
  $('pub-q').addEventListener('input', function (e) { state.q = e.target.value; render(); });
  $('pub-sort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
  $('pub-first').addEventListener('click', function () { state.first = !state.first; render(); });
  $('pub-reset').addEventListener('click', reset);
  $('pub-reset2').addEventListener('click', reset);
  render();
})();
