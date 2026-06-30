document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const btnOpen = document.getElementById('open-invitation');
    const bgm = document.getElementById('bgm');
    const miniPlayer = document.getElementById('mini-player');

    // ─── OPEN INVITATION ────────────────────────────────────────────
    btnOpen.addEventListener('click', () => {
        // Smoothly fade out the overlay
        overlay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.style.opacity = '';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
            
            const bottomNav = document.getElementById('bottom-nav');
            if (bottomNav) {
                bottomNav.classList.remove('hidden');
                bottomNav.classList.add('slide-up');
            }
        }, 550);

        // Show mini player
        if (miniPlayer) {
            miniPlayer.classList.remove('hidden');
            miniPlayer.style.animation = 'slideUp 0.4s ease forwards';
        }

        // Play music
        bgm.play().catch(e => console.log("Audio playback failed:", e));

        // Scroll to top
        window.scrollTo(0, 0);
    });

    // ─── COUNTDOWN ──────────────────────────────────────────────────
    const targetDate = new Date('March 15, 2027 10:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            ['days','hours','minutes','seconds'].forEach(id => {
                document.getElementById(id).innerText = '0';
            });
            return;
        }

        const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText    = days;
        document.getElementById('hours').innerText   = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        const totalDuration = 365 * 24 * 60 * 60 * 1000;
        let progress = 100 - ((distance / totalDuration) * 100);
        progress = Math.max(0, Math.min(100, progress));
        document.getElementById('progress-fill').style.width = `${progress}%`;
        // Also sync the progress handle position
        document.querySelector('.progress-handle').style.left = `${progress}%`;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ─── BOTTOM NAV ─────────────────────────────────────────────────
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ─── GIFT TOGGLE ────────────────────────────────────────────────
    const btnGift = document.getElementById('btn-gift');
    const giftDetails = document.getElementById('gift-details');
    if (btnGift && giftDetails) {
        btnGift.addEventListener('click', () => {
            giftDetails.classList.toggle('hidden');
            btnGift.innerHTML = giftDetails.classList.contains('hidden')
                ? `<svg viewBox="0 0 24 24" style="width:20px;height:20px;margin-right:8px;"><path fill="currentColor" d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg> Kirim Hadiah`
                : `<svg viewBox="0 0 24 24" style="width:20px;height:20px;margin-right:8px;"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> Sembunyikan`;
        });
    }

    // ─── GUEST NAME FROM URL ─────────────────────────────────────────
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        const el = document.getElementById('guest-name');
        if (el) el.innerText = decodeURIComponent(guestName);
    }

    // ─── SAVE THE DATE ───────────────────────────────────────────────
    const calendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Bima+%26+Ayu&dates=20270315T030000Z/20270315T090000Z&details=Undangan+pernikahan+Bima+%26+Ayu.+Akad+Nikah+pukul+10.00+WIB,+Resepsi+pukul+13.00+WIB.&location=RT+02,+Desa+Padang+Jaya,+Kec.+Kuaro,+Kab.+Paser,+Kalimantan+Timur+76281';
    const btnSaveDate = document.getElementById('btn-save-date');
    const btnSaveCalendar = document.getElementById('btn-save-calendar');
    if (btnSaveDate) btnSaveDate.addEventListener('click', () => window.open(calendarUrl, '_blank'));
    if (btnSaveCalendar) btnSaveCalendar.addEventListener('click', () => window.open(calendarUrl, '_blank'));

    // ─── HERO PLAY → Open Now Playing ───────────────────────────────
    const heroPlayBtn = document.getElementById('hero-play-btn');
    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', () => {
            const npView = document.getElementById('now-playing-view');
            if (npView) npView.classList.remove('hidden');
        });
    }

    // ─── LIHAT SELENGKAPNYA ──────────────────────────────────────────
    const btnShowMore = document.getElementById('btn-show-more');
    const moreEpisodes = document.getElementById('more-episodes');
    if (btnShowMore && moreEpisodes) {
        btnShowMore.addEventListener('click', () => {
            moreEpisodes.classList.toggle('hidden');
            btnShowMore.textContent = moreEpisodes.classList.contains('hidden')
                ? 'Lihat Selengkapnya' : 'Sembunyikan';
        });
    }

    // ─── RSVP → WhatsApp ────────────────────────────────────────────
    const waNumber = '6282229243737';
    const btnRsvp = document.getElementById('btn-rsvp');
    if (btnRsvp) {
        btnRsvp.addEventListener('click', () => {
            const name = document.getElementById('rsvp-name').value.trim();
            const status = document.getElementById('rsvp-status').value;
            if (!name) { alert('Mohon isi nama lengkap Anda.'); return; }
            const msg = encodeURIComponent(`Halo, saya ${name}.\nKonfirmasi kehadiran: *${status}*\n\n— Undangan Digital Bima & Ayu —`);
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
        });
    }

    // ─── KIRIM UCAPAN → WhatsApp ─────────────────────────────────────
    const btnWish = document.getElementById('btn-wish');
    if (btnWish) {
        btnWish.addEventListener('click', () => {
            const name = document.getElementById('wish-name').value.trim();
            const message = document.getElementById('wish-message').value.trim();
            if (!name || !message) { alert('Mohon isi nama dan ucapan Anda.'); return; }
            const msg = encodeURIComponent(`Doa & Ucapan dari *${name}*:\n\n"${message}"\n\n— Undangan Digital Bima & Ayu —`);
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
            
            // Show comment locally
            const commentsList = document.querySelector('.comments-list');
            const emptyMsg = document.querySelector('.comment-empty');
            if (emptyMsg) emptyMsg.style.display = 'none';
            
            const commentHTML = `
                <div class="comment-card">
                    <h5 class="comment-name">${name}</h5>
                    <p class="comment-msg">${message}</p>
                </div>
            `;
            commentsList.insertAdjacentHTML('afterbegin', commentHTML);
            
            document.getElementById('wish-name').value = '';
            document.getElementById('wish-message').value = '';
        });
    }

    // ─── GALLERY FEATURED IMAGE ──────────────────────────────────────
    const albumCards = document.querySelectorAll('.album-card');
    const featuredImg = document.getElementById('featured-gallery-img');

    if (albumCards.length > 0 && featuredImg) {
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('img');
                if (img) {
                    featuredImg.style.opacity = '0';
                    setTimeout(() => {
                        featuredImg.src = img.src;
                        featuredImg.alt = img.alt;
                        featuredImg.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    // ─── CAROUSEL SCROLL BUTTONS ──────────────────────────────────────
    const btnPrev = document.getElementById('gallery-prev');
    const btnNext = document.getElementById('gallery-next');
    const scrollContainer = document.getElementById('gallery-scroll');

    if (btnPrev && btnNext && scrollContainer) {
        btnPrev.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -160, behavior: 'smooth' });
        });
        btnNext.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 160, behavior: 'smooth' });
        });
    }

    // ─── PODCAST EPISODES (Kisah Cinta) ──────────────────────────────
    const episodeCards = document.querySelectorAll('.episode-card');
    episodeCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // ─── LOCAL COMMENTS ──────────────────────────────────────────────
    const commentsList = document.querySelector('.comments-list');
    if (commentsList) {
        commentsList.innerHTML = '<div class="comment-empty">Belum ada ucapan...</div>';
    }

    // ─── VISIBILITY / BACKGROUND TAB ────────────────────────────────
    let wasPlayingBeforeHidden = false;
    document.addEventListener('visibilitychange', () => {
        if (overlay.classList.contains('hidden')) {
            if (document.hidden) {
                wasPlayingBeforeHidden = !bgm.paused;
                bgm.pause();
            } else {
                if (wasPlayingBeforeHidden) bgm.play().catch(() => {});
            }
        }
    });
    window.addEventListener('pagehide', () => { if (!bgm.paused) bgm.pause(); });
});

