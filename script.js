/* =========================================================================
   News Release System — dynamic marketing site
   Loads content from content.json, then applies any admin edits saved in
   localStorage (key: nrs_content). Renders all sections and handles the
   user feedback form (stored in localStorage key: nrs_feedback).
   ========================================================================= */

const CONTENT_KEY = 'nrs_content';
const FEEDBACK_KEY = 'nrs_feedback';

// --- helpers ---
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

// Load content: start from content.json, then overlay admin edits from localStorage
async function loadContent() {
  let base = {};
  try {
    const res = await fetch('content.json', { cache: 'no-store' });
    base = await res.json();
  } catch (e) {
    console.warn('Could not load content.json (are you viewing over a server?)', e);
  }
  try {
    const saved = localStorage.getItem(CONTENT_KEY);
    if (saved) base = JSON.parse(saved);
  } catch (e) { /* ignore bad saved data */ }
  return base;
}

function render(c) {
  // Simple data-bind: fill any element with [data-bind="path.to.value"]
  document.querySelectorAll('[data-bind]').forEach((node) => {
    const val = getPath(c, node.getAttribute('data-bind'));
    if (val != null && typeof val === 'string') node.textContent = val;
  });

  // Nav
  const nav = $('#navLinks');
  if (nav && c.nav) {
    nav.innerHTML = '';
    c.nav.forEach((n) => { const a = el('a'); a.href = n.href; a.textContent = n.label; nav.appendChild(a); });
  }

  // Hero CTAs
  if (c.hero) {
    const p = $('#heroPrimary'), s = $('#heroSecondary');
    if (p && c.hero.primaryCta) { p.textContent = c.hero.primaryCta.label; p.href = c.hero.primaryCta.href; }
    if (s && c.hero.secondaryCta) { s.textContent = c.hero.secondaryCta.label; s.href = c.hero.secondaryCta.href; }
    // Stats
    const st = $('#heroStats');
    if (st && c.hero.stats) {
      st.innerHTML = '';
      c.hero.stats.forEach((x) => {
        const li = el('li');
        li.innerHTML = `<strong data-count="${esc(x.count)}" data-suffix="${esc(x.suffix || '')}">0</strong><span>${esc(x.label)}</span>`;
        st.appendChild(li);
      });
    }
  }

  // Trust bar
  const ti = $('#trustItems');
  if (ti && c.trustbar?.items) {
    ti.innerHTML = '';
    c.trustbar.items.forEach((t) => ti.appendChild(el('span', null, esc(t))));
  }

  // Features
  const fg = $('#featureGrid');
  if (fg && c.features?.items) {
    fg.innerHTML = '';
    c.features.items.forEach((f) => {
      fg.appendChild(el('div', 'feature-card',
        `<div class="f-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p>`));
    });
  }

  // Getting Started steps
  const sg = $('#stepsGrid');
  if (sg && c.gettingStarted?.steps) {
    sg.innerHTML = '';
    c.gettingStarted.steps.forEach((s) => {
      sg.appendChild(el('div', 'step',
        `<span class="step-num">${esc(s.num)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>`));
    });
  }

  // Audience list
  const al = $('#audienceList');
  if (al && c.audience?.points) {
    al.innerHTML = '';
    c.audience.points.forEach((p) => al.appendChild(el('li', null, esc(p))));
  }

  // Portals (respect visible flag)
  const pg = $('#portalGrid');
  if (pg && c.access?.portals) {
    pg.innerHTML = '';
    c.access.portals.filter((p) => p.visible !== false).forEach((p) => {
      const a = el('a', 'portal');
      a.href = p.href; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = `<span class="portal-tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><span class="portal-go">Launch ↗</span>`;
      pg.appendChild(a);
    });
  }

  // Team (respect visible flag)
  const teamSection = $('#team');
  if (c.team && c.team.visible === false) {
    if (teamSection) teamSection.style.display = 'none';
  } else if (teamSection) {
    teamSection.style.display = '';
    const ts = $('#teamSlots');
    if (ts && c.team?.members) {
      ts.innerHTML = '';
      c.team.members.forEach((m) => {
        ts.appendChild(el('div', 'member',
          `<span class="avatar">${esc(m.initial)}</span><strong>${esc(m.name)}</strong><small>${esc(m.role)}</small>`));
      });
    }
  }

  // CTA button
  if (c.cta?.button) {
    const b = $('#ctaButton');
    if (b) { b.textContent = c.cta.button.label; b.href = c.cta.button.href; }
  }

  // Footer links (respect visible flag)
  const fl = $('#footerLinks');
  if (fl && c.footer?.links) {
    fl.innerHTML = '';
    c.footer.links.filter((l) => l.visible !== false).forEach((l) => {
      const a = el('a'); a.href = l.href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = l.label;
      fl.appendChild(a);
    });
  }

  // Discreet admin link (toggle with footer.showAdminLink)
  const adminLink = $('#adminLink');
  if (adminLink) adminLink.style.display = (c.footer && c.footer.showAdminLink === false) ? 'none' : '';

  // Stash the Formspree id for the feedback handler
  window.__NRS_FORMSPREE_ID = (c.feedback && c.feedback.formspreeId) || '';

  // Footer year
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
}

