(function () {
  var cfg = window.SITE_CONFIG || {};
  var appUrl = (cfg.appUrl || "").replace(/\/$/, "");
  var digits = (cfg.phone || "").replace(/[^0-9]/g, "");

  function each(sel, fn) { document.querySelectorAll(sel).forEach(fn); }

  each("[data-app-link]", function (a) { a.href = appUrl + a.getAttribute("data-app-link"); });
  each("[data-whatsapp-link]", function (a) {
    a.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(cfg.whatsappMessage || "");
    a.target = "_blank";
    a.rel = "noopener";
  });
  each("[data-phone-link]", function (a) { a.href = "tel:" + cfg.phone; });
  each("[data-email-link]", function (a) {
    a.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Study Acumen enquiry");
  });
  each("[data-phone-text]", function (el) { el.textContent = cfg.phoneDisplay || cfg.phone; });
  each("[data-email-text]", function (el) { el.textContent = cfg.email; });

  // ---- Audience (learner / tutor) ----
  var root = document.documentElement;
  function syncSectionLinks() {
    var a = root.getAttribute("data-audience");
    each("[data-section]", function (link) {
      link.href = a ? "#" + link.getAttribute("data-section") + "-" + a : "#pick";
    });
  }
  function setAudience(a, scroll) {
    root.setAttribute("data-audience", a);
    try { localStorage.setItem("sa-audience", a); } catch (e) {}
    try {
      var url = new URL(location.href);
      url.searchParams.set("for", a);
      url.hash = "";
      history.replaceState(null, "", url);
    } catch (e) {}
    syncSectionLinks();
    if (scroll) {
      var target = document.getElementById("features-" + a);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  each("[data-choose]", function (btn) {
    btn.addEventListener("click", function () {
      var inSwitch = !!btn.closest(".switch");
      setAudience(btn.getAttribute("data-choose"), !inSwitch);
    });
  });
  syncSectionLinks();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header: solid once scrolled past the top of the hero
  var header = document.getElementById("site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    header.classList.toggle("nav-open", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Reveal-on-scroll (content stays visible if IntersectionObserver is missing)
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    each(".reveal", function (el) { io.observe(el); });
  }

  // Top-up calculator: R1 = 5,000 tokens; free allowance is 150,000 tokens/day.
  var range = document.getElementById("calc-amount");
  var out = document.getElementById("calc-out");
  function render() {
    var rand = Number(range.value);
    var tokens = rand * 5000;
    var days = Math.round((tokens / 150000) * 10) / 10;
    out.textContent = "R" + rand + " → " + tokens.toLocaleString("en-ZA") + " tokens ≈ " +
      days + " extra day" + (days === 1 ? "" : "s") + " of AI use";
  }
  range.addEventListener("input", render);
  render();
})();
