const header = document.querySelector("#siteHeader");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 32);
};

document.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.querySelector(".inquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Inquiry ready";
  setTimeout(() => {
    button.textContent = "Send inquiry";
  }, 1800);
});

// Hero parallax 3D effect (clamped to keep image in-frame)
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const img = hero.querySelector('.hero-media img');
  if (!img) return;

  let mouseX = 0, mouseY = 0, scrollP = 0;
  let rafId = null;

  const bounds = () => hero.getBoundingClientRect();

  function updateTransform() {
    const r = bounds();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (mouseX - cx) / r.width; // -0.5..0.5
    const dy = (mouseY - cy) / r.height;

    // Reduce multipliers and clamp so image doesn't slip out of frame
    const rotateY = Math.max(-3, Math.min(3, dx * 3)); // degrees
    const rotateX = Math.max(-3, Math.min(3, -dy * 3)); // degrees
    const translateX = Math.max(-10, Math.min(10, dx * 8)); // px
    const translateY = Math.max(-10, Math.min(10, dy * 8 + scrollP * 12)); // px

    img.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    rafId = null;
  }

  hero.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(updateTransform);
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1.03)';
  });

  // subtle scroll parallax (updates shared state rather than overwriting)
  window.addEventListener('scroll', () => {
    const r = bounds();
    const offset = (window.scrollY - r.top) / window.innerHeight;
    scrollP = Math.max(-0.25, Math.min(0.25, offset * 0.25));
    if (!rafId) rafId = requestAnimationFrame(updateTransform);
  }, { passive: true });
})();
