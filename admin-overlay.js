/* =========================================================================
   Admin OVERLAY for the marketing site (index.html).
   Opens on top of the live site via the footer "Admin" link or Ctrl+Shift+A.
   Reuses content.json (localStorage key nrs_content) and feedback
   (localStorage key nrs_feedback). Purely client-side — demo gate only.
   ========================================================================= */
(function () {
  // ---------------- CONFIG ----------------
  const REQUIRE_LOGIN = true;          // set false to skip the login popup
  const ADMIN_PASSWORD = 'admin123';   // change to your own password
  const CONTENT_KEY = 'nrs_content';
  const FEEDBACK_KEY = 'nrs_feedback';

  // ---------------- helpers ----------------
  const $ = (id) => document.getElementById(id);
  const getP = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  const setP = (o, p, v) => { const ks = p.split('.'); const last = ks.pop(); let t = o; ks.forEach(k => { t[k] = t[k] || {}; t = t[k]; }); t[last] = v; };
  const esc2 = (s) => String(s ?? '').replace(/"/g, '&quot;');
  const escA = (s) => String(s ?? '').replace(/</g, '&lt;');
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Singapore-style: "27 October 2026, 11:26 PM" (day month year, then time)
  const fmtDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d)) return esc(iso);
    const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
      .replace(/\s?(am|pm)/i, (m) => ' ' + m.trim().toUpperCase());
    return `${date}, ${time}`;
  };

  let content = {};

  async function fetchFile() { const r = await fetch('content.json', { cache: 'no-store' }); return r.json(); }
  async function loadContent(forceFile) {
    if (!forceFile) { const s = localStorage.getItem(CONTENT_KEY); if (s) { try { return JSON.parse(s); } catch (e) {} } }
    return fetchFile();
  }

  // ---------------- editable schema (mirrors admin.html) ----------------
  const GROUPS = [
    ['Brand & Hero', [
      ['Brand name', 'brand.name'], ['Hero — eyebrow', 'hero.eyebrow'],
      ['Hero — title (lead)', 'hero.titleLead'], ['Hero — title (highlight)', 'hero.titleHighlight'],
      ['Hero — tagline', 'hero.tagline'], ['Hero — subtext', 'hero.sub', 'area'],
    ]],
    ['Trust bar & Watch', [
      ['Trust bar — heading', 'trustbar.heading'], ['Watch — eyebrow', 'watch.eyebrow'],
      ['Watch — heading', 'watch.heading'], ['Watch — subtext', 'watch.sub', 'area'],
    ]],
    ['Features (section text)', [
      ['Features — eyebrow', 'features.eyebrow'], ['Features — heading', 'features.heading'],
      ['Features — subtext', 'features.sub', 'area'],
    ]],
    ['Getting Started (section text)', [
      ['Getting Started — eyebrow', 'gettingStarted.eyebrow'], ['Getting Started — heading', 'gettingStarted.heading'],
    ]],
    ['Audience', [
      ['Audience — eyebrow', 'audience.eyebrow'], ['Audience — heading', 'audience.heading'],
      ['Audience — text', 'audience.text', 'area'], ['Audience — quote', 'audience.quote', 'area'],
      ['Audience — quote by', 'audience.quoteBy'],
    ]],
    ['Launch', [
      ['Launch — eyebrow', 'access.eyebrow'], ['Launch — heading', 'access.heading'],
      ['Launch — subtext', 'access.sub', 'area'],
    ]],
    ['Feedback', [
      ['Feedback — eyebrow', 'feedback.eyebrow'], ['Feedback — heading', 'feedback.heading'],
      ['Feedback — subtext', 'feedback.sub', 'area'], ['Formspree form ID (optional)', 'feedback.formspreeId'],
    ]],
    ['CTA & Footer', [
      ['CTA — eyebrow', 'cta.eyebrow'], ['CTA — heading', 'cta.heading'],
      ['CTA — subtext', 'cta.sub', 'area'], ['Footer — copyright', 'footer.copyright'],
    ]],
  ];
  const ARRAYS = [
    ['Hero stats', 'hero.stats', [['count', 'Number', 'num'], ['suffix', 'Suffix'], ['label', 'Label']]],
    ['Trust bar items', 'trustbar.items', 'strings'],
    ['Features', 'features.items', [['icon', 'Icon'], ['title', 'Title'], ['text', 'Text', 'area']]],
    ['Getting Started steps', 'gettingStarted.steps', [['num', 'No.'], ['title', 'Title'], ['text', 'Text', 'area']]],
    ['Audience points', 'audience.points', 'strings'],
    ['Launch portals', 'access.portals', [['tag', 'Tag'], ['title', 'Title'], ['text', 'Text'], ['href', 'URL'], ['visible', 'Show', 'bool']]],
    ['Team members', 'team.members', [['initial', 'Initial'], ['name', 'Name'], ['role', 'Role']]],
  ];

  function fieldRow(label, path, type) {
    const val = getP(content, path) ?? '';
    const ctrl = (type === 'area')
      ? `<textarea data-path="${path}" rows="2">${escA(val)}</textarea>`
      : `<input type="text" data-path="${path}" value="${esc2(val)}" />`;
    return `<label class="afield"><span>${label}</span>${ctrl}</label>`;
  }
  function arrayItemHTML(path, defs, item, i) {
    if (defs === 'strings') {
      return `<div class="aitem"><input type="text" data-arr="${path}" data-i="${i}" data-key="__str" value="${esc2(item)}" />
        <button type="button" class="del-item" data-arr="${path}" data-i="${i}">✕</button></div>`;
    }
    const inner = defs.map(([key, label, type]) => {
      const v = item?.[key] ?? '';
      if (type === 'bool') return `<label class="mini"><input type="checkbox" data-arr="${path}" data-i="${i}" data-key="${key}" ${v ? 'checked' : ''}/> ${label}</label>`;
      if (type === 'area') return `<label class="mini wide"><span>${label}</span><textarea rows="2" data-arr="${path}" data-i="${i}" data-key="${key}">${escA(v)}</textarea></label>`;
      const t = type === 'num' ? 'number' : 'text';
      return `<label class="mini"><span>${label}</span><input type="${t}" data-arr="${path}" data-i="${i}" data-key="${key}" value="${esc2(v)}"/></label>`;
    }).join('');
    return `<div class="aitem card">${inner}<button type="button" class="del-item" data-arr="${path}" data-i="${i}">✕ Remove</button></div>`;
  }

  function buildFields() {
    const wrap = $('ovFields');
    wrap.innerHTML = '';
    GROUPS.forEach(([title, fields]) => {
      const sec = document.createElement('details'); sec.className = 'agroup'; sec.open = false;
      let html = `<summary>${title}</summary><div class="agrid">`;
      fields.forEach(([l, p, t]) => { html += fieldRow(l, p, t); });
      html += '</div>'; sec.innerHTML = html; wrap.appendChild(sec);
    });
    const vis = document.createElement('details'); vis.className = 'agroup';
    vis.innerHTML = `<summary>Visibility</summary><div class="agrid">
      <label class="afield toggle"><span>Show team section</span><input type="checkbox" data-path="team.visible" ${content?.team?.visible !== false ? 'checked' : ''}/></label>
      <label class="afield toggle"><span>Show admin link in footer</span><input type="checkbox" data-path="footer.showAdminLink" ${content?.footer?.showAdminLink !== false ? 'checked' : ''}/></label>
    </div>`;
    wrap.appendChild(vis);
    ARRAYS.forEach(([title, path, defs]) => {
      const arr = getP(content, path) || [];
      const sec = document.createElement('details'); sec.className = 'agroup';
      let html = `<summary>${title} <span class="count">(${arr.length})</span></summary><div class="alist">`;
      arr.forEach((it, i) => { html += arrayItemHTML(path, defs, it, i); });
      html += `</div><button type="button" class="btn btn-ghost add-item" data-arr="${path}">+ Add</button>`;
      sec.innerHTML = html; wrap.appendChild(sec);
    });
    wrap.querySelectorAll('.add-item').forEach(b => b.addEventListener('click', onAdd));
    wrap.querySelectorAll('.del-item').forEach(b => b.addEventListener('click', onDel));
  }
  function onAdd(e) {
    collect(); const path = e.target.dataset.arr;
    const defs = ARRAYS.find(a => a[1] === path)[2];
    const arr = getP(content, path) || [];
    if (defs === 'strings') arr.push('New item');
    else { const o = {}; defs.forEach(([k, , t]) => o[k] = (t === 'bool' ? true : (t === 'num' ? 0 : ''))); arr.push(o); }
    setP(content, path, arr); buildFields();
  }
  function onDel(e) {
    collect(); const path = e.target.dataset.arr, i = +e.target.dataset.i;
    const arr = getP(content, path) || []; arr.splice(i, 1); setP(content, path, arr); buildFields();
  }
  function collect() {
    document.querySelectorAll('#ovFields [data-path]').forEach(n => {
      const p = n.getAttribute('data-path');
      setP(content, p, n.type === 'checkbox' ? n.checked : n.value);
    });
    document.querySelectorAll('#ovFields [data-arr][data-i]').forEach(n => {
      const path = n.dataset.arr, i = +n.dataset.i, key = n.dataset.key;
      const arr = getP(content, path) || [];
      if (key === '__str') arr[i] = n.value;
      else { arr[i] = arr[i] || {}; arr[i][key] = n.type === 'checkbox' ? n.checked : (n.type === 'number' ? (n.value === '' ? '' : Number(n.value)) : n.value); }
      setP(content, path, arr);
    });
  }

  function apply() {
    collect();
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    $('ovNote').textContent = '✓ Applied — refreshing site…';
    // Re-render the live page if script.js exposed a renderer, else reload
    if (typeof window.NRS_render === 'function') { window.NRS_render(content); setTimeout(() => $('ovNote').textContent = '', 3000); }
    else { setTimeout(() => location.reload(), 500); }
  }
  function exportJSON() {
    collect();
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'content.json'; a.click(); URL.revokeObjectURL(a.href);
  }

  // ---------------- feedback ----------------
  function loadFeedback() { try { return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]'); } catch (e) { return []; } }
  function renderFeedback() {
    const list = loadFeedback();
    $('ovFbCount').textContent = list.length;
    const wrap = $('ovFeedbackList');
    if (!list.length) { wrap.innerHTML = '<p class="empty">No feedback yet. Submissions from the site\'s feedback form appear here.</p>'; return; }
    wrap.innerHTML = '';
    list.slice().reverse().forEach(f => {
      const r = +f.rating || 0;
      const stars = `<span class="on">${'★'.repeat(r)}</span>${'★'.repeat(5 - r)}`;
      const c = document.createElement('div'); c.className = 'fb-card';
      c.innerHTML = `<div class="fb-head"><strong>${esc(f.name)}</strong><span class="fb-stars">${stars}</span></div>
        <div class="fb-sub">${esc(f.email || 'no email')} · ${fmtDate(f.date)}</div><p>${esc(f.message)}</p>`;
      wrap.appendChild(c);
    });
  }
  function exportCSV() {
    const list = loadFeedback();
    const rows = [['date', 'name', 'email', 'rating', 'message']].concat(list.map(f => [f.date, f.name, f.email, f.rating, (f.message || '').replace(/\n/g, ' ')]));
    const csv = rows.map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nrs-feedback.csv'; a.click(); URL.revokeObjectURL(a.href);
  }

  // ---------------- open / close / tabs ----------------
  function show(eln) { eln.hidden = false; eln.style.display = ''; }
  function hide(eln) { eln.hidden = true; eln.style.display = 'none'; }

  async function openPanel() {
    content = await loadContent(false);
    buildFields(); renderFeedback();
    show($('ovBackdrop')); show($('ovPanel'));
    requestAnimationFrame(() => $('ovPanel').classList.add('open'));
  }
  function closeAll() {
    $('ovPanel').classList.remove('open');
    hide($('ovLogin')); hide($('ovBackdrop'));
    setTimeout(() => hide($('ovPanel')), 300);
  }
  function openLogin() {
    if (!REQUIRE_LOGIN) { openPanel(); return; }
    show($('ovBackdrop')); show($('ovLogin'));
    setTimeout(() => $('ovPass').focus(), 50);
  }

  function initTabs() {
    document.querySelectorAll('[data-ovtab]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-ovtab]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const t = b.dataset.ovtab;
      $('ovView-content').hidden = (t !== 'content');
      $('ovView-feedback').hidden = (t !== 'feedback');
      if (t === 'feedback') renderFeedback();
    }));
  }

  // ---------------- wire up ----------------
  document.addEventListener('DOMContentLoaded', () => {
    const link = $('adminLink');
    if (link) link.addEventListener('click', (e) => { e.preventDefault(); openLogin(); });

    // Ctrl+Shift+A shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); openLogin(); }
      if (e.key === 'Escape') closeAll();
    });

    $('ovLoginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if ($('ovPass').value === ADMIN_PASSWORD) { hide($('ovLogin')); $('ovPass').value = ''; $('ovErr').textContent = ''; openPanel(); }
      else { $('ovErr').textContent = 'Incorrect password.'; }
    });
    $('ovLoginCancel').addEventListener('click', closeAll);
    $('ovClose').addEventListener('click', closeAll);
    $('ovBackdrop').addEventListener('click', closeAll);

    $('ovApply').addEventListener('click', apply);
    $('ovExport').addEventListener('click', exportJSON);
    $('ovReload').addEventListener('click', async () => { content = await loadContent(true); buildFields(); $('ovNote').textContent = 'Reset to content.json (not applied).'; });
    $('ovExportFb').addEventListener('click', exportCSV);
    $('ovClearFb').addEventListener('click', () => { if (confirm('Delete all feedback from this browser?')) { localStorage.removeItem(FEEDBACK_KEY); renderFeedback(); } });

    initTabs();
  });
})();
