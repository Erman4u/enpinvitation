/**
 * Aditya & Larasati Wedding Invitation JavaScript Logic
 * Features: Overlay, Audio stream, Live Countdown, Floating hearts/paws rain,
 * Custom toasts, Tab panels, live Guestbook, WhatsApp RSVP formatter, active dock highlighter, Lightbox gallery
 * Created by EnP Digital Service
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DYNAMIC GUEST NAME FROM URL PARAMS ---
  const getGuestName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('guest') || urlParams.get('nama');
    if (guestParam) {
      // Decode, replace '+' with space, and clean up
      return decodeURIComponent(guestParam.replace(/\+/g, ' '));
    }
    return null;
  };

  const guestName = getGuestName();
  if (guestName) {
    const displayEl = document.getElementById('guest-name-display');
    if (displayEl) {
      displayEl.textContent = guestName;
    }
  }

  // --- 2. OVERLAY OPENING & BACKGROUND MUSIC ---
  const overlay = document.getElementById('overlay');
  const btnOpen = document.getElementById('btn-open');
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const navDock = document.getElementById('nav-bar');

  // Trigger floating elements rain in background
  let heartRainInterval = null;

  const startHeartRain = () => {
    if (heartRainInterval) clearInterval(heartRainInterval);
    // Optimize performance on mobile screens by reducing heart generation rate
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 3000 : 750; // Seringan mungkin di HP
    heartRainInterval = setInterval(() => {
      // 35% chance of a cosmic object, 65% chance of a star
      const isPaw = Math.random() < 0.35;
      createFloatingHeart(isPaw);
    }, intervalTime);
  };

  btnOpen.addEventListener('click', () => {
    // 1. Play Background Music
    bgMusic.play()
      .then(() => {
        musicBtn.classList.add('playing');
      })
      .catch(err => {
        console.log("Audio play blocked by browser. User action required.", err);
      });

    // 2. Animate Overlay out and Unlock scrolling
    overlay.classList.add('opened');
    document.body.classList.remove('locked');

    // 3. Slide in Navigation dock
    setTimeout(() => {
      navDock.classList.add('visible');
    }, 400);

    // 4. Start Floating Hearts Rain
    startHeartRain();

    // 5. Trigger an initial massive heart splash!
    // Optimasi: Splash lebih sedikit di mobile
    const splashCount = window.innerWidth < 768 ? 12 : 25;
    triggerHeartSplash(splashCount);
  });

  // --- 3. FLOATING MUSIC TOGGLE CONTROLS ---
  musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.classList.add('playing');
      showToast("Musik diaktifkan 🎵");
    } else {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
      showToast("Musik dinonaktifkan 🔇");
    }
  });

  // --- 4. FLOATING ELEMENTS CREATION (HEARTS & PAWS) ---
  const createFloatingHeart = (isPaw = false) => {
    const element = document.createElement('div');
    element.classList.add('floating-heart');
    if (isPaw) element.classList.add('paw');

    // Randomize element type
    if (isPaw) {
      const space = ['🚀', '🪐', '🌙', '☄️', '🌌'];
      element.textContent = space[Math.floor(Math.random() * space.length)];
    } else {
      const stars = ['⭐', '🌟', '✨', '💫', '🌠'];
      element.textContent = stars[Math.floor(Math.random() * stars.length)];
    }

    // Styling configurations
    const randomLeft = Math.random() * 100; // random horizontal percentage
    const randomScale = 0.5 + Math.random() * 1.2; // random size scale
    const randomDuration = 3.5 + Math.random() * 4; // random float velocity
    const randomRotate = -45 + Math.random() * 90; // random sway tilt
    const randomXOffset = -150 + Math.random() * 300; // random end destination offset

    element.style.left = `${randomLeft}vw`;
    element.style.transform = `scale(${randomScale})`;
    element.style.animationDuration = `${randomDuration}s`;
    element.style.setProperty('--random-x', `${randomXOffset}px`);
    element.style.setProperty('--random-rotate', `${randomRotate}deg`);

    document.body.appendChild(element);

    // Remove element after animation completes to save memory
    setTimeout(() => {
      element.remove();
    }, randomDuration * 1000);
  };

  const triggerHeartSplash = (count = 15) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createFloatingHeart(Math.random() < 0.35);
      }, i * 50);
    }
  };

  // --- 5. WEDDING COUNTDOWN TIMER ---
  // Target: March 15, 2027, 10:00:00 (WIB/UTC+7)
  const targetDateStr = "2027-03-15T10:00:00+07:00";
  const targetTime = new Date(targetDateStr).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      
      const captionEl = document.querySelector('.countdown-caption');
      if (captionEl) captionEl.innerHTML = "<strong>Hari Bahagia Telah Tiba!</strong> Acara pernikahan sedang berlangsung.";
      return;
    }

    // Math calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format double digits
    document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
  };

  // Update instantly and set interval
  let countdownInterval = null;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  // --- PAGE VISIBILITY EVENT OBSERVER ---
  // Ensure the page does not run unnecessary code/music in the background
  let isMusicPlayingBeforeHidden = false;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // 1. Tab went to background - clear all timers & pause audio
      if (heartRainInterval) {
        clearInterval(heartRainInterval);
        heartRainInterval = null;
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      
      // Immediately purge all floating heart DOM elements to free up memory
      const existingHearts = document.querySelectorAll('.floating-heart');
      existingHearts.forEach(heart => heart.remove());

      // Pause CSS marquee animations to reduce GPU usage
      const marqueeContents = document.querySelectorAll('.marquee-content');
      marqueeContents.forEach(el => {
        el.style.animationPlayState = 'paused';
      });

      if (bgMusic && !bgMusic.paused) {
        isMusicPlayingBeforeHidden = true;
        bgMusic.pause();
        musicBtn.classList.remove('playing');
      } else {
        isMusicPlayingBeforeHidden = false;
      }
    } else {
      // 2. Tab returned to foreground - restore only if active
      if (overlay.classList.contains('opened')) {
        startHeartRain();
      }
      if (!countdownInterval) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
      }

      // Resume CSS marquee animations
      const marqueeContents = document.querySelectorAll('.marquee-content');
      marqueeContents.forEach(el => {
        el.style.animationPlayState = 'running';
      });

      if (isMusicPlayingBeforeHidden && bgMusic) {
        bgMusic.play()
          .then(() => {
            musicBtn.classList.add('playing');
          })
          .catch(err => {
            console.log("Audio resume blocked by browser on tab focus:", err);
          });
      }
    }
  });

  // --- 6. INTERACTIVE DOCK HIGHLIGHTING ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  // Optimized Section Observer for Navigation
  const navObserverOptions = { threshold: 0.4 };
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-sec') === id);
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // Optimized Reveal Animation Observer
  const reveals = document.querySelectorAll('.reveal');
  const revealObserverOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, revealObserverOptions);

  reveals.forEach(el => revealObserver.observe(el));

  // --- 7. MEET THE COUPLE INSTAGRAM CLICKS ---
  const connectBtns = document.querySelectorAll('.btn-follow');
  connectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Biarkan link terbuka jika href-nya valid (Instagram)
      const catName = btn.getAttribute('data-cat');
      showToast(`Membuka profil Instagram @${catName}... 📸`);
      triggerHeartSplash(15);
    });
  });

  // --- 8. COPY TO CLIPBOARD & TOAST SYSTEM ---
  const showToast = (text) => {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = text;
    toast.classList.add('visible');
    
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  };

  const copyToClipboard = (text, successMsg) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast(successMsg);
      })
      .catch(err => {
        console.error("Clipboard copy failed: ", err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast(successMsg);
        } catch (copyErr) {
          console.error("Fallback copy failed: ", copyErr);
        }
        document.body.removeChild(textarea);
      });
  };

  document.getElementById('btn-copy-acc').addEventListener('click', () => {
    const accNum = document.getElementById('acc-number').textContent.replace(/\s/g, '');
    copyToClipboard(accNum, "Nomor rekening berhasil disalin! 💳");
  });

  document.getElementById('btn-copy-addr').addEventListener('click', () => {
    const addr = document.getElementById('shipping-address').textContent.trim();
    copyToClipboard(addr, "Alamat pengiriman berhasil disalin! 📦");
  });

  // --- 9. LOVE GIFT TAB SWITCHER ---
  const tabButtons = document.querySelectorAll('.gift-tab-btn');
  const tabPanels = document.querySelectorAll('.gift-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');

      // Hide all panels
      tabPanels.forEach(p => p.classList.remove('active'));
      // Show targeted panel
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 10. RSVP SUBMISSION (WhatsApp Only) ---
  const rsvpForm = document.getElementById('rsvp-form');
  const btnWa = document.getElementById('btn-wa');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default since we use WA button
  });

  // Redirect to WhatsApp function
  btnWa.addEventListener('click', () => {
    const nameVal = document.getElementById('rsvp-name').value.trim();
    const statusVal = document.getElementById('rsvp-status').value;
    const guestCount = document.getElementById('rsvp-guests').value;
    const msgVal = document.getElementById('rsvp-message').value.trim();

    if (!nameVal || !statusVal || !msgVal) {
      showToast("Lengkapi form terlebih dahulu sebelum kirim WA! ⚠️");
      return;
    }

    // Format WA link
    const waPhone = "6282229243737"; // EnP Digital Service WA
    const textMessage = `Halo Aditya & Larasati,

Saya ingin mengonfirmasi kehadiran di perjalanan cinta kalian melintasi galaksi.

🚀 *Nama Lengkap:* ${nameVal}
🚀 *Konfirmasi Kehadiran:* ${statusVal}
🚀 *Jumlah Awak (Tamu):* ${guestCount} Orang
🚀 *Pesan / Doa:* "${msgVal}"

Terima kasih ya! #PernikahanAdityaLarasati`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodedText}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    showToast("Membuka WhatsApp... 💬");
  });

  // --- 11. PREMIUM GALLERY & LIGHTBOX SYSTEM ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item'); // Ambil semua item galeri
  
  const totalSlides = galleryItems.length;

  let currentImgIndex = 0;

  const galleryImagesData = Array.from(galleryItems).map(item => {
    return {
      src: item.querySelector('img').getAttribute('src'),
      title: item.querySelector('.gallery-overlay span').textContent
    };
  });

  const openLightbox = (index) => {
    currentImgIndex = index;
    const data = galleryImagesData[index];
    lightboxImg.src = data.src;
    lightbox.querySelector('.lightbox-caption').textContent = data.title;
    lightbox.style.display = 'flex';
    document.body.classList.add('locked');
  };

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    document.body.classList.remove('locked');
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    let prevIndex = currentImgIndex - 1;
    if (prevIndex < 0) prevIndex = galleryImagesData.length - 1;
    openLightbox(prevIndex);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    let nextIndex = currentImgIndex + 1;
    if (nextIndex >= galleryImagesData.length) nextIndex = 0;
    openLightbox(nextIndex);
  });

  // Close lightbox on click outside the image container
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    }
  });

  // --- 12. DOCK NAVIGATION CLICK HANDLER (SMOOTH SCROLL) ---
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Active visual highlight
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Heart splash on navigation meow!
        // Optimasi: Kurangi splash saat navigasi di mobile
        const navSplash = window.innerWidth < 768 ? 4 : 8;
        triggerHeartSplash(navSplash);
      }
    });
  });
 dibawah 
  // --- 13. COSMIC PARALLAX EFFECT ---
  // Bergerak halus saat kursor digerakkan (Desktop only experience)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    // Hitung offset dari tengah layar
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    const cosmicBg = document.querySelector('.cosmic-background');
    if (cosmicBg) {
      cosmicBg.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
  }
});
