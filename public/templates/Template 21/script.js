document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. GUEST NAME FROM URL & OPTIMIZATION
    // ==========================================
    // Get guest name from ?to= parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    if (guestNameParam) {
        const guestNameElement = document.querySelector('.cover-guest-name');
        if (guestNameElement) {
            guestNameElement.innerText = guestNameParam;
        }
    }

    // ==========================================
    // 1. COVER & MUSIC LOGIC
    // ==========================================
    const cover = document.getElementById('cover');
    const btnOpen = document.getElementById('btn-open');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const iconOn = document.querySelector('.music-icon-on');
    const iconOff = document.querySelector('.music-icon-off');

    // Page Visibility API: Pause music when tab is in background
    let wasPlayingBeforeHidden = false;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Tab is inactive, pause music if it was playing
            if (!bgMusic.paused) {
                wasPlayingBeforeHidden = true;
                bgMusic.pause();
                // Pause spinning animation
                musicToggle.classList.remove('playing');
            }
        } else {
            // Tab is active again, resume if it was playing before
            if (wasPlayingBeforeHidden) {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                }).catch(e => console.log(e));
                wasPlayingBeforeHidden = false;
            }
        }
    });

    // Prevent scrolling while cover is open
    document.body.style.overflow = 'hidden';

    // Particle effect for Cover
    createParticles('cover-particles', 30);

    btnOpen.addEventListener('click', () => {
        cover.classList.add('cover-open');
        document.body.style.overflow = ''; // Restore scroll
        
        // Show main content immediately to start transitions
        mainContent.classList.add('show');
        
        // Initialize heavy animations after cover transition
        setTimeout(() => {
            cover.style.display = 'none';
            initScrollAnimations();
            createParticles('hero-particles', 20); // Hero particles
        }, 1500);

        // Play music
        playMusic();
    });

    function playMusic() {
        bgMusic.volume = 0;
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            iconOn.style.display = 'block';
            iconOff.style.display = 'none';
            
            // Fade in volume
            let vol = 0;
            const fadeInterval = setInterval(() => {
                if (vol < 0.5) {
                    vol += 0.05;
                    bgMusic.volume = vol;
                } else {
                    clearInterval(fadeInterval);
                }
            }, 100);
        }).catch(err => console.log("Audio play blocked by browser:", err));
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            iconOn.style.display = 'block';
            iconOff.style.display = 'none';
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            iconOn.style.display = 'none';
            iconOff.style.display = 'block';
        }
    });

    // ==========================================
    // 2. SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        animateElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 3. NAVIGATION & SCROLL SPY
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for nav clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll spy to update active nav item
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200; // Offset for earlier trigger
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === current) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 4. COUNTDOWN TIMER
    // ==========================================
    // Target date: March 15, 2027 08:00:00 WITA (GMT+8)
    const targetDate = new Date('2027-03-15T08:00:00+08:00').getTime();
    
    const daysEls = document.querySelectorAll('.countdown-days');
    const hoursEls = document.querySelectorAll('.countdown-hours');
    const minutesEls = document.querySelectorAll('.countdown-minutes');
    const secondsEls = document.querySelectorAll('.countdown-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            [...daysEls, ...hoursEls, ...minutesEls, ...secondsEls].forEach(el => el.innerText = '0');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEls.forEach(el => updateTimeElement(el, days));
        hoursEls.forEach(el => updateTimeElement(el, hours));
        minutesEls.forEach(el => updateTimeElement(el, minutes));
        secondsEls.forEach(el => updateTimeElement(el, seconds));
    }

    function updateTimeElement(element, newValue) {
        const currentVal = element.innerText;
        if (currentVal != newValue) {
            element.innerText = newValue;
            // Add pulse animation
            element.classList.remove('pulse-anim');
            void element.offsetWidth; // Trigger reflow
            element.classList.add('pulse-anim');
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // ==========================================
    // 5. SAVE TO CALENDAR (ICS GENERATOR)
    // ==========================================
    document.getElementById('btn-calendar').addEventListener('click', () => {
        // Event details
        const title = "Pernikahan Rizky & Lestari";
        const location = "RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kaltim";
        const description = "Kehadiran Anda adalah suatu kehormatan bagi kami.";
        
        // Dates in UTC format for ICS (YYYYMMDDTHHmmssZ)
        // Event: March 15 2027, 08:00 WITA (00:00 UTC) to 17:00 WITA (09:00 UTC)
        const dtstart = "20270315T000000Z";
        const dtend = "20270315T090000Z";

        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//RizkyAndLestariWedding//ID",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            `SUMMARY:${title}`,
            `DTSTART:${dtstart}`,
            `DTEND:${dtend}`,
            `LOCATION:${location}`,
            `DESCRIPTION:${description}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Pernikahan_Rizky_Lestari.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Berhasil disimpan ke kalender!');
    });

    // ==========================================
    // 6. OUR JOURNEY (INTERACTIVE SLIDER)
    // ==========================================
    const journeyTrack = document.getElementById('journey-track');
    const jSlides = document.querySelectorAll('.journey-slide');
    const jDots = document.querySelectorAll('.j-dot');
    const btnJPrev = document.getElementById('j-prev');
    const btnJNext = document.getElementById('j-next');
    let currentJSlide = 0;

    function updateJourneySlider() {
        // Calculate offset
        const slideWidth = 100; // percentage
        journeyTrack.style.transform = `translateX(-${currentJSlide * slideWidth}%)`;
        
        // Update classes
        jSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentJSlide);
        });
        jDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentJSlide);
        });
    }

    btnJNext.addEventListener('click', () => {
        if (currentJSlide < jSlides.length - 1) {
            currentJSlide++;
            updateJourneySlider();
        }
    });

    btnJPrev.addEventListener('click', () => {
        if (currentJSlide > 0) {
            currentJSlide--;
            updateJourneySlider();
        }
    });

    jDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentJSlide = index;
            updateJourneySlider();
        });
    });

    // ==========================================
    // 7. GALLERY (3D COVERFLOW CAROUSEL)
    // ==========================================
    const cfItems = document.querySelectorAll('.coverflow-item');
    const cfPrev = document.getElementById('cf-prev');
    const cfNext = document.getElementById('cf-next');
    let cfActiveIndex = 2; // Start middle (assuming 6 items)

    function updateCoverflow() {
        cfItems.forEach((item, index) => {
            item.classList.remove('active');
            
            // Calculate math
            const offset = index - cfActiveIndex;
            const absOffset = Math.abs(offset);
            
            // Base values
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let opacity = 1;
            let zIndex = cfItems.length - absOffset;
            
            if (offset === 0) {
                // Active item
                item.classList.add('active');
                translateX = 0;
                translateZ = 150;
                rotateY = 0;
                opacity = 1;
            } else {
                // Side items
                const direction = offset > 0 ? 1 : -1;
                translateX = direction * (120 + (absOffset * 40));
                translateZ = -absOffset * 100;
                rotateY = direction * -35;
                opacity = 1 - (absOffset * 0.2);
            }

            // Hide extreme items to prevent overflow
            if (absOffset > 2) {
                opacity = 0;
            }

            item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            
            // Apply dim filter via JS for non-active if we want dynamic control (we handle it via CSS class 'active')
        });
    }

    cfPrev.addEventListener('click', () => {
        if (cfActiveIndex > 0) {
            cfActiveIndex--;
            updateCoverflow();
        }
    });

    cfNext.addEventListener('click', () => {
        if (cfActiveIndex < cfItems.length - 1) {
            cfActiveIndex++;
            updateCoverflow();
        }
    });
    
    // Add click on side items to navigate
    cfItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== cfActiveIndex) {
                cfActiveIndex = index;
                updateCoverflow();
            } else {
                // If clicking active item, open lightbox
                openLightbox(item.querySelector('img').src);
            }
        });
    });

    // Init coverflow
    updateCoverflow();


    // ==========================================
    // 8. LIGHTBOX LOGIC
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ==========================================
    // 9. GIFT SECTION (CLICK TO REVEAL)
    // ==========================================
    const giftCards = document.querySelectorAll('.interactive-gift');

    giftCards.forEach(card => {
        const header = card.querySelector('.gift-card-header');
        header.addEventListener('click', () => {
            // Close others (Optional: comment out to allow multiple open)
            giftCards.forEach(c => {
                if (c !== card) c.classList.remove('open');
            });
            
            // Toggle current
            card.classList.toggle('open');
        });
    });

    // Copy Text Logic
    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing card
            const textToCopy = btn.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Berhasil Disalin!`;
                btn.style.backgroundColor = 'var(--c-med-blue)';
                btn.style.color = '#fff';
                
                showToast('Teks berhasil disalin!');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // ==========================================
    // 10. RSVP & WISHES LOGIC
    // ==========================================
    const rsvpForm = document.getElementById('rsvp-form');
    const wishesForm = document.getElementById('wishes-form');
    const wishesList = document.getElementById('wishes-list');

    // RSVP Form Submit
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData.entries());
        
        let storedRSVP = JSON.parse(localStorage.getItem('rsvp_data')) || [];
        storedRSVP.push(data);
        localStorage.setItem('rsvp_data', JSON.stringify(storedRSVP));
        
        rsvpForm.reset();
        showToast('Konfirmasi kehadiran berhasil dikirim!');
    });

    // Wishes Form Submit
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('wishes-nama').value;
        const ucapan = document.getElementById('wishes-ucapan').value;
        
        const newWish = {
            nama,
            ucapan,
            time: new Date().toISOString()
        };
        
        let storedWishes = JSON.parse(localStorage.getItem('wishes_data')) || [];
        // Add to beginning
        storedWishes.unshift(newWish);
        localStorage.setItem('wishes_data', JSON.stringify(storedWishes));
        
        wishesForm.reset();
        showToast('Ucapan berhasil dikirim!');
        
        renderWishes();
    });

    function formatTimeAgo(isoString) {
        const diffMs = new Date() - new Date(isoString);
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        const diffHrs = Math.floor(diffMins / 60);
        if (diffHrs < 24) return `${diffHrs} jam yang lalu`;
        return `${Math.floor(diffHrs / 24)} hari yang lalu`;
    }

    function renderWishes() {
        const storedWishes = JSON.parse(localStorage.getItem('wishes_data')) || [];
        
        if (storedWishes.length === 0) {
            wishesList.innerHTML = '<p style="color: var(--text-muted); font-style: italic; text-align: center;">Jadilah yang pertama memberikan ucapan.</p>';
            return;
        }

        wishesList.innerHTML = storedWishes.map(wish => `
            <div class="wish-item">
                <div class="wish-header">
                    <span class="wish-name">${escapeHTML(wish.nama)}</span>
                    <span class="wish-time">${formatTimeAgo(wish.time)}</span>
                </div>
                <p class="wish-message">${escapeHTML(wish.ucapan).replace(/\n/g, '<br>')}</p>
            </div>
        `).join('');
    }

    // Load existing wishes on start
    renderWishes();

    // ==========================================
    // 11. HELPER FUNCTIONS
    // ==========================================
    
    // Toast Notification
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        
        container.appendChild(toast);
        
        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 400); // Wait for fade out animation
        }, 3000);
    }

    // Security escaping
    function escapeHTML(str) {
        return String(str || '').replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Particle Generator
    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 4 + 2; // 2px to 6px
            const left = Math.random() * 100; // 0% to 100%
            const animDuration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 5; // 0s to 5s
            
            particle.style.cssText = `
                position: absolute;
                bottom: -10px;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background-color: var(--c-light-blue);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                box-shadow: 0 0 ${size * 2}px var(--c-light-blue);
                animation: floatUp ${animDuration}s ease-in infinite;
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(particle);
        }

        // Add keyframes dynamically if not exists
        if (!document.getElementById('particle-style')) {
            const style = document.createElement('style');
            style.id = 'particle-style';
            style.innerHTML = `
                @keyframes floatUp {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
});
