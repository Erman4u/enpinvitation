// ================================================================
// CORE INVITATION SCRIPTSS
// ===============================================================

// --- Buka Undangan ---
function openInvitation() {
	const overlay = document.getElementById('overlay'); // Use const
	if (overlay) {
		// Untuk transisi opacity yang lebih bersih, pertimbangkan untuk menggunakan kelas CSS
		// seperti 'is-closing' yang mengatur opacity: 0 dan memiliki transisi CSS.
		// Kemudian, setelah transisi selesai, tambahkan kelas 'hidden' yang mengatur display: none.
		overlay.classList.add('is-closing'); // Tambahkan kelas untuk memicu transisi opacity
		setTimeout(() => { // Gunakan arrow function untuk sintaks yang lebih ringkas
			overlay.style.display = 'none';
			overlay.classList.add('hidden');
			overlay.classList.remove('is-closing'); // Bersihkan kelas transisi setelah selesai
			document.body.classList.remove('overlay-open'); // unlock scroll
		}, 600);
	}
	// Start music
	try {
		if (typeof YT !== 'undefined' && window._ytPlayer) {
			window._ytPlayer.playVideo();
		}
	} catch (e) { /* Pertimbangkan untuk mencatat kesalahan di sini, mis. console.error("Error playing video:", e); */ }
}

// --- Scroll to section ---
function scrollToElement(id) {
	const el = document.getElementById(id); // Use const
	if (el) {
		const offset = 60; // Use const
		const top = el.getBoundingClientRect().top + window.pageYOffset - offset; // Use const
		window.scrollTo({ top: top, behavior: 'smooth' });
	}
}

// --- Save to Calendar ---
window.saveToCalendar = function () {
	const weddingData = { // Use const
		title: "The Wedding of Blacky & Cimeng",
		description: "Mohon doa restu Anda semua untuk pernikahan kami. \n\nLokasi Maps: https://maps.app.goo.gl/o1WujU5SAPhaLp1u6",
		location: "RT 02, Desa Padang Jaya, Kec. Kuaro, Kab. Paser, Kalimantan Timur 76281",
		start: "20270315T080000",
		end: "20270315T210000"
	};

	const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" + // Use const
		"&text=" + encodeURIComponent(weddingData.title) +
		"&dates=" + weddingData.start + "/" + weddingData.end +
		"&details=" + encodeURIComponent(weddingData.description) +
		"&location=" + encodeURIComponent(weddingData.location);

	window.open(googleUrl, '_blank');
};

