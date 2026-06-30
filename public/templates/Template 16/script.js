/**
 * Logika JavaScript Undangan Pernikahan Rizky & Adinda
 * Fitur: Overlay, Streaming Audio, Hitung Mundur, Hujan hati/cakar melayang,
 * Notifikasi toast, Panel tab, Buku Tamu langsung, Formatter RSVP WhatsApp, Sorotan dock navigasi, Galeri Lightbox
 * Dibuat oleh EnP Digital Service
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. NAMA TAMU DINAMIS DARI PARAMETER URL ---
  const getGuestName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('guest') || urlParams.get('nama');
    if (guestParam) {
      // Dekode, ganti '+' dengan spasi, dan bersihkan
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

  // --- 2. PEMBUKAAN OVERLAY & MUSIK LATAR ---
  const overlay = document.getElementById('overlay');
  const btnOpen = document.getElementById('btn-open');
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const navDock = document.getElementById('nav-bar');



  // Aktifkan hujan elemen melayang di latar belakang
  let heartRainInterval = null;

  const startHeartRain = () => {
    if (heartRainInterval) clearInterval(heartRainInterval);
    // Optimalkan performa di layar mobile dengan mengurangi frekuensi kemunculan hati
    const isMobile = window.innerWidth < 768;
    const intervalTime = isMobile ? 1500 : 750;
    heartRainInterval = setInterval(() => {
      // 35% kemungkinan cakar kucing, 65% kemungkinan hati biasa
      const isPaw = Math.random() < 0.35;
      createFloatingHeart(isPaw);
    }, intervalTime);
  };

  btnOpen.addEventListener('click', () => {
    // 1. Putar Musik Latar
    bgMusic.play()
      .then(() => {
        musicBtn.classList.add('playing');
      })
      .catch(err => {
        console.log("Pemutaran audio diblokir oleh browser. Diperlukan aksi pengguna.", err);
      });

    // 2. Animasikan penutupan Overlay dan Aktifkan scroll
    overlay.classList.add('opened');
    document.body.classList.remove('locked');

    // Sembunyikan overlay sepenuhnya setelah animasi selesai agar tidak muncul saat scroll
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1100); // sedikit lebih lama dari transisi CSS 1 detik

    // 3. Tampilkan dock navigasi bawah
    setTimeout(() => {
      navDock.classList.add('visible');
    }, 400);

    // 4. Mulai hujan hati melayang
    startHeartRain();

    // 5. Picu percikan hati besar-besaran di awal!
    triggerHeartSplash(25);

    // 6. Tampilkan toast sambutan
    showToast("Selamat datang di pernikahan kami! ❤️");
  });

  // --- 3. KONTROL TOGGLE MUSIK MELAYANG ---
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

  // --- 4. PEMBUATAN ELEMEN MELAYANG (HATI & CAKAR) ---
  const createFloatingHeart = (isPaw = false) => {
    const element = document.createElement('div');
    element.classList.add('floating-heart');
    if (isPaw) element.classList.add('paw');

    if (isPaw) {
      const paws = ['🐾', '🐱', '😺', '😸'];
      element.textContent = paws[Math.floor(Math.random() * paws.length)];
    } else {
      const hearts = ['❤️', '💖', '💝', '💕', '❣'];
      element.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    }

    const randomLeft = Math.random() * 100;
    const randomScale = 0.5 + Math.random() * 1.2;
    const randomDuration = 3.5 + Math.random() * 4;
    const randomRotate = -45 + Math.random() * 90;
    const randomXOffset = -150 + Math.random() * 300;

    element.style.left = `${randomLeft}vw`;
    element.style.transform = `scale(${randomScale})`;
    element.style.animationDuration = `${randomDuration}s`;
    element.style.setProperty('--random-x', `${randomXOffset}px`);
    element.style.setProperty('--random-rotate', `${randomRotate}deg`);

    document.body.appendChild(element);

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

  // --- GALLERY SHOWCASE LOGIC ---
  const galMainImg = document.getElementById('gal-main-img');
  const galMainCaption = document.getElementById('gal-main-caption');
  const galThumbnails = document.querySelectorAll('.gal-thumb');

  if (galMainImg && galThumbnails.length > 0) {
    galThumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Hapus kelas active dari semua thumb
        galThumbnails.forEach(t => t.classList.remove('active'));
        // Tambahkan ke yang diklik
        thumb.classList.add('active');

        // Berikan efek memudar sebelum ganti gambar
        galMainImg.classList.add('fade-out');

        setTimeout(() => {
          // Ganti sumber gambar dan teks
          galMainImg.src = thumb.dataset.src;
          if (galMainCaption) galMainCaption.textContent = thumb.dataset.caption;
          
          // Munculkan kembali gambar
          galMainImg.classList.remove('fade-out');
        }, 400);

        // Auto-scroll thumbnail ke tengah agar selalu terlihat
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  // --- 5. HITUNG MUNDUR PERNIKAHAN ---
  // Target: 15 Maret 2027, 10:00:00 (WIB/UTC+7)
  const targetDateStr = "2027-03-15T10:00:00+07:00";
  const targetTime = new Date(targetDateStr).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      const zeroIds = ['days', 'hours', 'minutes', 'seconds', 'ov-days', 'ov-hours', 'ov-minutes', 'ov-seconds'];
      zeroIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      
      const captionEl = document.querySelector('.countdown-caption');
      if (captionEl) captionEl.innerHTML = "<strong>Hari Bahagia Telah Tiba!</strong> Acara pernikahan sedang berlangsung.";
      return;
    }

    // Kalkulasi waktu
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val < 10 ? `0${val}` : val;
    };

    // Update Main Countdown
    setVal('days', days);
    setVal('hours', hours);
    setVal('minutes', minutes);
    setVal('seconds', seconds);

    // Update Overlay Countdown
    setVal('ov-days', days);
    setVal('ov-hours', hours);
    setVal('ov-minutes', minutes);
    setVal('ov-seconds', seconds);
  };

  // Perbarui langsung dan set interval
  let countdownInterval = null;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  // --- PENGAMAT VISIBILITAS HALAMAN ---
  // Pastikan halaman tidak menjalankan kode/musik yang tidak perlu di latar belakang
  let isMusicPlayingBeforeHidden = false;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // 1. Tab masuk latar belakang - hentikan semua timer & jeda audio
      if (heartRainInterval) {
        clearInterval(heartRainInterval);
        heartRainInterval = null;
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      
      // Segera hapus semua elemen hati melayang dari DOM untuk membebaskan memori
      const existingHearts = document.querySelectorAll('.floating-heart');
      existingHearts.forEach(heart => heart.remove());

      // Jeda animasi marquee CSS untuk mengurangi penggunaan GPU
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
      // 2. Tab kembali ke depan - pulihkan hanya jika aktif
      if (overlay.classList.contains('opened')) {
        startHeartRain();
      }
      if (!countdownInterval) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
      }

      // Lanjutkan animasi marquee CSS
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
            console.log("Pemutaran audio diblokir oleh browser saat tab aktif kembali:", err);
          });
      }
    }
  });

  // --- 6. SOROTAN DOCK INTERAKTIF SAAT SCROLL ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  const highlightNavOnScroll = () => {
    let scrollPos = window.scrollY + 200; // Offset posisi

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-sec') === id) {
            item.classList.add('active');
          }
        });
      }
    });

    // Pemicu khusus untuk bagian bawah halaman (RSVP)
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
      navItems.forEach(item => item.classList.remove('active'));
      document.querySelector('[data-sec="rsvp"]').classList.add('active');
    }
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // Tampilkan elemen dengan animasi saat scroll
  const reveals = document.querySelectorAll('.reveal');
  
  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    reveals.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  // Jalankan saat muat dan scroll
  window.addEventListener('scroll', checkReveal);
  setTimeout(checkReveal, 200); // Pemicu awal

  // --- 7. KLIK IKUTI DI BAGIAN MEMPELAI ---
  const followBtns = document.querySelectorAll('.btn-follow');
  followBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const catName = btn.getAttribute('data-cat');
      showToast(`Terima kasih telah mengikuti @${catName} ❤️`);
      triggerHeartSplash(15);
    });
  });

  // --- 8. SALIN KE CLIPBOARD & SISTEM TOAST ---
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
        console.error("Gagal menyalin ke clipboard: ", err);
        // Fallback untuk browser lama
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Hindari scroll ke bawah
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast(successMsg);
        } catch (copyErr) {
          console.error("Fallback salin gagal: ", copyErr);
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

  // --- 9. PENGALIH TAB TANDA KASIH ---
  const tabButtons = document.querySelectorAll('.gift-tab-btn');
  const tabPanels = document.querySelectorAll('.gift-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Hapus aktif dari semua tombol
      tabButtons.forEach(b => b.classList.remove('active'));
      // Tambah aktif ke tombol yang diklik
      btn.classList.add('active');

      // Sembunyikan semua panel
      tabPanels.forEach(p => p.classList.remove('active'));
      // Tampilkan panel yang dituju
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 10. PENGIRIMAN RSVP & BUKU TAMU LANGSUNG ---
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesBoard = document.getElementById('wishes-board');
  const boardCountEl = document.getElementById('board-count-badge');
  const btnWa = document.getElementById('btn-wa');

  // Data ucapan awal dikosongkan
  const seedWishes = [];

  // Ambil ucapan dari localStorage
  const getWishes = () => {
    const local = localStorage.getItem('wedding_wishes_v2');
    if (local) {
      return JSON.parse(local);
    } else {
      // Isi data awal pertama kali
      localStorage.setItem('wedding_wishes_v2', JSON.stringify(seedWishes));
      return seedWishes;
    }
  };

  const renderWishes = () => {
    const wishes = getWishes();
    boardCountEl.textContent = wishes.length;

    if (wishes.length === 0) {
      wishesBoard.innerHTML = `
        <div class="wishes-empty">
          Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
        </div>
      `;
      return;
    }

    wishesBoard.innerHTML = '';
    // Tampilkan yang terbaru terlebih dahulu
    wishes.slice().reverse().forEach(wish => {
      const bubble = document.createElement('div');
      bubble.classList.add('wish-bubble');
      
      const badgeClass = wish.status === 'Hadir' ? 'hadir' : (wish.status === 'Tidak Hadir' ? 'tidak' : '');
      const badgeText = wish.status;

      bubble.innerHTML = `
        <div class="wish-meta">
          <span class="wish-author">${escapeHTML(wish.name)}</span>
          <span class="wish-badge ${badgeClass}">${badgeText}</span>
        </div>
        <p class="wish-text">"${escapeHTML(wish.message)}"</p>
        <div class="wish-time">${wish.time}</div>
      `;
      wishesBoard.appendChild(bubble);
    });
  };

  const escapeHTML = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const getCurrentFormattedTime = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    return `${date} ${month} ${year} ${hours}:${minutes}`;
  };

  // Submit on wishes board
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameVal = document.getElementById('rsvp-name').value.trim();
    const statusVal = document.getElementById('rsvp-status').value;
    const msgVal = document.getElementById('rsvp-message').value.trim();

    if (!nameVal || !statusVal || !msgVal) {
      showToast("Mohon lengkapi semua isian form! ⚠️");
      return;
    }

    // Simpan ke localStorage
    const wishes = getWishes();
    const newWish = {
      name: nameVal,
      status: statusVal,
      message: msgVal,
      time: getCurrentFormattedTime()
    };
    
    wishes.push(newWish);
    localStorage.setItem('wedding_wishes_v2', JSON.stringify(wishes));
    
    // Kosongkan hanya pesan
    document.getElementById('rsvp-message').value = '';
    
    // Render ulang ucapan
    renderWishes();
    
    // Percikan hati!
    triggerHeartSplash(20);
    showToast("Doa restu Anda berhasil terkirim ke Board! ✨🐾");
  });

  // Fungsi kirim ke WhatsApp
  btnWa.addEventListener('click', () => {
    const nameVal = document.getElementById('rsvp-name').value.trim();
    const statusVal = document.getElementById('rsvp-status').value;
    const guestCount = document.getElementById('rsvp-guests').value;
    const msgVal = document.getElementById('rsvp-message').value.trim();

    if (!nameVal || !statusVal || !msgVal) {
      showToast("Lengkapi form terlebih dahulu sebelum kirim WA! ⚠️");
      return;
    }

    // Format tautan WA
    const waPhone = "6282229243737"; // WhatsApp EnP Digital Service
    const textMessage = `Halo Rizky & Adinda,

Saya ingin mengonfirmasi kehadiran di pernikahan kalian.

✨ *Nama Lengkap:* ${nameVal}
✨ *Konfirmasi Kehadiran:* ${statusVal}
✨ *Jumlah Tamu:* ${guestCount} Orang
✨ *Pesan / Doa:* "${msgVal}"

Terima kasih ya! #RizkyAdindaForever`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodedText}`;

    // Buka WhatsApp
    window.open(waUrl, '_blank');
    showToast("Membuka WhatsApp... 💬");
  });

  // Muat ucapan pertama kali
  renderWishes();

  // --- 11. SISTEM GALERI LIGHTBOX PREMIUM ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let currentImgIndex = 0;
  const galleryImagesData = Array.from(galleryItems).map(item => {
    return {
      src: item.querySelector('img').getAttribute('src'),
      title: item.querySelector('.gallery-overlay span').textContent
    };
  });

  const openLightbox = (index) => {
    currentImgIndex = index;
    const item = galleryImagesData[index];
    lightboxImg.setAttribute('src', item.src);
    lightbox.querySelector('.lightbox-caption').textContent = item.title;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Kunci scroll
  };

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    if (!overlay.classList.contains('opened')) {
      document.body.classList.add('locked');
    } else {
      document.body.style.overflow = '';
    }
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

  // Tutup lightbox saat klik di luar area gambar
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Navigasi lightbox menggunakan keyboard
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    }
  });

  // --- 12. PENANGAN KLIK NAVIGASI DOCK (GULIR HALUS) ---
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Sorotan visual aktif
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Percikan hati saat navigasi!
        triggerHeartSplash(8);
      }
    });
  });
});
