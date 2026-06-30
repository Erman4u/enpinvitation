// Setup Guest Name from URL if available (e.g., ?to=John+Doe)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guest-name').innerText = guestName;
        // Pre-fill the RSVP name input as well
        const rsvpNameInput = document.getElementById('rsvp-name');
        if (rsvpNameInput) {
            rsvpNameInput.value = guestName;
        }
    }

    // Initialize Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    var swiper = new Swiper(".gallerySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 2,
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    // Load saved wishes
    loadWishes();
});

// Overlay and Audio Logic
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('open-invitation');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const bottomNav = document.getElementById('bottom-nav');
let isPlaying = false;

openBtn.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
        document.body.classList.remove('locked');
        playAudio();
        if (bottomNav) bottomNav.classList.remove('hidden');
    }, 1000);
});

// Scroll Spy for Active Nav State
const navItems = document.querySelectorAll('.nav-item');
const observedSections = document.querySelectorAll('.section');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeItem = document.querySelector(`.nav-item[href="#${id}"]`);
            if (activeItem) {
                navItems.forEach(item => item.classList.remove('active'));
                activeItem.classList.add('active');
            }
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: "-20% 0px -20% 0px" 
});

observedSections.forEach(section => {
    if (section.id) navObserver.observe(section);
});

function playAudio() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.classList.remove('hidden');
        updateMusicIcon();
    }).catch(err => console.log("Audio autoplay was prevented.", err));
}

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
    isPlaying = !isPlaying;
    updateMusicIcon();
});

function updateMusicIcon() {
    musicToggle.innerHTML = isPlaying ? '<i class="fa-solid fa-music"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
}

// Optimize to stop music when running in background (Tab inactive)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Tab is hidden, pause music if it was playing
        if (isPlaying) {
            bgMusic.pause();
        }
    } else {
        // Tab is active again, resume music if it was supposed to be playing
        if (isPlaying) {
            bgMusic.play().catch(e => console.log("Resume failed", e));
        }
    }
});

// Countdown Timer Logic
// Set the date we're counting down to: 15 Maret 2027 10:00:00 WIB (+0700)
const countDownDate = new Date("Mar 15, 2027 10:00:00+07:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');

    // If the count down is finished
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h2>Acara Telah Dimulai</h2>";
    }
}, 1000);

// Gift Section Toggle Logic
const toggleGiftBtn = document.getElementById('toggle-gift');
const giftContent = document.getElementById('gift-content');

toggleGiftBtn.addEventListener('click', () => {
    if (giftContent.classList.contains('hidden')) {
        giftContent.classList.remove('hidden');
        toggleGiftBtn.innerHTML = '<i class="fa-solid fa-gift"></i> Tutup Hadiah';
    } else {
        giftContent.classList.add('hidden');
        toggleGiftBtn.innerHTML = '<i class="fa-solid fa-gift"></i> Kirim Hadiah';
    }
});

// Copy to Clipboard Logic
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const textToCopy = e.target.closest('button').getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = e.target.closest('button').innerHTML;
            e.target.closest('button').innerHTML = '<i class="fa-solid fa-check"></i> Tersalin';
            setTimeout(() => {
                e.target.closest('button').innerHTML = originalText;
            }, 2000);
        });
    });
});

// RSVP Form Logic (WhatsApp)
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    
    // WA number for EnP Digital Service or the couple (Using the provided 082229243737)
    const phone = "6282229243737";
    const message = `Halo, saya ${name} mengkonfirmasi bahwa saya *${status}* pada acara pernikahan Baskara & Sekar.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
});

// Wishes Form Logic
document.getElementById('wishes-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('wish-name').value;
    const message = document.getElementById('wish-message').value;
    
    // Save to local storage for demo purposes
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    wishes.unshift({ name, message, date: new Date().toLocaleDateString() });
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
    
    // Also send via WhatsApp as requested "pake whatsap aja" could apply here too
    const phone = "6282229243737";
    const waMessage = `Doa dari ${name}:\n\n"${message}"`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
    
    // Reset form and reload list
    this.reset();
    loadWishes();
    
    // Open WA
    window.open(url, '_blank');
});

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const wishesList = document.getElementById('wishes-list');
    
    if (wishes.length > 0) {
        wishesList.innerHTML = '';
        wishes.forEach(w => {
            const div = document.createElement('div');
            div.className = 'wish-item fade-in';
            div.innerHTML = `<strong>${w.name}</strong><p class="text-sm mb-0">${w.message}</p><small class="text-xs text-muted">${w.date}</small>`;
            wishesList.appendChild(div);
        });
    }
}
