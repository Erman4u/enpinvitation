// Initialize AOS
AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
});

// URL Parameters for Guest Name
const urlParams = new URLSearchParams(window.location.search);
const to = urlParams.get('to');
const guestNameElement = document.getElementById('guest-name');
if (to) {
    guestNameElement.innerText = to;
}

// Open Invitation & Play Music
const btnOpen = document.getElementById('open-invitation');
const coverOverlay = document.getElementById('cover-overlay');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');
let isPlaying = false;

btnOpen.addEventListener('click', () => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Hide overlay
    coverOverlay.style.transform = 'translateY(-100%)';
    coverOverlay.style.opacity = '0';
    
    setTimeout(() => {
        coverOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        AOS.refresh();
        
        // Play music
        bgMusic.play().then(() => {
            isPlaying = true;
            audioControl.classList.remove('paused');
        }).catch(err => {
            console.log("Audio autoplay prevented by browser.");
            audioControl.classList.add('paused');
            isPlaying = false;
        });
        
        // Start falling leaves effect
        createFallingLeaves();
    }, 800); // match transition duration
});

// Audio Control
audioControl.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioControl.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
        audioControl.classList.add('paused');
    } else {
        bgMusic.play();
        audioControl.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>';
        audioControl.classList.remove('paused');
    }
    isPlaying = !isPlaying;
});

// Falling Leaves Effect
function createFallingLeaves() {
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'falling-leaves-container';
    document.body.appendChild(leavesContainer);

    const leafIcons = ['fa-leaf', 'fa-seedling', 'fa-canadian-maple-leaf'];
    
    for (let i = 0; i < 12; i++) {
        const leaf = document.createElement('i');
        const randomIcon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
        leaf.className = `fa-solid ${randomIcon} falling-leaf`;
        
        // Random properties
        leaf.style.left = Math.random() * 100 + 'vw';
        
        const fallDuration = Math.random() * 15 + 15; // 15s ke 30s (Lebih lambat)
        const swayDuration = Math.random() * 4 + 4; // 4s ke 8s (Goyangan lebih halus)
        
        leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
        leaf.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 5}s`;
        
        const size = Math.random() * 8 + 10; // 10px to 18px
        leaf.style.fontSize = size + 'px';

        // Variasi warna: Sage Green, Rustic Brown, dan Light Tan
        const colors = ['#6b705c', '#9c8473', '#7b6250', '#c2b2a3'];
        leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Variasi rotasi dan intensitas goyangan agar lebih natural
        leaf.style.setProperty('--start-rotation', Math.random() * 360 + 'deg');
        leaf.style.setProperty('--end-rotation', (Math.random() * 720 - 360) + 'deg');
        leaf.style.setProperty('--sway-amount', (Math.random() * 50 + 20) + 'px');
        
        // Randomly tint leaves slightly to earthy colors
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        leaf.style.opacity = opacity;
        
        leavesContainer.appendChild(leaf);
    }
}

// Countdown Timer
const countDownDate = new Date("Mar 15, 2027 08:00:00").getTime();
let countdownInterval;

function startCountdown() {
    if (countdownInterval) return;
    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<div class='countdown-item rustic-border'>Acara Telah Dimulai</div>";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}

startCountdown();

// Optimize so it doesn't run in background
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        startCountdown();
        document.body.classList.remove('pause-animations');
        if (isPlaying) {
            bgMusic.play().catch(e => console.log(e));
        }
    } else {
        stopCountdown();
        document.body.classList.add('pause-animations');
        if (isPlaying) {
            bgMusic.pause();
        }
    }
});

// Gift Reveal
const btnGift = document.getElementById('btn-gift');
const giftContent = document.getElementById('gift-content');

btnGift.addEventListener('click', () => {
    if (giftContent.classList.contains('hidden')) {
        giftContent.classList.remove('hidden');
        btnGift.innerHTML = '<i class="fa-solid fa-times"></i> Tutup Detail Hadiah';
    } else {
        giftContent.classList.add('hidden');
        btnGift.innerHTML = '<i class="fa-solid fa-gift"></i> Kirim Hadiah';
    }
});

// Copy Text
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor rekening berhasil disalin!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// RSVP Form Submit Alert
document.getElementById('form-rsvp').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih atas konfirmasi kehadiran Anda!');
    this.reset();
});

// Send WhatsApp
function sendWhatsApp() {
    const nama = document.getElementById('nama_ucapan').value;
    const ucapan = document.getElementById('ucapan').value;
    
    if(!nama || !ucapan) {
        alert('Mohon isi nama dan ucapan terlebih dahulu.');
        return;
    }

    const phone = "6281234567890"; // Ganti dengan nomor WhatsApp tujuan
    const message = `Halo, saya ${nama}.%0A%0AUcapan: ${ucapan}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    
    window.open(url, '_blank');
    document.getElementById('form-ucapan').reset();
}

// Navbar Active Link on Scroll
const observerOptions = {
    threshold: 0.4 // Memicu ketika 40% section terlihat di layar
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const navItem = document.querySelector(`.nav-item[href="#${id}"]`);
            
            if (navItem) {
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                navItem.classList.add('active');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
