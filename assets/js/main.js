// ============================================================
// AIESEC IN BERN - MAIN JS
// Vanilla JS, no framework. Handles:
// 1. Mobile nav toggle + dropdown accordions
// 2. Hero carousels (homepage + exchanges)
// 3. Horizontal scroll row buttons
// 4. Client-side Upcoming/Past event sorting & filtering
// 5. Department picker lightbox (Become a Member)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ---------- 1. Mobile nav ----------
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }
  // Dropdown accordions on mobile (click), hover handled by CSS on desktop
  document.querySelectorAll(".has-dropdown > .dropdown-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.parentElement.classList.toggle("open");
      }
    });
  });

  // ---------- 2. Hero carousels ----------
  function initCarousel(root) {
    if (!root) return;
    var slides = root.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;
    var current = 0;
    function show(i) {
      slides[current].classList.remove("active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("active");
    }
    var prevBtn = root.querySelector(".carousel-prev");
    var nextBtn = root.querySelector(".carousel-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    setInterval(function () { show(current + 1); }, 6000);
  }
  initCarousel(document.getElementById("heroCarousel"));
  initCarousel(document.getElementById("exchangesHeroCarousel"));

  // ---------- 3. Scroll row buttons ----------
  document.querySelectorAll(".scroll-row-wrapper").forEach(function (wrapper) {
    var row = wrapper.querySelector(".scroll-row");
    var left = wrapper.querySelector(".scroll-left");
    var right = wrapper.querySelector(".scroll-right");
    if (!row) return;
    if (left) left.addEventListener("click", function () { row.scrollBy({ left: -280, behavior: "smooth" }); });
    if (right) right.addEventListener("click", function () { row.scrollBy({ left: 280, behavior: "smooth" }); });
  });

  // ---------- 4. Event sorting (upcoming vs. past) ----------
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  function sortEventList(listId, mode, emptyMsgId) {
    var list = document.getElementById(listId);
    if (!list) return;
    var rows = Array.prototype.slice.call(list.querySelectorAll(".event-row"));
    var filtered = rows.filter(function (row) {
      var d = new Date(row.getAttribute("data-date"));
      return mode === "upcoming" ? d >= today : d < today;
    });
    rows.forEach(function (row) { row.style.display = "none"; });
    filtered.sort(function (a, b) {
      var da = new Date(a.getAttribute("data-date"));
      var db = new Date(b.getAttribute("data-date"));
      return mode === "upcoming" ? da - db : db - da;
    });
    filtered.forEach(function (row) {
      row.style.display = "";
      list.appendChild(row);
    });
    var emptyMsg = document.getElementById(emptyMsgId);
    if (emptyMsg) emptyMsg.style.display = filtered.length === 0 ? "block" : "none";
  }
  sortEventList("upcomingEventsList", "upcoming", "noUpcomingMsg");
  sortEventList("pastEventsList", "past", "noPastMsg");

  // ---------- 5. Department picker lightbox ----------
  var lightbox = document.getElementById("departmentLightbox");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxDesc = document.getElementById("lightboxDesc");
  var lightboxImage = document.getElementById("lightboxImage");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".department-item").forEach(function (item) {
    var color = item.getAttribute("data-color");
    if (color) item.style.setProperty("--dept-color", color);
    var onColor = item.getAttribute("data-on-color");
    if (onColor) item.style.setProperty("--dept-on-color", onColor);
    item.addEventListener("click", function () {
      if (!lightbox) return;
      lightboxTitle.textContent = item.getAttribute("data-title");
      lightboxDesc.innerHTML = item.getAttribute("data-desc");
      var imageSrc = item.getAttribute("data-image");
      lightboxImage.style.backgroundImage = imageSrc ? "url('" + imageSrc + "')" : "";
      var color = item.getAttribute("data-color");
      if (color) lightbox.style.setProperty("--dept-color", color);
      var light = item.getAttribute("data-light");
      lightbox.style.setProperty("--dept-light", light || "#fff");
      var textColor = item.getAttribute("data-text-color") || color;
      if (textColor) lightboxTitle.style.color = textColor;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  if (lightboxClose) {
    lightboxClose.addEventListener("click", function () {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }
});
