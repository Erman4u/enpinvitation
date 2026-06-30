/**
 * Wedding Invitation — Asep & Lilis
 * Optimized: runs only while tab is visible / user has interacted.
 */

'use strict';

/* ─── Wedding Date ─────────────────────────────────────────── */
const WEDDING_DATE = new Date('2027-03-15T10:00:00+08:00');

/* ─── State ────────────────────────────────────────────────── */
let countdownTimer  = null;   // setInterval handle
let isMusicPlaying  = false;
let currentSlide    = 0;
let slides          = [];
let audioEl         = null;
let musicBtn        = null;
let pageVisible     = !document.hidden;

/* ═══════════════════════════════════════════════════════════════
   OVERLAY — open invitation
═══════════════════════════════════════════════════════════════ */
function initOverlay() {
    const overlay   = document.getElementById('overlay');
    const main      = document.getElementById('main-content');
    const openBtn   = document.getElementById('open-invitation');

    if (!overlay || !openBtn || !main) return;

    // Populate guest name immediately from URL param ?to=Nama%20Tamu
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Tamu Undangan';
    const overlayGuestEl = document.getElementById('overlay-guest-name');
    if (overlayGuestEl) overlayGuestEl.textContent = guestName;

    // Lock body scroll while overlay is visible
    document.body.classList.add('no-scroll');

    openBtn.addEventListener('click', () => {
        // Prefill RSVP and Ucapan name inputs
        const rsvpNameInput = document.getElementById('rsvp-nama');
        const ucapanNameInput = document.getElementById('ucapan-nama');
        if (rsvpNameInput) rsvpNameInput.value = guestName;
        if (ucapanNameInput) ucapanNameInput.value = guestName;

        overlay.style.transition = 'opacity 0.7s ease';
        overlay.style.opacity    = '0';

        setTimeout(() => {
            overlay.style.display = 'none';
            main.classList.remove('hidden');
            document.body.classList.remove('no-scroll');

            // kick everything off only after invitation is opened
            initCountdown();
            initGallery();
            initObserver();
            initNav();
            initMusicButton();
            autoPlayMusic();  // auto-play since user just clicked (gesture)
        }, 700);
    }, { once: true });
}

/* ═══════════════════════════════════════════════════════════════
   COUNTDOWN — paused when tab is hidden
═══════════════════════════════════════════════════════════════ */
function updateCountdown() {
    const now  = Date.now();
    const diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
        stopCountdown();
        setCountdownDisplay(0, 0, 0, 0);
        return;
    }

    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000)  / 60_000);
    const s = Math.floor((diff % 60_000)      / 1_000);

    setCountdownDisplay(d, h, m, s);
}

function setCountdownDisplay(d, h, m, s) {
    const el = (id) => document.getElementById(id);
    el('days').textContent    = String(d).padStart(2, '0');
    el('hours').textContent   = String(h).padStart(2, '0');
    el('minutes').textContent = String(m).padStart(2, '0');
    el('seconds').textContent = String(s).padStart(2, '0');
}

function startCountdown() {
    if (countdownTimer) return;
    updateCountdown();                         // immediate first tick
    countdownTimer = setInterval(updateCountdown, 1_000);
}

function stopCountdown() {
    clearInterval(countdownTimer);
    countdownTimer = null;
}

function initCountdown() {
    startCountdown();
}

/* ═══════════════════════════════════════════════════════════════
   PAGE VISIBILITY API — pause heavy work when hidden
═══════════════════════════════════════════════════════════════ */
document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;

    if (!document.getElementById('main-content') ||
        document.getElementById('main-content').classList.contains('hidden')) return;

    if (pageVisible) {
        startCountdown();
        if (isMusicPlaying && audioEl) audioEl.play().catch(() => {});
    } else {
        stopCountdown();
        if (audioEl && !audioEl.paused) audioEl.pause();
    }
});

