// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.section-head, .feature-card, .step, .audience-grid > div, .portal, .tag-card, .member, .cta-inner'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

// Animated hero stat counters
const stats = document.querySelectorAll('.hero-stats strong[data-count]');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1200;
    let start = null;
    function step(ts){
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to) + suf; // easeOutCubic
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    statIO.unobserve(el);
  });
}, { threshold: 0.5 });
stats.forEach((el) => statIO.observe(el));

// Optional: rotate the hero tagline (uncomment to enable)
// const taglines = ['Game news, cut to the point.', 'Signal only. Zero noise.', 'The future of the feed.'];
// let t = 0; const tagEl = document.getElementById('tagline');
// setInterval(() => { t = (t + 1) % taglines.length; tagEl.textContent = taglines[t]; }, 4000);
