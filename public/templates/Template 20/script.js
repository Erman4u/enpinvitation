// Initialize AOS Animation globally
AOS.init({
    once: true,
    offset: 50,
    easing: 'ease-out-cubic',
});

// Parse URL Parameters for Guest Name
const urlParams = new URLSearchParams(window.location.search);
const guestNameParam = urlParams.get('to');
const guestNameElement = document.getElementById('guest-name');

if (guestNameParam && guestNameElement) {
    // Decode URI component (e.g. %20 -> space)
    guestNameElement.innerText = decodeURIComponent(guestNameParam);
}

// Elements
const cover = document.getElementById('cover');
const openBtn = document.getElementById('open-invitation');
const mainContent = document.querySelector('.main-content');
const bottomNav = document.querySelector('.bottom-nav');
const musicControl = document.getElementById('music-control');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;
let swiperInitialized = false;

// Open Invitation Logic
openBtn.addEventListener('click', () => {
    // Buka kunci scroll
    document.body.style.overflowY = 'auto';

    // Slide up cover
    cover.classList.add('slide-up');
    
    // Show main content
    mainContent.style.display = 'block';
    bottomNav.style.display = 'block';
    musicControl.style.display = 'flex';

    // Trigger smooth fade-in for hero title (FIXED: Moved from sendWhatsapp)
    const heroTitle = document.querySelector('.hero .main-title');
    if (heroTitle) heroTitle.classList.add('reveal');
    startPetals();
    
    // Optimasi: Inisialisasi Swiper HANYA setelah overlay dibuka
    if (!swiperInitialized) {
        new Swiper('.gallery-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
        swiperInitialized = true;
    }

    // Play music only after interaction
    playMusic();
    
    // Hide cover after transition completely and refresh AOS DOM cache
    setTimeout(() => {
        cover.style.display = 'none';
        AOS.refresh(); 
    }, 1200);
});

// Music Player Logic
function playMusic() {
    bgMusic.play().catch(e => console.log('Audio autoplay blocked', e));
    isPlaying = true;
    musicControl.classList.add('spin');
}

function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicControl.classList.remove('spin');
}

musicControl.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Pause music when tab is hidden (Optimasi background audio)
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (isPlaying) bgMusic.pause();
    } else {
        // Resume music if it was intentionally playing
        if (isPlaying) bgMusic.play().catch(e => console.log(e));
    }
});

// Countdown Timer (15 March 2027)
const eventDate = new Date("Mar 15, 2027 08:00:00").getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

// Clipboard.js for copying account number
const clipboard = new ClipboardJS('.btn-copy');

clipboard.on('success', function(e) {
    Swal.fire({
        icon: 'success',
        title: 'Tersalin!',
        text: 'Nomor rekening telah disalin.',
        showConfirmButton: false,
        timer: 1500,
        background: '#FFFFFF',
        color: '#2C3539',
        iconColor: '#B7955B'
    });
    e.clearSelection();
});

clipboard.on('error', function(e) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menyalin nomor rekening.',
        background: '#FFFFFF',
        color: '#2C3539'
    });
});

// WhatsApp Message Sender
function sendWhatsapp() {
    const name = document.getElementById('wish-name').value;
    const wish = document.getElementById('wish-text').value;
    
    if(!name || !wish) {
        Swal.fire({
            icon: 'warning',
            title: 'Perhatian',
            text: 'Harap isi nama dan ucapan terlebih dahulu.',
            background: '#FFFFFF',
            color: '#2C3539',
            iconColor: '#B7955B',
            confirmButtonColor: '#B7955B'
        });
        return;
    }

    const phoneNumber = "6281234567890"; // Ganti dengan nomor tujuan
    const message = `Halo Iskandar & Sekar,\n\nSaya ${name},\n\n${wish}`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav ul li a');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Subtle Parallax Effect for Background
    const bg = document.querySelector('.luxury-bg');
    if (bg) {
        bg.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrolled >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Show Gift Button Logic
const btnShowGift = document.getElementById('btn-show-gift');
const giftContainer = document.getElementById('gift-container');

if (btnShowGift && giftContainer) {
    btnShowGift.addEventListener('click', () => {
        giftContainer.style.display = 'flex';
        btnShowGift.style.display = 'none';
        
        // Timeout to let DOM update before refreshing AOS animations
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });
}

// Flower Petals Effect Logic
function startPetals() {
    const container = document.getElementById('petal-container');
    if (!container) return;

    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const size = Math.random() * 10 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animation = `fall ${Math.random() * 5 + 5}s ease-in-out infinite`;
        petal.style.opacity = Math.random();
        // Gold & Champagne color palette
        petal.style.backgroundColor = ['#B7955B', '#DFD3C3', '#E8E1D5', '#FFFFFF'][Math.floor(Math.random() * 4)];

        container.appendChild(petal);

        // Cleanup
        setTimeout(() => petal.remove(), 10000);
    }, 400);
}