// Animations: scroll reveal + stat counters (run after render)
function initAnimations() {
  const revealEls = document.querySelectorAll(
    '.section-head, .feature-card, .step, .audience-grid > div, .portal, .member, .cta-inner, .feedback-form'
  );
  revealEls.forEach((e, i) => { e.classList.add('reveal'); e.style.transitionDelay = (i % 3) * 80 + 'ms'; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach((e) => io.observe(e));

  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const node = e.target, to = +node.dataset.count, suf = node.dataset.suffix || '', dur = 1200;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        node.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statIO.unobserve(node);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stats strong[data-count]').forEach((e) => statIO.observe(e));
}

// Feedback form.
//  • If a Formspree form id is set (content.json -> feedback.formspreeId),
//    submissions are POSTed there so they persist across ALL visitors
//    (and are emailed to you / visible in your Formspree dashboard).
//  • A copy is always kept in localStorage too, so the admin "Feedback" tab
//    still works and nothing is lost if the network call fails.
function initStarRating() {
  const wrap = $('#starRating');
  if (!wrap) return;
  const stars = Array.from(wrap.querySelectorAll('.star'));
  const hidden = $('#ratingValue');
  const text = $('#ratingText');
  const labels = { 1: '★ Poor', 2: '★★ Needs work', 3: '★★★ Okay', 4: '★★★★ Great', 5: '★★★★★ Loved it' };
  let current = +(hidden.value || 5);

  const paint = (n) => {
    stars.forEach((s) => s.classList.toggle('on', +s.dataset.val <= n));
    if (text) text.textContent = labels[n] || 'Tap to rate';
  };
  const set = (n) => {
    current = n;
    hidden.value = n;
    stars.forEach((s) => s.setAttribute('aria-checked', String(+s.dataset.val === n)));
    paint(n);
  };

  stars.forEach((s) => {
    const val = +s.dataset.val;
    s.addEventListener('mouseenter', () => paint(val));
    s.addEventListener('focus', () => paint(val));
    s.addEventListener('click', () => set(val));
  });
  wrap.addEventListener('mouseleave', () => paint(current));
  // keyboard arrows
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(Math.min(5, current + 1)); stars[current - 1]?.focus(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(Math.max(1, current - 1)); stars[current - 1]?.focus(); }
  });

  set(current); // initial paint (default 5)
}

function initFeedback() {
  const form = $('#feedbackForm');
  if (!form) return;
  initStarRating();
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = $('#fbStatus');
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      rating: form.rating.value,
      message: form.message.value.trim(),
      date: new Date().toISOString()
    };
    if (!data.name || !data.message) {
      status.textContent = 'Please fill in your name and a message.';
      status.className = 'fb-status err';
      return;
    }

    // Always keep a local copy (admin tab reads these)
    let list = [];
    try { list = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]'); } catch (e) {}
    list.push(data);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));

    const formspreeId = window.__NRS_FORMSPREE_ID || '';
    const btn = form.querySelector('button[type=submit]');

    if (formspreeId) {
      // Send to Formspree so feedback persists for everyone
      status.textContent = 'Sending…';
      status.className = 'fb-status';
      if (btn) btn.disabled = true;
      try {
        const res = await fetch('https://formspree.io/f/' + formspreeId, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          form.reset();
          initStarRating();
          status.textContent = '✓ Thanks! Your feedback was sent.';
          status.className = 'fb-status ok';
        } else {
          status.textContent = '✓ Saved locally (server rejected the send).';
          status.className = 'fb-status ok';
        }
      } catch (e) {
        status.textContent = '✓ Saved locally (offline — will not sync).';
        status.className = 'fb-status ok';
      } finally {
        if (btn) btn.disabled = false;
      }
    } else {
      // No Formspree id configured -> local-only mode
      form.reset();
      initStarRating();
      status.textContent = '✓ Thanks! Your feedback was recorded.';
      status.className = 'fb-status ok';
    }
  });
}

// Expose render so the admin overlay can live-refresh the page after "Apply"
window.NRS_render = function (c) {
  render(c);
  initAnimations();
};

// Boot
(async function () {
  const content = await loadContent();
  render(content);
  initAnimations();
  initFeedback();
})();