/* ═══════════════════════════════════════════════════════════════
   GALLERY SLIDER — manual only (no auto-play interval)
═══════════════════════════════════════════════════════════════ */
function initGallery() {
    slides = Array.from(document.querySelectorAll('.gallery-slider .slide'));
    if (!slides.length) return;

    showSlide(0);

    document.getElementById('prev-slide')
        ?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

    document.getElementById('next-slide')
        ?.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

    // Touch / swipe support
    const slider = document.querySelector('.gallery-slider');
    if (slider) {
        let startX = 0;
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        slider.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) {
                currentSlide = dx < 0
                    ? (currentSlide + 1) % slides.length
                    : (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }
        }, { passive: true });
    }
}

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — fade-in elements as they scroll into view
═══════════════════════════════════════════════════════════════ */
function initObserver() {
    const targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);  // once visible, stop watching
            }
        });
    }, { threshold: 0.12 });

    targets.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   BOTTOM NAV — highlight active section
═══════════════════════════════════════════════════════════════ */
function initNav() {
    const navItems = document.querySelectorAll('.nav-item');
    if (!navItems.length) return;

    const sections = Array.from(navItems)
        .map((a) => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach((a) => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach((s) => navObserver.observe(s));
}

/* ═══════════════════════════════════════════════════════════════
   MUSIC BUTTON — audio created lazily on first click
═══════════════════════════════════════════════════════════════ */
function initMusicButton() {
    musicBtn = document.getElementById('music-toggle');
    if (!musicBtn) return;

    musicBtn.addEventListener('click', toggleMusic);
}

/* ═══════════════════════════════════════════════════════════════
   COPY TO CLIPBOARD — for gift section
═══════════════════════════════════════════════════════════════ */
function copyToClipboard(btn) {
    const text = btn.getAttribute('data-copy');
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Tersalin!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Tersalin!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}

function toggleMusic() {
    if (!audioEl) {
        audioEl           = document.getElementById('bg-music');
        if (!audioEl) return;
        audioEl.volume    = 0.5;
    }

    if (isMusicPlaying) {
        audioEl.pause();
        isMusicPlaying = false;
        if (musicBtn) {
            musicBtn.textContent = '🎵';
            musicBtn.classList.remove('playing');
        }
    } else {
        audioEl.play()
            .then(() => {
                isMusicPlaying = true;
                if (musicBtn) {
                    musicBtn.textContent = '🔇';
                    musicBtn.classList.add('playing');
                }
            })
            .catch((err) => {
                console.warn('Audio play blocked:', err);
            });
    }
}

/* Auto-play music on overlay open (called after user click gesture) */
function autoPlayMusic() {
    if (!audioEl) {
        audioEl = document.getElementById('bg-music');
        if (!audioEl) return;
        audioEl.volume = 0.5;
    }
    audioEl.play()
        .then(() => {
            isMusicPlaying = true;
            if (musicBtn) {
                musicBtn.textContent = '🔇';
                musicBtn.classList.add('playing');
            }
        })
        .catch((err) => {
            console.warn('Auto-play blocked:', err);
        });
}

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL for nav links
═══════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   FORM — simple client-side feedback
═══════════════════════════════════════════════════════════════ */
function initForms() {
    document.querySelectorAll('form').forEach((form) => {
        form.querySelector('button')?.addEventListener('click', () => {
            const btn = form.querySelector('button');
            btn.textContent = '✔ Terkirim!';
            btn.style.background = 'linear-gradient(135deg,#2d6a4f,#40916c)';
            btn.disabled = true;
        });
    });
}

/* ─── GIFT TOGGLE ────────────────────────────────────────── */
function initGiftToggle() {
    const btn = document.getElementById('show-gift-btn');
    const content = document.getElementById('gift-content');
    const container = document.getElementById('gift-btn-container');

    if (btn && content) {
        btn.addEventListener('click', () => {
            content.classList.remove('hidden');
            if (container) container.classList.add('hidden');
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   BOOT — only the overlay listener runs immediately
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initForms();
    initGiftToggle();
    initOverlay();   // everything else is deferred until overlay is closed
});
