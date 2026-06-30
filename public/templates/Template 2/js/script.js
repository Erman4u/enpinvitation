/* ============================================
   EnP Digital Service — Wedding Invitation
   Main Script — Clean & Optimized
   ============================================ */

(function () {
  "use strict";

  // ── DOM References ──
  const popup = document.getElementById("myPopup");
  const openBtn = document.getElementById("openInvitation");
  const bgAudio = document.getElementById("bgAudio");
  const musicToggle = document.getElementById("musicToggle");
  const themeToggle = document.getElementById("themeToggle");
  const floatingControls = document.getElementById("floatingControls");
  const navItems = document.querySelectorAll(".nav-item[data-section]");
  const popupKepada = document.getElementById("popupKepada");

  // ── Read ?to= URL param (guest name) ──
  var urlParams = new URLSearchParams(window.location.search);
  var guestName = urlParams.get("to") ? decodeURIComponent(urlParams.get("to")) : "";

  // Show guest name on popup cover with typewriter effect
  if (popupKepada) {
    if (guestName) {
      popupKepada.innerHTML = "Kepada Yth: <br><span id='guestNameTyping'></span><span class='typewriter-cursor'></span>";
      setTimeout(function() {
        typeWriter(guestName, "guestNameTyping", 0);
      }, 500); // Wait a bit for the popup to show fully
    } else {
      popupKepada.innerHTML = "";
    }
  }

  function typeWriter(text, elementId, index) {
    if (index < text.length) {
      document.getElementById(elementId).innerHTML += text.charAt(index);
      setTimeout(function() {
        typeWriter(text, elementId, index + 1);
      }, 100);
    } else {
      // Remove cursor after typing completes
      var cursor = document.querySelector('.typewriter-cursor');
      if (cursor) {
        setTimeout(function() { cursor.style.display = 'none'; }, 2000);
      }
    }
  }

  // ── State ──
  let isAudioPlaying = false;
  let countdownInterval = null;
  let slideInterval = null;

  // ══════════════════════════════════════════════
  // POPUP / COVER
  // ══════════════════════════════════════════════
  function showPopup() {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      popup.style.transform = "translateY(0)";
      popup.style.opacity = 1;
    }, 50);
  }

  function hidePopup() {
    popup.style.transform = "translateY(-100%)";
    popup.style.opacity = 0;
    document.body.style.overflow = "auto";

    setTimeout(function () {
      popup.style.display = "none";
      popup.style.opacity = 1;
      popup.style.transform = "translateY(0)";
    }, 4000);

    // Start audio
    bgAudio.play().then(function () {
      isAudioPlaying = true;
      updateMusicButton();
    }).catch(function () {
      isAudioPlaying = false;
      updateMusicButton();
    });

    // Show floating controls
    floatingControls.style.display = "flex";

    // Start slider & countdown
    startSlider();
    startCountdown();
  }

  if (openBtn) {
    openBtn.addEventListener("click", hidePopup);
  }

  window.addEventListener("load", showPopup);

  // ══════════════════════════════════════════════
  // MUSIC TOGGLE
  // ══════════════════════════════════════════════
  function updateMusicButton() {
    if (!musicToggle) return;

    if (isAudioPlaying) {
      musicToggle.classList.add("music-playing");
      musicToggle.setAttribute("title", "Pause Musik");
      musicToggle.innerHTML = '<i data-feather="volume-2"></i>';
    } else {
      musicToggle.classList.remove("music-playing");
      musicToggle.setAttribute("title", "Play Musik");
      musicToggle.innerHTML = '<i data-feather="volume-x"></i>';
    }
    feather.replace();
  }

  function toggleMusic() {
    if (isAudioPlaying) {
      bgAudio.pause();
      isAudioPlaying = false;
    } else {
      bgAudio.play();
      isAudioPlaying = true;
    }
    updateMusicButton();
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }

  // ══════════════════════════════════════════════
  // DARK / LIGHT THEME TOGGLE
  // ══════════════════════════════════════════════
  function getStoredTheme() {
    return localStorage.getItem("enp-theme") || "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("enp-theme", theme);
    updateThemeButton(theme);
  }

  function updateThemeButton(theme) {
    if (!themeToggle) return;

    if (theme === "dark") {
      themeToggle.innerHTML = '<i data-feather="sun"></i>';
      themeToggle.setAttribute("title", "Mode Terang");
    } else {
      themeToggle.innerHTML = '<i data-feather="moon"></i>';
      themeToggle.setAttribute("title", "Mode Gelap");
    }
    feather.replace();
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  // Initialize theme from localStorage
  applyTheme(getStoredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // ══════════════════════════════════════════════
  // HERO SLIDER
  // ══════════════════════════════════════════════
  function startSlider() {
    var slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    // Clear existing to prevent duplicates
    if (slideInterval) clearInterval(slideInterval);

    // Ensure only one slide is active initially if not already set
    var activeSlide = document.querySelector(".slide.active");
    var currentSlide = 0;
    if (activeSlide) {
      currentSlide = Array.from(slides).indexOf(activeSlide);
    } else {
      slides[0].classList.add("active");
    }

    slideInterval = setInterval(function () {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }

  // ══════════════════════════════════════════════
  // COUNTDOWN TIMER
  // ══════════════════════════════════════════════
  function startCountdown() {
    var countDownDate = new Date("Mar 15, 2027 10:00:00").getTime();

    var daysEl = document.getElementById("days");
    var hoursEl = document.getElementById("hours");
    var minutesEl = document.getElementById("minutes");
    var secondsEl = document.getElementById("seconds");
    var countdownEl = document.getElementById("countdown");

    // Clear existing to prevent duplicates
    if (countdownInterval) clearInterval(countdownInterval);

    function updateCountdown() {
      // Logic moved out of the early return to ensure clean state if restarted
      var now = new Date().getTime();
      var distance = countDownDate - now;

      if (distance < 0) {
        if (countdownInterval) clearInterval(countdownInterval);
        if (countdownEl) countdownEl.innerHTML = '<p style="color: var(--accent); font-size: 2rem;">Hari Bahagia Telah Tiba! 🎉</p>';
        return;
      }

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // ══════════════════════════════════════════════
  // GIFT CARDS TOGGLE
  // ══════════════════════════════════════════════
  var showCardButton = document.getElementById("show-cards");
  var cardContainer = document.getElementById("card-container");

  if (showCardButton && cardContainer) {
    showCardButton.addEventListener("click", function () {
      cardContainer.classList.toggle("show");

      if (cardContainer.classList.contains("show")) {
        var cards = cardContainer.querySelectorAll(".card");
        cards.forEach(function (card, index) {
          card.style.animation = "cardFadeIn 0.3s ease " + (index * 0.15 + 0.1) + "s forwards";
        });
      }
    });
  }

  // ══════════════════════════════════════════════
  // COPY TO CLIPBOARD (Unified)
  // ══════════════════════════════════════════════
  window.copyToClipboard = function (elementId, label) {
    var el = document.getElementById(elementId);
    if (!el) return;

    var text = el.textContent.replace(/-/g, "");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        toastr.success(label + " berhasil disalin!", "Success");
      });
    } else {
      // Fallback
      var textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toastr.success(label + " berhasil disalin!", "Success");
    }
  };

  // ══════════════════════════════════════════════
  // RSVP FORM → WhatsApp Direct
  // ══════════════════════════════════════════════
  var rsvpForm = document.getElementById("rsvpForm");
  var rsvpNamaInput = document.getElementById("rsvpNama");

  // Auto-fill from ?to= param
  if (guestName && rsvpNamaInput) {
    rsvpNamaInput.value = guestName;
  }

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nama = document.getElementById("rsvpNama").value.trim();
      var hadirRadio = document.querySelector('input[name="hadir"]:checked');

      if (!nama || !hadirRadio) {
        toastr.warning("Mohon lengkapi nama dan konfirmasi kehadiran.", "Perhatian");
        return;
      }

      var hadir = hadirRadio.value;

      var message = "*RSVP Pernikahan Blacky & Cimeng*\n\n"
        + "Nama: " + nama + "\n"
        + "Kehadiran: " + hadir;

      var encoded = encodeURIComponent(message);
      var waUrl = "https://api.whatsapp.com/send?phone=6282229243737&text=" + encoded;

      window.open(waUrl, "_blank");
      rsvpForm.reset();
    });
  }

  // ══════════════════════════════════════════════
  // UCAPAN FORM → WhatsApp Direct
  // ══════════════════════════════════════════════
  var ucapanForm = document.getElementById("ucapanForm");
  var ucapanNamaInput = document.getElementById("ucapanNama");

  // Auto-fill from ?to= param
  if (guestName && ucapanNamaInput) {
    ucapanNamaInput.value = guestName;
  }

  if (ucapanForm) {
    ucapanForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nama = document.getElementById("ucapanNama").value.trim();
      var ucapan = document.getElementById("ucapanText").value.trim();

      if (!nama || !ucapan) return;

      var message = "*Ucapan Pernikahan Blacky & Cimeng*\n\n"
        + "Nama: " + nama + "\n"
        + "Ucapan: " + ucapan;

      var encoded = encodeURIComponent(message);
      var waUrl = "https://api.whatsapp.com/send?phone=6282229243737&text=" + encoded;

      window.open(waUrl, "_blank");

      // Reset form
      ucapanForm.reset();
    });
  }

  // ══════════════════════════════════════════════
  // SCROLL SPY — Active Navbar
  // ══════════════════════════════════════════════
  function updateActiveNav() {
    if (document.hidden) return;

    var scrollPos = window.scrollY + 200;
    var activeSet = false;

    // Check sections from bottom to top
    var sections = [];
    navItems.forEach(function (item) {
      var sectionId = item.getAttribute("data-section");
      var section = document.getElementById(sectionId);
      if (section) {
        sections.push({ el: section, navItem: item });
      }
    });

    for (var i = sections.length - 1; i >= 0; i--) {
      var s = sections[i];
      if (scrollPos >= s.el.offsetTop) {
        navItems.forEach(function (n) { n.classList.remove("active"); });
        s.navItem.classList.add("active");
        activeSet = true;
        break;
      }
    }

    if (!activeSet && sections.length > 0) {
      navItems.forEach(function (n) { n.classList.remove("active"); });
      sections[0].navItem.classList.add("active");
    }
  }

  // Throttled scroll handler
  var scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(function () {
      scrollTimeout = null;
      updateActiveNav();
    }, 100);
  });

  // ══════════════════════════════════════════════
  // VISIBILITY CHANGE — Pause background tasks
  // ══════════════════════════════════════════════
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Add class to body to pause CSS animations
      document.body.classList.add("is-hidden");

      // Stop intervals to save CPU
      if (slideInterval) clearInterval(slideInterval);
      if (countdownInterval) clearInterval(countdownInterval);

      // Pause audio when tab is hidden
      if (isAudioPlaying && bgAudio) {
        bgAudio.pause();
      }
    } else {
      // Remove pause class
      document.body.classList.remove("is-hidden");

      // Resume intervals only if popup is hidden (invitation is open)
      if (popup.style.display === "none") {
        startSlider();
        startCountdown();
      }

      // Resume audio when tab is visible
      if (isAudioPlaying && bgAudio) {
        bgAudio.play().catch(function () {});
      }
    }
  });

  // ══════════════════════════════════════════════
  // AOS + FEATHER INIT
  // ══════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize Feather Icons
    feather.replace();

    // Gallery AOS animation
    var galleryImgs = document.querySelectorAll(".img");
    galleryImgs.forEach(function (img, i) {
      img.dataset.aos = "fade-down";
      img.dataset.aosDelay = i * 100;
    });

    // Initialize AOS
    AOS.init({
      duration: 1500,
      once: true,
    });

    // Create floating petals in hero
    createPetals();

    // Toastr config
    if (typeof toastr !== "undefined") {
      toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        timeOut: 3000,
      };
    }
  });

  // ══════════════════════════════════════════════
  // HELPER FOR PETALS
  // ══════════════════════════════════════════════
  function createPetals() {
    var petalsContainer = document.getElementById("heroPetals");
    if (!petalsContainer) return;

    var petalCount = 15;
    for (var i = 0; i < petalCount; i++) {
      var petal = document.createElement("div");
      petal.className = "petal";
      
      // Randomize style
      petal.style.left = Math.random() * 100 + "%";
      petal.style.width = (Math.random() * 10 + 10) + "px";
      petal.style.height = (Math.random() * 10 + 10) + "px";
      petal.style.background = (Math.random() > 0.5) ? "var(--accent)" : "var(--gold-light)";
      petal.style.animationDuration = (Math.random() * 5 + 5) + "s";
      petal.style.animationDelay = (Math.random() * 5) + "s";
      
      petalsContainer.appendChild(petal);
    }
  }
})();
