/* ============================================================
   Wedding Invitation — Blacky & Cimeng
   Clean, modular JavaScript
   ============================================================ */

'use strict';

/* ============================================================
   1. GUEST NAME from URL param
   ============================================================ */
function initGuestName() {
  const params   = new URLSearchParams(window.location.search);
  const raw      = params.get('to');
  if (!raw) return;
  const name = decodeURIComponent(raw);
  document.querySelectorAll('[data-guest]').forEach(el => {
    if (el.tagName === 'INPUT') el.value = name;
    else el.textContent = name;
  });
}

/* ============================================================
   2. OPEN INVITATION
   ============================================================ */
function openInvitation() {
  const cover   = document.getElementById('cover');
  const main    = document.getElementById('main-content');
  const nav     = document.getElementById('bottom-nav');
  const music   = document.getElementById('wedding-music');
  const icon    = document.getElementById('music-icon');

  /* Slide cover away */
  cover.style.transform = 'translateY(-100%)';
  document.body.classList.remove('stop-scrolling');

  /* Show content & nav */
  main.style.display  = 'block';
  nav.style.display   = 'flex';
  document.getElementById('music-player').style.display = 'flex';

  /* Auto-play music */
  music.play().catch(() => {/* autoplay blocked */});
  setMusicIcon(true);

  /* Start hero video fresh */
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.currentTime = 0;
    bgVideo.play().catch(() => {});
  }

  /* Start features */
  startCountdown();
  initScrollReveal();
  initNavTracking();
}

/* ============================================================
   3. MUSIC PLAYER
   ============================================================ */
function setMusicIcon(playing) {
  const icon = document.getElementById('music-icon');
  if (!icon) return;
  if (playing) {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-compact-disc', 'playing');
  } else {
    icon.classList.remove('fa-compact-disc', 'playing');
    icon.classList.add('fa-pause');
  }
}

function toggleMusic() {
  const music = document.getElementById('wedding-music');
  if (!music) return;
  if (music.paused) {
    music.play();
    setMusicIcon(true);
  } else {
    music.pause();
    setMusicIcon(false);
  }
}

/* ============================================================
   4. COUNTDOWN TIMER
   ============================================================ */
function startCountdown() {
  const target = new Date('2027-03-15T10:00:00').getTime();

  const els = {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      const el = document.getElementById('countdown');
      if (el) el.innerHTML = '<p style="font-size:1.5rem;letter-spacing:3px;">HARI BAHAGIA TELAH TIBA 🎉</p>';
      return;
    }
    if (els.days)    els.days.textContent    = Math.floor(diff / 86400000);
    if (els.hours)   els.hours.textContent   = Math.floor((diff % 86400000) / 3600000);
    if (els.minutes) els.minutes.textContent = Math.floor((diff % 3600000) / 60000);
    if (els.seconds) els.seconds.textContent = Math.floor((diff % 60000) / 1000);
  };

  tick();
  window._countdownTimer = setInterval(tick, 1000);
}

/* ============================================================
   5. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        io.unobserve(e.target); /* fire once */
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ============================================================
   6. BOTTOM NAVBAR — active section tracking
   ============================================================ */
function initNavTracking() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navItems = document.querySelectorAll('.nav-item');

  const onScroll = () => {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = sections[0]?.id || '';

    for (const sec of sections) {
      if (sec.offsetTop <= mid) active = sec.id;
    }

    navItems.forEach(item => {
      const isActive = item.getAttribute('href') === `#${active}`;
      item.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* run once immediately */
}

/* ============================================================
   7. RSVP — WhatsApp submit
   ============================================================ */
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name   = document.getElementById('rsvp-name')?.value.trim() || 'Tamu';
    const status = document.getElementById('rsvp-status')?.value || 'Hadir';
    const phone  = '6282229243737';
    const msg    = `Halo Blacky & Cimeng\nSaya *${name}* ingin mengonfirmasi bahwa saya *${status}* dalam acara pernikahan kalian. Terima kasih atas undangannya!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

/* ============================================================
   8. DOA & UCAPAN — WhatsApp submit
   ============================================================ */
function initCommentForm() {
  const form = document.getElementById('comment-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('comment-name')?.value.trim() || 'Tamu';
    const pesan = document.getElementById('comment-text')?.value.trim() || '';
    const phone = '6282229243737';
    const msg   = `Doa & Ucapan dari *${name}* untuk Blacky & Cimeng:\n\n_"${pesan}"_\n\nSemoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

/* ============================================================
   9. COPY TO CLIPBOARD
   ============================================================ */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showNotification('✅ Berhasil disalin!'))
    .catch(() => showNotification('⚠️ Gagal menyalin'));
}

function showNotification(message) {
  const notif = document.getElementById('notification');
  if (!notif) return;
  notif.textContent = message;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2500);
}

/* ============================================================
   10. LOVE GIFT ACCORDION
   ============================================================ */
function toggleGift() {
  const content = document.getElementById('gift-content');
  const btn = document.getElementById('toggle-gift-btn');
  if (!content || !btn) return;
  
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    content.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<i class="fa-solid fa-gift"></i> Kirim Hadiah';
  } else {
    content.classList.add('show');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = '<i class="fa-solid fa-times"></i> Tutup Hadiah';
    // Scroll a bit down so the user can see it opening
    setTimeout(() => {
      content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }
}

/* ============================================================
   11. BACKGROUND MANAGEMENT — save battery/data when tab hidden
   ============================================================ */
let _musicWasPlaying = false;

function initBackgroundManagement() {
  const music = document.getElementById('wedding-music');

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // 1. Pause Music and remember state
      if (music && !music.paused) {
        _musicWasPlaying = true;
        music.pause();
        setMusicIcon(false);
      } else {
        _musicWasPlaying = false;
      }
      // 2. Stop Countdown interval
      if (window._countdownTimer) clearInterval(window._countdownTimer);
    } else {
      // 3. Resume Music only if it was playing & not manually paused
      if (_musicWasPlaying && music) {
        music.play().catch(() => {});
        setMusicIcon(true);
      }
      // 4. Restart Countdown interval
      startCountdown();
    }
  });
}

/* ============================================================
   10. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initGuestName();
  initRSVP();
  initCommentForm();
  initBackgroundManagement();
  initHeroVideo();
});

 /* ============================================================
   12. HERO VIDEO & ANIMATION
   ============================================================ */
function initHeroVideo() {
  const video = document.getElementById('bg-video');
  const animElements = document.querySelectorAll('.hero-anim');
  if (!video) return;

  let hasRevealed = false;

  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= 8 && !hasRevealed) {
      hasRevealed = true;
      animElements.forEach((el, index) => {
        // Stagger the animation: each element appears 500ms after the previous one
        setTimeout(() => {
          el.classList.add('show');
        }, index * 500);
      });
    }
  });

  video.addEventListener('ended', () => {
    video.currentTime = 8;
    video.play().catch(() => {});
  });
}