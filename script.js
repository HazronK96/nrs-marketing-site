// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal: tag sections/cards and fade them in on view
const revealEls = document.querySelectorAll(
  '.section-head, .feature-card, .step, .audience-grid > div, .tag-card, .cta-inner'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));

// Optional: rotate the hero tagline through the variations (comment out to keep static)
// const taglines = [
//   'Every headline that matters — summarised, sourced, and built for gamers.',
//   'Less scrolling. More playing.',
//   'The source behind the story.'
// ];
// let t = 0;
// const tagEl = document.getElementById('tagline');
// setInterval(() => { t = (t + 1) % taglines.length; tagEl.textContent = taglines[t]; }, 4000);