// --- Tombol Buka Undangan ---
document.addEventListener('DOMContentLoaded', function () {
	// Kunci scroll saat overlay tampil
	document.body.classList.add('overlay-open');

	const btn = document.getElementById('open-invitation'); // Use const
	if (btn) {
		btn.addEventListener('click', function () {
			openInvitation();
		});
	}

    // Sentralisasi nomor WhatsApp jika digunakan di beberapa tempat
    const whatsappNumber = '6282229243737';

	// --- Read guest name from URL query ?to=NamaTamu ---
	const params = new URLSearchParams(window.location.search); // Use const
	let guestName = params.get('to') || params.get('nama') || ''; // Use let
	const overlayGuestNameEl = document.getElementById('overlay-guest-name'); // Cache elemen DOM
	if (guestName) {
		guestName = decodeURIComponent(guestName.replace(/\+/g, ' '));
		if (overlayGuestNameEl) overlayGuestNameEl.textContent = guestName;
	} else {
		if (overlayGuestNameEl) overlayGuestNameEl.textContent = 'Tamu Undangan';
	}

	// --- RSVP WhatsApp Form ---
	const rsvpForm = document.getElementById('rsvp-form'); // Use const
	if (rsvpForm) {
		rsvpForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const nameInput = document.getElementById('rsvp-name'); // Cache input elements
			const countInput = document.getElementById('rsvp-count'); // Cache input elements

			const name = nameInput ? nameInput.value.trim() : '';
			const count = countInput ? countInput.value : '';

			if (!name || !count) {
                // Untuk UX yang lebih baik, pertimbangkan untuk menampilkan pesan kesalahan di formulir itu sendiri
                // daripada menggunakan alert() yang mengganggu.
                alert('Mohon isi semua kolom!');
                return;
            }
			const msg = encodeURIComponent( // Use const dan template literal
				`Assalamu'alaikum, saya ${name} akan hadir ${count} orang dalam acara pernikahan Blacky & Cimeng. Terima kasih atas undangannya. 🙏`
			);
			window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank'); // Gunakan template literal dan nomor terpusat
		});
	}

	// --- Greeting/Ucapan WhatsApp Form ---
	const greetForm = document.getElementById('greeting-form'); // Use const
	if (greetForm) {
		greetForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const nameInput = document.getElementById('greeting-name'); // Cache input elements
			const msgInput = document.getElementById('greeting-message'); // Cache input elements

			const name = nameInput ? nameInput.value.trim() : '';
			const msg = msgInput ? msgInput.value.trim() : '';

			if (!name || !msg) {
                // Untuk UX yang lebih baik, pertimbangkan untuk menampilkan pesan kesalahan di formulir itu sendiri
                // daripada menggunakan alert() yang mengganggu.
                alert('Mohon isi semua kolom!');
                return;
            }
			const text = encodeURIComponent( // Use const dan template literal
				`Assalamu'alaikum \nDari: ${name}\nUcapan: ${msg}`
			);
			window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank'); // Gunakan template literal dan nomor terpusat
		});
	}

	// --- Copy Rekening ---
	window.copyRekening = function (id) {
		const el = document.getElementById(id); // Use const
		if (!el) return;
		const text = el.textContent || el.innerText; // Use const
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(function () {
				alert('Nomor rekening berhasil disalin: ' + text);
			});
		} else {
			var ta = document.createElement('textarea');
			ta.value = text; // Use const
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			document.body.removeChild(ta);
			alert('Nomor rekening berhasil disalin: ' + text);
		}
	};

	// --- Countdown ---
	const weddingDate = new Date('2027-03-15T13:00:00'); // Use const
	let countdownInterval = null; // Use let

	const countdownEl = document.querySelector('.simply-countdown-wedding'); // Cache elemen DOM

	function updateCountdown() {
		// Optimization: Don't update if page is hidden
		if (document.hidden) return;

		const now = new Date(); // Use const
		const diff = weddingDate - now; // Use const
		if (diff <= 0) {
			if (countdownEl) countdownEl.innerHTML = '<span style="color:#71836A;font-weight:bold;">Hari Pernikahan Telah Tiba! 🎉</span>';
			clearInterval(countdownInterval);
			return;
		}
		const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Use const
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Use const
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Use const
		const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Use const

		if (countdownEl) {
            countdownEl.innerHTML = `
                <div class="countdown-container">
                    <div class="countdown-box"><strong class="countdown-value">${days}</strong><br><small>Hari</small></div>
                    <div class="countdown-box"><strong class="countdown-value">${hours}</strong><br><small>Jam</small></div>
                    <div class="countdown-box"><strong class="countdown-value">${minutes}</strong><br><small>Menit</small></div>
                    <div class="countdown-box"><strong class="countdown-value">${seconds}</strong><br><small>Detik</small></div>
                </div>
            `;
        }
	}
	updateCountdown();
	countdownInterval = setInterval(updateCountdown, 1000);

	// --- Page Visibility API ---
	document.addEventListener('visibilitychange', function () {
		if (document.hidden) {
			// Tab is inactive
			document.body.classList.add('is-paused');
			// Pause music if player exists
			try {
				if (typeof YT !== 'undefined' && window._ytPlayer && window._ytPlayer.pauseVideo) {
					window._ytPlayer.pauseVideo();
				}
			} catch (e) { /* Pertimbangkan untuk mencatat kesalahan di sini */ }
		} else {
			// Tab is active again
			document.body.classList.remove('is-paused');
			// Resume countdown immediately
			updateCountdown();
			// Resume music if it was previously playing (or if openInvitation was already called)
			const overlay = document.getElementById('overlay'); // Use const
			if (overlay && overlay.classList.contains('hidden')) {
				try {
					if (typeof YT !== 'undefined' && window._ytPlayer && window._ytPlayer.playVideo) {
						window._ytPlayer.playVideo();
					}
				} catch (e) { /* Pertimbangkan untuk mencatat kesalahan di sini */ }
			}
		}
	});

	// --- Animate on scroll (Optimized with IntersectionObserver) ---
	const animateOptions = { // Use const
		threshold: 0.15
	};

	const animateObserver = new IntersectionObserver(function (entries, observer) { // Use const
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('fadeInUp', 'animated');
				observer.unobserve(entry.target);
			}
		});
	}, animateOptions);

	const boxes = document.querySelectorAll('.animate-box'); // Use const
	boxes.forEach(function (box) {
		animateObserver.observe(box);
	});

	// --- Gift Section Toggle ---
	const toggleGiftButton = document.getElementById('toggle-gift-button');
	const giftCardsWrapper = document.getElementById('gift-cards-wrapper');
	// Cache giftItems sekali jika wrapper ada
	const giftItems = giftCardsWrapper ? giftCardsWrapper.querySelectorAll('.item-protocol') : []; // Use const

	if (toggleGiftButton && giftCardsWrapper) {
		toggleGiftButton.addEventListener('click', function() {
			// Gunakan kelas CSS untuk mengelola tampilan dan animasi untuk pemeliharaan yang lebih baik
			if (giftCardsWrapper.classList.contains('is-hidden')) { // Periksa kelas daripada style.display
				giftCardsWrapper.classList.remove('is-hidden');
				giftCardsWrapper.classList.add('is-visible'); // Tambahkan kelas untuk visibilitas
				toggleGiftButton.textContent = 'Sembunyikan Informasi Hadiah';
				giftItems.forEach((item, index) => {
					setTimeout(() => {
						item.classList.add('show');
					}, index * 100); // Staggered animation
				});
			} else {
				giftCardsWrapper.classList.add('is-hidden');
				giftCardsWrapper.classList.remove('is-visible');
				toggleGiftButton.textContent = 'Tampilkan Informasi Hadiah';
				giftItems.forEach(item => item.classList.remove('show'));
			}
		});
        // Inisialisasi status: jika giftCardsWrapper harus disembunyikan secara default,
        // tambahkan kelas 'is-hidden' dan atur teks tombol yang sesuai.
        // Berdasarkan kode asli, diasumsikan dimulai dalam keadaan terlihat.
	}

	// --- Gallery: fungsi popup klik biasa ---
	const galleryGrid = document.getElementById('gallery-grid'); // Use const
	if (galleryGrid) {
		// Gunakan kelas CSS untuk properti display untuk pemisahan kekhawatiran yang lebih baik
		// Misalnya, tambahkan kelas 'is-flex' di CSS Anda: #gallery-grid.is-flex { display: flex; }
		galleryGrid.classList.add('is-flex');
		galleryGrid.querySelectorAll('a.gallery-link').forEach(function (a) {
			a.addEventListener('click', function (e) {
				e.preventDefault();
				window.open(a.href, '_blank');
			});
		});
	}

	// --- Music Toggle ---
	const floatBtn = document.getElementById('floating-button'); // Use const
	if (floatBtn) {
		floatBtn.addEventListener('click', function () {
			if (typeof YT !== 'undefined' && window._ytPlayer) {
				const state = window._ytPlayer.getPlayerState(); // Use const
				if (state === YT.PlayerState.PLAYING) {
					window._ytPlayer.pauseVideo();
				} else {
					window._ytPlayer.playVideo();
				}
			}
		});
	}
});

// --- YouTube Audio Player Initialization (Global scope for API) ---
function onYouTubeIframeAPIReady() {
	const ctrl = document.getElementById('youtube-audio1'); // Use const
	if (!ctrl) return;

	window._ytPlayer = new YT.Player('youtube-audio1', {
		height: '0',
		width: '0',
		videoId: ctrl.dataset.video,
		playerVars: {
			autoplay: ctrl.dataset.autoplay,
			loop: ctrl.dataset.loop,
			playlist: ctrl.dataset.video // Required for infinite loop
		},
		events: {
			onReady: function (e) {
				// Optional: set initial state
				e.target.setVolume(100);
			}
		}
	});
}
