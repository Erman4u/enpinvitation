document.addEventListener('DOMContentLoaded', () => {
    // Prepare Staggered Text
    const staggeredEl = document.getElementById('staggeredText');
    if (staggeredEl) {
        const text = staggeredEl.textContent;
        staggeredEl.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.05}s`;
            staggeredEl.appendChild(span);
        });
    }

    // Get guest name from URL and display it
    const guestNameDisplay = document.getElementById('guestNameDisplay');
    if (guestNameDisplay) {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('to') || 'Tamu Undangan';
        guestNameDisplay.textContent = guestName;
    }

    const btnOpen = document.getElementById('btnOpen');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    const bottomNav = document.getElementById('bottomNav');
    const musicToggle = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    let isPlaying = false;

    // 1. Open Invitation
    btnOpen.addEventListener('click', () => {
        // Berikan feedback visual pada tombol segera
        btnOpen.style.pointerEvents = 'none'; 
        
        overlay.classList.add('fade-out');
        
        // Tampilkan konten utama sedikit lebih cepat agar siap di-animate
        mainContent.classList.remove('hidden');
        bottomNav.classList.remove('hidden');
        musicToggle.classList.remove('hidden');

        // Animasi teks "The Wedding Of" dimulai saat overlay mulai memudar
        setTimeout(() => staggeredEl?.classList.add('visible'), 400);

        // Putar musik dengan volume fade-in jika memungkinkan
        audio.volume = 0;
        audio.play().then(() => {
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 1) {
                    vol += 0.05;
                    audio.volume = Math.min(vol, 1);
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
        }).catch(e => console.log("Autoplay blocked"));
        
        isPlaying = true;
    });

    // 2. Music Toggle
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
    });

    // 3. Countdown Timer (Target: March 15, 2027)
    const targetDate = new Date("March 15, 2027 08:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? '0' + d : d;
        document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
        document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
        document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
    }, 1000);

    // 4. Scroll Animation (Replacing Framer Motion)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 5. Parallax Effect for Mist
    const mistBg = document.getElementById('mistBg');
    const heroName = document.querySelector('.hero-text .names');
    const isMobile = window.innerWidth <= 768;

    window.addEventListener('scroll', () => {
        // Optimization: Use requestAnimationFrame for smoother performance
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            // Background Parallax
            if (mistBg && !isMobile) { 
                // Menambahkan sedikit efek scale untuk sensasi terbang masuk/keluar awan
                const scale = 1 + (scrolled * 0.0001);
                mistBg.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0) scale(${scale})`;
            }

            // Hero Name Fade Out Effect
            if (heroName && scrolled < window.innerHeight) {
                const threshold = window.innerHeight * 0.6; // Nama akan menghilang sepenuhnya setelah scroll 60% layar
                const opacity = Math.max(0, 1 - (scrolled / threshold));
                heroName.style.opacity = opacity;
            }
        });
    });

    // 6. Optimization: Pause music when tab hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && isPlaying) {
            audio.pause();
        } else if (!document.hidden && isPlaying) {
            audio.play();
        }
    });

    // 3D Gallery Carousel Logic
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevGallery');
    const nextBtn = document.getElementById('nextGallery');
    const carousel3D = document.getElementById('carousel3D');
    const dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0;
    let autoPlayInterval;

    // Generate Dots
    if (dotsContainer && items.length > 0) {
        items.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }

    // Swipe Logic for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel3D?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel3D?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > 50) { // Threshold minimal 50px
            if (swipeDistance > 0) {
                currentIndex = (currentIndex - 1 + items.length) % items.length; // Swipe Right -> Prev
            } else {
                currentIndex = (currentIndex + 1) % items.length; // Swipe Left -> Next
            }
            updateCarousel();
        }
    }, { passive: true });

    function updateCarousel() {
        const xOffset = window.innerWidth < 768 ? 40 : 100; // More subtle stacking
        items.forEach((item, index) => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.transform = 'translateX(0) scale(0.7)';
            item.style.zIndex = '0';
            item.style.filter = 'blur(4px)';

            if (index === currentIndex) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
                item.style.zIndex = '5';
                item.style.filter = 'blur(0px)';
                item.classList.add('active');
            } else if (index === (currentIndex + 1) % items.length) {
                item.style.opacity = '0.4';
                item.style.transform = `translateX(${xOffset}px) scale(0.85)`;
                item.style.zIndex = '3';
                item.style.filter = 'blur(2px)';
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.style.opacity = '0.4';
                item.style.transform = `translateX(-${xOffset}px) scale(0.85)`;
                item.style.zIndex = '3';
                item.style.filter = 'blur(2px)';
            }
        });

        // Update Dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn?.addEventListener('click', () => { currentIndex = (currentIndex - 1 + items.length) % items.length; updateCarousel(); });
    nextBtn?.addEventListener('click', () => { currentIndex = (currentIndex + 1) % items.length; updateCarousel(); });

    // Auto Play Logic
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, 3500);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    carousel3D?.addEventListener('mouseenter', stopAutoPlay);
    carousel3D?.addEventListener('mouseleave', startAutoPlay);
    carousel3D?.addEventListener('touchstart', stopAutoPlay);

    // Initialize Gallery
    if (items.length > 0) {
        updateCarousel();
        startAutoPlay();
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.carousel-item img, .scroll-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 8. Particle Effect for Hero
    function initHeroParticles() {
        const container = document.getElementById('hero-particles');
        if (!container) return;
        
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1; // 1px to 4px
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 20;
            const drift = (Math.random() - 0.5) * 200; // -100px to 100px
            const opacity = Math.random() * 0.3 + 0.1;

            if (Math.random() > 0.7) {
                particle.style.background = 'rgba(197, 160, 89, 0.6)'; // Gold light motes
                particle.style.boxShadow = '0 0 10px rgba(197, 160, 89, 0.4)';
            }

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`; // Negative delay agar langsung muncul saat load
            particle.style.setProperty('--p-drift', `${drift}px`);
            particle.style.setProperty('--p-opacity', opacity);
            
            if (Math.random() > 0.5) particle.style.filter = 'blur(1px)';

            container.appendChild(particle);
        }
    }
    initHeroParticles();
});

// Function to copy text
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor rekening berhasil disalin!");
    });
}

// RSVP WhatsApp Handler
document.getElementById('rsvpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;
    
    const waNumber = "6282229243737"; // Ganti dengan nomor WA tujuan
    const waText = `Halo, saya ${name}. Ingin mengonfirmasi bahwa saya ${attendance} di pernikahan Rizky & Anisa. \n\nUcapan: ${message}`;
    
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`, '_blank');
});

// Smooth Scroll for Bottom Nav
document.querySelectorAll('.bottom-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Function to add event to Google Calendar
function addToCalendar() {
    const eventTitle = "Pernikahan Rizky & Anisa";
    const eventDetails = "Akad Nikah dan Resepsi Rizky & Anisa. Mohon doa restu dan kehadirannya.";
    const eventLocation = "RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kaltim";
    
    // Start and End times for Akad Nikah (March 15, 2027, 08:00 WITA to 10:00 WITA)
    // WITA is UTC+8. So 08:00 WITA is 00:00 UTC.
    // 20270315T000000Z / 20270315T020000Z
    const startTime = "20270315T000000Z"; // YYYYMMDDTHHMMSSZ (UTC)
    const endTime = "20270315T020000Z";   // YYYYMMDDTHHMMSSZ (UTC)

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;
    
    window.open(googleCalendarUrl, '_blank');
}