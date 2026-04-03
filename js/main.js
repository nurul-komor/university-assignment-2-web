/**
 * MegaMart — interaction helpers (Bootstrap handles carousel & dropdowns)
 */

(function () {
  "use strict";

  /** Intersection Observer: fade/slide sections in on scroll */
  function initReveal() {
    var sections = document.querySelectorAll(".mm-reveal");
    if (!sections.length || !("IntersectionObserver" in window)) {
      sections.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );

    sections.forEach(function (el) {
      observer.observe(el);
    });
  }

  /** Single active state for category circles (demo UX) */
  function initCategoryRings() {
    document.querySelectorAll(".mm-cat-circle").forEach(function (circle) {
      circle.addEventListener("click", function () {
        document.querySelectorAll(".mm-cat-circle").forEach(function (c) {
          c.classList.remove("active");
        });
        circle.classList.add("active");
      });
    });
  }

  /** Daily essentials card active toggle */
  function initEssentialCards() {
    document.querySelectorAll(".mm-essential-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".mm-product-actions")) return;
        document.querySelectorAll(".mm-essential-card").forEach(function (c) {
          c.classList.remove("active");
        });
        card.classList.add("active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initCategoryRings();
    initEssentialCards();
  });
})();
