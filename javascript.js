// javascript.js
document.addEventListener("DOMContentLoaded", () => {
  // Heure
  function updateHeure() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const el = document.getElementById("heure");
    if (el) el.textContent = `${h}:${m}`;
  }
  updateHeure();
  setInterval(updateHeure, 60000);

  // Navbar + progress + bouton top
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("progress");
  const toTop = document.getElementById("toTop");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (navbar) navbar.classList.toggle("scrolled", y > 10);

    if (progress) {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const p = scrollable > 0 ? (y / scrollable) * 100 : 0;
      progress.style.width = `${p}%`;
    }

    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Scrollspy (compatible #id et index.html#id)
  const navLinks = document.querySelectorAll(".navbar__link");

  // ✅ MODIFIÉ : ajout de autoformation
  const sections = ["hero", "about", "stages", "projets", "competences", "autoformation", "contact", "competences-bts"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        navLinks.forEach((a) => {
          const href = a.getAttribute("href") || "";
          const isActive = href === `#${id}` || href.endsWith(`#${id}`);
          a.classList.toggle("active", isActive);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
  );
  sections.forEach((s) => spyObserver.observe(s));

  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openMenu() {
    if (!mobileMenu || !backdrop || !menuToggle) return;
    mobileMenu.classList.add("open");
    backdrop.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!mobileMenu || !backdrop || !menuToggle) return;
    mobileMenu.classList.remove("open");
    backdrop.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (mobileMenu && mobileMenu.classList.contains("open")) closeMenu();
      else openMenu();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  mobileLinks.forEach((l) => l.addEventListener("click", closeMenu));
});