// ─── GLOBAL COPY ──────────────────────────────────────────────────────
window.copyText = function(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        // Subtle toast instead of alert
        showToast('Berhasil disalin!');
    }).catch(() => {
        alert("Berhasil disalin: " + text);
    });
};

function showToast(message) {
    let toast = document.getElementById('copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        toast.style.cssText = `
            position: fixed; bottom: 160px; left: 50%; transform: translateX(-50%);
            background: #282828; color: #fff; padding: 10px 20px; border-radius: 24px;
            font-size: 0.85rem; font-weight: 600; z-index: 9999; opacity: 0;
            transition: opacity 0.3s ease; white-space: nowrap;
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = '✓  ' + message;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

// ─── MUSIC PLAYER ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const navMusic     = document.getElementById('nav-music');
    const npView       = document.getElementById('now-playing-view');
    const npClose      = document.getElementById('np-close');
    const npPlayBtn    = document.getElementById('np-play-btn');
    const npIconPlay   = document.getElementById('np-icon-play');
    const npIconPause  = document.getElementById('np-icon-pause');
    const npArt        = document.getElementById('np-art');
    const npHeartBtn   = document.getElementById('np-heart-btn');
    const bgm          = document.getElementById('bgm');
    const currTime     = document.getElementById('curr-time');
    const totalTime    = document.getElementById('total-time');
    const progressFill = document.getElementById('music-progress-fill');

    // Mini player elements
    const miniPlayer      = document.getElementById('mini-player');
    const miniPlayBtn     = document.getElementById('mini-play-btn');
    const miniIconPlay    = document.getElementById('mini-icon-play');
    const miniIconPause   = document.getElementById('mini-icon-pause');
    const miniProgressFill= document.getElementById('mini-progress-fill');
    const miniArt         = document.getElementById('mini-art');
    const miniHeartBtn    = document.getElementById('mini-heart-btn');

    // Nav music icon (for equalizer)
    const navMusicIcon = document.getElementById('nav-music-icon');

    let isLiked = false;

    const formatTime = (t) => {
        if (isNaN(t) || !isFinite(t)) return '0:00';
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // ── Show/Hide Now Playing ──
    const openNowPlaying = () => {
        if (npView) npView.classList.remove('hidden');
    };
    const closeNowPlaying = () => {
        if (npView) npView.classList.add('hidden');
    };

    if (navMusic) navMusic.addEventListener('click', (e) => { e.preventDefault(); openNowPlaying(); });
    if (npClose)  npClose.addEventListener('click', closeNowPlaying);

    // Open now playing by clicking mini player info area
    if (miniPlayer) {
        miniPlayer.querySelector('.mini-player-info').addEventListener('click', openNowPlaying);
        miniPlayer.querySelector('.mini-player-art').addEventListener('click', openNowPlaying);
    }

    // ── Sync play/pause UI ──
    const setPlayingUI = (playing) => {
        // Now Playing buttons
        if (npIconPlay)  npIconPlay.classList.toggle('hidden', playing);
        if (npIconPause) npIconPause.classList.toggle('hidden', !playing);
        if (npArt)       npArt.classList.toggle('is-playing', playing);

        // Mini player buttons
        if (miniIconPlay)  miniIconPlay.classList.toggle('hidden', playing);
        if (miniIconPause) miniIconPause.classList.toggle('hidden', !playing);
        if (miniArt)       miniArt.classList.toggle('is-playing', playing);

        // Nav equalizer animation
        if (navMusicIcon) {
            if (playing) {
                navMusicIcon.innerHTML = `<div class="equalizer-icon">
                    <span class="bar" style="height:4px"></span>
                    <span class="bar" style="height:10px"></span>
                    <span class="bar" style="height:6px"></span>
                </div>`;
                navMusic.classList.add('active');
            } else {
                navMusicIcon.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
            }
        }
    };

    // ── Play/Pause toggle ──
    const togglePlay = () => {
        if (!bgm) return;
        if (bgm.paused) {
            bgm.play().catch(e => console.log(e));
        } else {
            bgm.pause();
        }
    };

    if (npPlayBtn) npPlayBtn.addEventListener('click', togglePlay);
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    // ── Audio events ──
    if (bgm) {
        bgm.addEventListener('play',  () => setPlayingUI(true));
        bgm.addEventListener('pause', () => setPlayingUI(false));

        bgm.addEventListener('timeupdate', () => {
            const current  = bgm.currentTime;
            const duration = bgm.duration;
            if (currTime)  currTime.innerText  = formatTime(current);
            if (totalTime) totalTime.innerText = formatTime(duration);

            const pct = duration ? (current / duration) * 100 : 0;
            if (progressFill) progressFill.style.width = `${pct}%`;
            if (miniProgressFill) miniProgressFill.style.width = `${pct}%`;

            // Sync progress handle position
            const handle = document.querySelector('#music-progress-bar .progress-handle');
            if (handle) handle.style.left = `${pct}%`;
        });
    }

    // ── Seekable progress bar ──
    const progressBar = document.getElementById('music-progress-bar');
    if (progressBar && bgm) {
        const seek = (e) => {
            const rect = progressBar.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            const pct = Math.max(0, Math.min(1, x / rect.width));
            bgm.currentTime = pct * bgm.duration;
        };
        progressBar.addEventListener('click', seek);
        progressBar.addEventListener('touchend', seek);
    }

    // ── Heart / Like ──
    const toggleLike = () => {
        isLiked = !isLiked;
        if (npHeartBtn)   npHeartBtn.classList.toggle('liked', isLiked);
        if (miniHeartBtn) miniHeartBtn.classList.toggle('liked', isLiked);
    };

    if (npHeartBtn) npHeartBtn.addEventListener('click', toggleLike);
    if (miniHeartBtn) miniHeartBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleLike(); });
});
