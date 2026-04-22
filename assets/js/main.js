// Maison Lumière — Interactions

(function () {
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu .menu-link");

  // Sticky header background on scroll
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Burger toggle
  const closeMenu = () => {
    burger?.classList.remove("open");
    mobileMenu?.classList.remove("open");
    header?.classList.remove("menu-open");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    burger?.classList.add("open");
    mobileMenu?.classList.add("open");
    header?.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  };
  burger?.addEventListener("click", () => {
    if (burger.classList.contains("open")) closeMenu();
    else openMenu();
  });
  menuLinks.forEach((l) => l.addEventListener("click", closeMenu));

  // Active nav link based on current page
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.getAttribute("data-nav") === path) el.classList.add("active");
  });

  // Reservation form (demo — to wire to PHP backend later)
  const form = document.querySelector("#reservation-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const success = document.querySelector("#reservation-success");
      const nameEl = document.querySelector("#success-name");
      const emailEl = document.querySelector("#success-email");
      if (nameEl) nameEl.textContent = data.nom || "";
      if (emailEl) emailEl.textContent = data.email || "";
      form.style.display = "none";
      if (success) success.style.display = "block";
      window.scrollTo({ top: form.offsetTop - 120, behavior: "smooth" });
    });

    document.querySelector("#new-reservation")?.addEventListener("click", () => {
      const success = document.querySelector("#reservation-success");
      if (success) success.style.display = "none";
      form.style.display = "block";
      form.reset();
    });
  }
})();
