document.addEventListener('DOMContentLoaded', () => {
    
    // --- Open Invitation Logic ---
    const btnOpen = document.getElementById('btn-open');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const musicContainer = document.getElementById('music-container');
    const bgMusic = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    const bottomNav = document.getElementById('bottomNav');

    btnOpen.addEventListener('click', () => {
        overlay.classList.add('slide-up');
        
        // Fire confetti on open for extra Gen Z hype
        if (typeof confetti === 'function') {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ffffff', '#888888', '#444444'] // Monochrome confetti
                });
            }, 300);
        }

        setTimeout(() => {
            overlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            musicContainer.classList.remove('hidden');
            if (bottomNav) bottomNav.classList.remove('hidden-nav');
            
            // Play music
            bgMusic.play().then(() => {
                isPlaying = true;
                btnMusic.classList.add('spin');
            }).catch(e => console.log("Audio play failed:", e));
            
            // Trigger animations for elements now visible
            checkAOS();
        }, 800);
    });

    // --- Gift Toggle Logic ---
    const btnGift = document.getElementById('btnGift');
    const giftContainer = document.getElementById('giftContainer');
    
    if(btnGift && giftContainer) {
        btnGift.addEventListener('click', () => {
            giftContainer.classList.toggle('show');
            if(giftContainer.classList.contains('show')) {
                btnGift.innerHTML = '<i class="ri-close-line"></i> Tutup Kotak Hadiah';
                
                // Blast confetti when opening the gift box
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.8 },
                        colors: ['#ffffff', '#aaaaaa']
                    });
                }
            } else {
                btnGift.innerHTML = '<i class="ri-gift-2-line"></i> Buka Kotak Hadiah';
            }
        });
    }

    // --- Smooth Scroll for Bottom Nav ---
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Music Toggle & Optimization Logic ---
    let isPlaying = false;
    
    btnMusic.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            isPlaying = true;
            btnMusic.classList.add('spin');
            btnMusic.innerHTML = '<i class="ri-disc-fill"></i>';
        } else {
            bgMusic.pause();
            isPlaying = false;
            btnMusic.classList.remove('spin');
            btnMusic.innerHTML = '<i class="ri-pause-line"></i>';
        }
    });

    // Pause music when page is hidden (optimasi agar tidak berjalan di latar belakang)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            bgMusic.pause();
        } else {
            if (isPlaying) {
                bgMusic.play().catch(e => console.log(e));
            }
        }
    });

    // --- Guest Name Logic (?to=...) ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        const guestNameEl = document.querySelector('.guest-name');
        if (guestNameEl) {
            // Replaces + or %20 with spaces, mostly handled by urlParams.get though
            guestNameEl.innerText = guestName;
        }
    }

    // --- Countdown Logic ---
    // Target date: 15 Maret 2027 10:00:00
    const countDownDate = new Date("Mar 15, 2027 10:00:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-days").innerText = days.toString().padStart(2, '0');
        document.getElementById("cd-hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("cd-minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("cd-seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".countdown-wrapper").innerHTML = "<h3>Acara Sedang Berlangsung</h3>";
        }
    }, 1000);

    // --- Simple Scroll Animation (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aosElements = document.querySelectorAll('[data-aos]');
    
    function checkAOS() {
        aosElements.forEach(el => observer.observe(el));
    }
    
    // --- Copy Text Utility ---
    window.copyText = function(elementId, successMsg) {
        const text = document.getElementById(elementId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert(successMsg);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // --- RSVP WhatsApp ---
    window.sendWhatsApp = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        
        let text = `Halo Kenzo & Aqueena,\n\nSaya *${name}* mengkonfirmasi bahwa saya *${attendance}* pada acara pernikahan kalian.\n\nTerima kasih.`;
        let encodedText = encodeURIComponent(text);
        let phone = "6282229243737"; // Assuming the WA number provided in the footer
        
        window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    }

    // --- Wishes Form Logic ---
    const wishesForm = document.getElementById('wishes-form');
    const wishesList = document.getElementById('wishes-list');

    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('wish-name').value;
        const message = document.getElementById('wish-message').value;
        
        if(wishesList.innerHTML.includes('Belum ada ucapan')) {
            wishesList.innerHTML = '';
        }

        const date = new Date();
        const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        const wishHTML = `
            <div class="wish-item fade-in-up">
                <strong>${name}</strong>
                <span class="wish-time">${dateStr}</span>
                <p>${message}</p>
            </div>
        `;

        wishesList.insertAdjacentHTML('afterbegin', wishHTML);
        
        // Reset form
        wishesForm.reset();
    });
});
