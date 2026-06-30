document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Open Invitation Logic ---
    const btnOpen = document.getElementById('open-invitation-btn');
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const navbar = document.getElementById('navbar');

    const bgMusic = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');
    let isPlaying = false;

    const toggleMusic = () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.classList.add('paused');
            musicControl.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicControl.classList.remove('paused');
            musicControl.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
        isPlaying = !isPlaying;
    };

    musicControl.addEventListener('click', toggleMusic);

    btnOpen.addEventListener('click', () => {
        coverPage.classList.add('slide-up');
        
        // Play audio and show control
        toggleMusic();

        // Fix cover-page bug: Ensure smooth transition
        mainContent.classList.remove('hidden');
        navbar.classList.remove('hidden');
        musicControl.classList.remove('hidden');
        
        setTimeout(() => {
            window.scrollTo(0, 0);
            mainContent.classList.add('show-content'); // Trigger fade-in animation
            navbar.classList.add('visible');
            musicControl.classList.add('visible');
        }, 1100); // Increased delay slightly to match the 1.5s transition feel
    });

    // --- 2. Countdown Timer Logic ---
    // Target Date: 15 March 2027
    const targetDate = new Date('March 15, 2027 10:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h3>Acara Telah Dimulai</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    // Update countdown optimized for background tabs
    let lastUpdate = 0;
    const loopCountdown = (timestamp) => {
        if (!document.hidden && timestamp - lastUpdate >= 1000) {
            updateCountdown();
            lastUpdate = timestamp;
        }
        requestAnimationFrame(loopCountdown);
    };
    
    updateCountdown(); // Initial call
    requestAnimationFrame(loopCountdown);

    // --- 3. RSVP Form Submission (Simulation) ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = rsvpForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Berhasil Terkirim!';
            btn.style.backgroundColor = '#4CAF50';
            rsvpForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });

    // --- 4. Wishes Form Submission ---
    const wishForm = document.getElementById('wish-form');
    const wishesList = document.getElementById('wishes-list');
    
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('wish-name').value;
        const msgInput = document.getElementById('wish-message').value;

        // Remove "Belum ada ucapan" if exists
        const emptyMsg = wishesList.querySelector('.empty-wishes');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        // Create new wish element
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `
            <div class="wish-name"><i class="fa-solid fa-user-circle"></i> ${nameInput}</div>
            <div class="wish-text">${msgInput}</div>
        `;

        // Prepend to list
        wishesList.insertBefore(wishItem, wishesList.firstChild);

        // Reset form
        wishForm.reset();

        // Button feedback
        const btn = wishForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Terkirim';
        btn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    });

    // --- 5. Swiper 3D Coverflow Initialization ---
    let swiperInstance = null;
    if (typeof Swiper !== 'undefined') {
        swiperInstance = new Swiper('.gallery-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            initialSlide: 2, // Start from middle (3rd slide)
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 40,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    }

    // --- 6. Gift Toggle ---
    const giftToggleBtn = document.getElementById('gift-toggle-btn');
    const giftContent = document.getElementById('gift-content');
    
    if (giftToggleBtn && giftContent) {
        giftToggleBtn.addEventListener('click', function() {
            if (giftContent.classList.contains('gift-content-hidden')) {
                giftContent.classList.remove('gift-content-hidden');
                giftContent.classList.add('gift-content-visible');
                this.innerHTML = '<i class="fa-solid fa-gift"></i> Tutup Hadiah';
            } else {
                giftContent.classList.remove('gift-content-visible');
                giftContent.classList.add('gift-content-hidden');
                this.innerHTML = '<i class="fa-solid fa-gift"></i> Kirim Hadiah';
            }
        });
    }

    // --- 7. Extreme Background Optimization ---
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // Tab is hidden: pause everything
            if (isPlaying) {
                bgMusic.pause();
            }
            if (swiperInstance && swiperInstance.autoplay && swiperInstance.autoplay.running) {
                swiperInstance.autoplay.stop();
            }
        } else {
            // Tab is visible: resume everything
            if (isPlaying) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
            if (swiperInstance && swiperInstance.autoplay && !swiperInstance.autoplay.running) {
                swiperInstance.autoplay.start();
            }
        }
    });

    // --- 8. Scroll Reveal Animation for Profile Cards ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); // Animasi hanya berjalan sekali
            }
        });
    }, revealOptions);

    document.querySelectorAll('.profile-card, .timeline-item').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 9. ScrollSpy: Highlight active navbar item ---
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    const scrollSpy = () => {
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);
});
