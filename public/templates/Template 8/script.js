// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'ocean-navy': '#1B263B',
                'ocean-dusty': '#415A77',
                'ocean-light': '#778DA9',
                'ocean-sand': '#E0E1DD',
                'ocean-white': '#F8F9FA',
            },
            fontFamily: {
                'heading': ['"Pinyon Script"', 'cursive'],
                'body': ['"Playfair Display"', 'serif'],
            },
            backgroundImage: {
                'texture': "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')",
            }
        }
    }
};

/**
 * Scroll Reveal - Menampilkan elemen saat di-scroll
 * Didefinisikan secara global agar bisa diakses oleh Alpine.js
 */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 60) {
            reveals[i].classList.add("active");
        }
    }
}

// Inisialisasi logika saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Pengecekan reveal awal
    reveal();

    // Listener scroll untuk reveal
    window.addEventListener("scroll", reveal, { passive: true });

    // Optimasi visibilitas halaman (Pause musik saat tab disembunyikan)
    document.addEventListener("visibilitychange", function() {
        const audio = document.getElementById('bg-music');
        if (document.hidden) {
            document.body.classList.add('tab-hidden');
            if (audio && !audio.paused) {
                audio.dataset.wasPlaying = "true";
                audio.pause();
            }
        } else {
            document.body.classList.remove('tab-hidden');
            if (audio && audio.dataset.wasPlaying === "true") {
                audio.play().catch(() => {});
                delete audio.dataset.wasPlaying;
            }
        }
    });

    // Optimasi Reduce Motion untuk perangkat low-power
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('tab-hidden');
        const style = document.createElement('style');
        style.textContent = '*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }';
        document.head.appendChild(style);
    }

    // Logika Nama Tamu dari URL param ?to=NamaTamu
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        const el = document.getElementById('guest-name');
        if (el) {
            el.textContent = guestName.replace(/-/g, ' ');
        }
    }

    // Typewriter effect for "Our Journey"
    if ('IntersectionObserver' in window) {
        const typingElements = document.querySelectorAll('[data-typing="true"]');
        const typeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent.trim();
                    el.textContent = '';
                    let i = 0;
                    const speed = 25; // Kecepatan mengetik (ms)

                    function type() {
                        if (i < text.length) {
                            el.textContent += text.charAt(i);
                            i++;
                            setTimeout(type, speed);
                        }
                    }
                    // Beri sedikit delay agar sinkron dengan animasi reveal (muncul pelan)
                    setTimeout(type, 500);
                    typeObserver.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        typingElements.forEach(el => typeObserver.observe(el));
    }

    // Lazy Load Gambar off-screen
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    // Bubble Effect for Cover Background
    initBubbles();
});

/**
 * Inisialisasi efek gelembung air yang mengapung ke atas
 */
function initBubbles() {
    const container = document.getElementById('particles-cover');
    if (!container) return;

    const bubbleCount = 25;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 20 + 10; // 10px - 30px
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const sway = Math.random() * 100 - 50; // Goyangan horizontal
        
        bubble.style.cssText = `
            width: ${size}px; height: ${size}px; left: ${Math.random() * 100}%;
            --duration: ${duration}s; --delay: ${delay}s; --sway: ${sway}px;
        `;
        container.appendChild(bubble);
    }
}