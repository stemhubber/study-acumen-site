(function () {
  var cfg = window.SITE_CONFIG || {};
  var appUrl = (cfg.appUrl || "").replace(/\/$/, "");

  document.querySelectorAll("[data-app-link]").forEach(function (a) {
    a.href = appUrl + a.getAttribute("data-app-link");
  });

  document.querySelectorAll("[data-contact-link]").forEach(function (a) {
    if (cfg.contactEmail) {
      a.href = "mailto:" + cfg.contactEmail + "?subject=" + encodeURIComponent("Study Acumen enquiry");
    } else {
      a.href = appUrl + "/register";
    }
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Top-up calculator: R1 = 5,000 tokens; free allowance is 150,000 tokens/day.
  var range = document.getElementById("calc-amount");
  var out = document.getElementById("calc-out");
  if (range && out) {
    var render = function () {
      var rand = Number(range.value);
      var tokens = rand * 5000;
      var days = tokens / 150000;
      out.textContent =
        "R" + rand + " → " + tokens.toLocaleString("en-ZA") + " tokens ≈ " +
        (Math.round(days * 10) / 10) + " extra day" + (days === 1 ? "" : "s") + " of AI help";
    };
    range.addEventListener("input", render);
    render();
  }
})();
