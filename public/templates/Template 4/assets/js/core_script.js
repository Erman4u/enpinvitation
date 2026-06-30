// ============================================
//  core_script.js — Template 4 Wedding
// ============================================

// --- Flip countdown ---
document.addEventListener("DOMContentLoaded", () => {
  const fdContainer = document.querySelector(".flipdown") || document.getElementById("flipdown");
  if (fdContainer && typeof FlipDown !== "undefined") {
    const timer_ = 1805078400; // Unix timestamp target date
    const flipdown = new FlipDown(timer_);
    flipdown.start();
    flipdown.ifEnded(() => {
      fdContainer.innerHTML = `<h2 style="color:#fff;">🎉 Selamat Menempuh Hidup Baru! 🎉</h2>`;
    });
  }
});

// --- Music player ---
const audio      = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");

if (playButton) {
  playButton.addEventListener("click", () => {
    if (audio && audio.paused) {
      audio.play().catch(e => console.log("Audio play blocked:", e));
      playButton.classList.add("playing");
      playButton.classList.remove("paused");
    } else if (audio) {
      audio.pause();
      playButton.classList.add("paused");
      playButton.classList.remove("playing");
    }
  });
}

// --- Slide gallery ---
let slideIndex = 0;

function showSlide(n) {
  const slides = document.querySelectorAll(".gallery-slider .slide");
  if (!slides.length) return;
  slideIndex = ((n % slides.length) + slides.length) % slides.length;
  slides.forEach(s => s.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}

function plusSlide(n) { showSlide(slideIndex + n); }

// Auto slide every 4 seconds
let slideInterval = setInterval(() => plusSlide(1), 4000);

// --- Open cover (buka undangan) ---
const openBtn      = document.getElementById("open");
const coverOverlay = document.getElementById("cover");
const sectionKecil = document.getElementById("sectionKecil");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    coverOverlay.style.opacity = "0";
    coverOverlay.style.transform = "translateY(-100vh)";

    // Allow sectionKecil to scroll, make body scrollable again
    document.body.style.overflow = "";

    setTimeout(() => {
      coverOverlay.style.display = "none";
      if (sectionKecil) {
        sectionKecil.style.overflowY = "auto";
      }
      if (audio && audio.paused) {
        audio.play().catch(e => console.log("Audio play blocked:", e));
        playButton.classList.add("playing");
        playButton.classList.remove("paused");
      }
    }, 900);
  });
}

// --- Guest name from ?to= URL parameter ---
const urlParams     = new URLSearchParams(window.location.search);
const guestName     = urlParams.get("to");
const guestNameEl   = document.getElementById("guestName");
if (guestName && guestNameEl) {
  guestNameEl.textContent = decodeURIComponent(guestName.replace(/\+/g, " "));
}

// --- Smooth scroll to section ---
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (!el || !sectionKecil) return;
  sectionKecil.scrollTo({
    top: el.offsetTop - 8,
    behavior: "smooth"
  });
};

// --- Active nav highlight (Optimasi menggunakan IntersectionObserver) ---
window.addEventListener("DOMContentLoaded", () => {
  if (!sectionKecil) return;
  const sections = sectionKecil.querySelectorAll(".section-wrap");
  const navLinks  = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: sectionKecil,
    rootMargin: "-50% 0px -50% 0px", // Trigger ketika section di tengah
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
});

// --- Page Visibility API (Optimasi Latar Belakang) ---
let wasPlayingBeforeHidden = false;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause audio jika sedang berjalan
    if (audio && !audio.paused) {
      wasPlayingBeforeHidden = true;
      audio.pause();
      if (playButton) {
        playButton.classList.add("paused");
        playButton.classList.remove("playing");
      }
    } else {
      wasPlayingBeforeHidden = false;
    }

    // Hentikan auto slide
    clearInterval(slideInterval);

    // Pause animasi CSS
    document.body.classList.add("stop-animations");
  } else {
    // Lanjutkan audio jika sebelumnya berjalan
    if (wasPlayingBeforeHidden && audio) {
      audio.play().catch(e => console.log("Audio play blocked:", e));
      if (playButton) {
        playButton.classList.add("playing");
        playButton.classList.remove("paused");
      }
    }

    // Mulai kembali auto slide
    clearInterval(slideInterval);
    slideInterval = setInterval(() => plusSlide(1), 4000);

    // Lanjutkan animasi CSS
    document.body.classList.remove("stop-animations");
  }
});

// --- Gift accordion toggle ---
window.toggleGift = function() {
  const content = document.getElementById('giftContent');
  const btn = document.getElementById('giftToggle');
  if (content && btn) {
    content.classList.toggle('open');
    btn.classList.toggle('active');
    // Update button text
    const isOpen = content.classList.contains('open');
    btn.innerHTML = isOpen 
      ? '<i class="fa fa-gift"></i> Tutup Detail Hadiah <i class="fa fa-chevron-up"></i>'
      : '<i class="fa fa-gift"></i> Lihat Detail Hadiah <i class="fa fa-chevron-down"></i>';
  }
};
