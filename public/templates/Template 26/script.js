// Handle Cover Page & Music
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

document.getElementById('btn-open').addEventListener('click', function () {
    const cover = document.getElementById('cover-page');
    cover.style.opacity = '0';
    setTimeout(() => {
        cover.style.visibility = 'hidden';
        cover.style.display = 'none';
    }, 800);

    // Play music
    bgMusic.play().then(() => {
        isMusicPlaying = true;
    }).catch(e => console.log("Audio play failed:", e));
});

// Music Toggle Logic
musicToggle.addEventListener('click', function () {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.add('paused');
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.classList.remove('paused');
        isMusicPlaying = true;
    }
});

// Pause music when tab is inactive
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        if (isMusicPlaying) bgMusic.pause();
    } else {
        if (isMusicPlaying) bgMusic.play().catch(e => console.log(e));
    }
});

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        // Stop background animations
        document.body.classList.add("modal-open");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
    // Check if any other modal is still open
    const anyModalOpen = document.querySelectorAll('.modal.open').length > 0;
    if (!anyModalOpen) {
        document.body.classList.remove("modal-open");
    }
}

// Close modal when clicking outside content
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('open');
        const anyModalOpen = document.querySelectorAll('.modal.open').length > 0;
        if (!anyModalOpen) {
            document.body.classList.remove("modal-open");
        }
    }
}

// Copy Text Function
function copyText(elementId, label) {
    const el = document.getElementById(elementId);
    if (el) {
        navigator.clipboard.writeText(el.innerText).then(() => {
            alert(label + " berhasil disalin!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}

// Salin Alamat
window.copyAlamat = function () {
    var copyText = document.getElementById("alamat-pengiriman").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Alamat Pengiriman berhasil disalin:\n" + copyText);
    });
}

// Toggle Glow Effect
window.toggleGlow = function () {
    const elements = document.querySelectorAll('.element');
    const glowBtnIcon = document.querySelector('#glow-toggle i');

    if (elements.length === 0) return;

    const isGlowing = !elements[0].classList.contains('no-glow');

    elements.forEach(el => {
        el.classList.toggle('no-glow');
    });

    if (isGlowing) {
        // Turn off
        glowBtnIcon.classList.remove('fas', 'fa-lightbulb');
        glowBtnIcon.classList.add('far', 'fa-lightbulb');
    } else {
        // Turn on
        glowBtnIcon.classList.remove('far', 'fa-lightbulb');
        glowBtnIcon.classList.add('fas', 'fa-lightbulb');
    }
}

// Swiper Initialization
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper !== 'undefined') {
        var thumbsSwiper = new Swiper(".thumbs-swiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var gallerySwiper = new Swiper(".gallery-swiper", {
            spaceBetween: 10,
            grabCursor: true,
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    }
});

// Countdown Logic
function updateCountdown() {
    // Target date: March 15, 2027 08:00:00
    const targetDate = new Date('March 15, 2027 08:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById('cd-days');
        const elHours = document.getElementById('cd-hours');
        const elMins = document.getElementById('cd-minutes');
        const elSecs = document.getElementById('cd-seconds');

        if (elDays) elDays.innerText = days;
        if (elHours) elHours.innerText = hours;
        if (elMins) elMins.innerText = minutes;
        if (elSecs) elSecs.innerText = seconds;
    } else {
        // If event passed
        const cdElements = document.querySelectorAll('.cd-box span');
        cdElements.forEach(el => el.innerText = '0');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Form submits (Redirect to WhatsApp)
const waNumber = "6282229243737"; // Assuming 082229243737

// RSVP Form
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nama = this.querySelector('input').value;
        const status = this.querySelector('select').value;
        const text = `Halo, saya *${nama}* ingin mengkonfirmasi bahwa saya *${status}* pada acara pernikahan Bima & Ayu.`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
        this.reset();
    });
}

// Wishes Form
const wishesForm = document.querySelector('.wishes-form');
if (wishesForm) {
    wishesForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nama = this.querySelector('input').value;
        const ucapan = this.querySelector('textarea').value;
        const text = `Halo Bima & Ayu, saya *${nama}* ingin menyampaikan ucapan:\n\n"${ucapan}"`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
        this.reset();

        // Optionally add to list locally
        const list = document.querySelector('.wishes-list');
        list.innerHTML = `<div style="text-align: left; background: var(--bg-light); padding: 10px; border-radius: 10px; margin-bottom: 10px;"><strong style="color: var(--primary);">${nama}</strong><p style="font-size: 0.9rem;">${ucapan}</p></div>` + list.innerHTML.replace('<p class="text-muted">Belum ada ucapan...</p>', '');
    });
}
