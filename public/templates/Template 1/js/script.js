/**
 * Undangan Pernikahan Digital - Performance Optimized Version
 * Optimized for: Low resource usage, Background task management, and Smooth interactions.
 */

(() => {
    // === 1. Utility Module ===
    const util = (() => {
        const spinner = '<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem;"></span>';
        
        const escapeHtml = (e) => String(e)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        const timeOut = (fn, delay = 0) => {
            let timer = setTimeout(() => {
                fn();
                clearTimeout(timer);
                timer = null;
            }, delay);
            return timer;
        };

        const changeOpacity = (el, show, step = 0.05) => {
            if (!el) return Promise.resolve();
            return new Promise(resolve => {
                let opacity = parseFloat(el.style.opacity) || 0;
                const target = show ? 1 : 0;
                
                const animate = () => {
                    opacity += show ? step : -step;
                    opacity = Math.max(0, Math.min(1, opacity));
                    el.style.opacity = opacity.toFixed(2);
                    
                    if ((show && opacity >= target) || (!show && opacity <= target)) {
                        el.style.opacity = target.toString();
                        resolve(el);
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            });
        };

        const safeInnerHTML = (el, html) => {
            el.replaceChildren(document.createRange().createContextualFragment(html));
            return el;
        };

        const copyText = async (btn, customIcon = null) => {
            const text = btn.getAttribute("data-copy");
            if (!text) return;
            
            const originalHTML = btn.innerHTML;
            btn.disabled = true;
            
            try {
                await navigator.clipboard.writeText(text);
                btn.innerHTML = customIcon || '<i class="fa-solid fa-check"></i>';
                timeOut(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 2000);
            } catch (err) {
                console.error("Failed to copy", err);
                btn.disabled = false;
            }
        };

        return { spinner, escapeHtml, timeOut, changeOpacity, safeInnerHTML, copyText };
    })();

    // === 2. Storage & Configuration ===
    const Storage = (key) => {
        const init = () => localStorage.getItem(key) || localStorage.setItem(key, "{}");
        init();
        return {
            get: (c) => {
                const data = JSON.parse(localStorage.getItem(key));
                return c ? data[String(c)] : data;
            },
            set: (c, val) => {
                const data = JSON.parse(localStorage.getItem(key));
                data[String(c)] = val;
                localStorage.setItem(key, JSON.stringify(data));
            },
            has: (c) => Object.keys(JSON.parse(localStorage.getItem(key))).includes(String(c)),
            clear: () => localStorage.setItem(key, "{}")
        };
    };

    // === 3. Theme Module ===
    const Theme = (() => {
        let storage = null;
        let metaTheme = null;
        const colors = { dark: ["#000000", "#212529"], light: ["#ffffff", "#f8f9fa"] };

        const apply = (mode) => {
            storage.set("active", mode);
            document.documentElement.setAttribute("data-bs-theme", mode);
            if (metaTheme) metaTheme.setAttribute("content", mode === "dark" ? colors.dark[0] : colors.light[0]);
        };

        return {
            init: () => {
                storage = Storage("theme");
                metaTheme = document.querySelector('meta[name="theme-color"]');
                let active = storage.get("active") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                apply(active);
            },
            change: () => apply(document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"),
            isDarkMode: () => document.documentElement.getAttribute("data-bs-theme") === "dark"
        };
    })();

    // === 4. Music & Audio Module (Visibility Aware) ===
    const AudioPlayer = (() => {
        let audio = null;
        let button = null;
        let isManuallyPaused = false;

        const toggle = () => {
            if (!audio) return;
            if (audio.paused) {
                audio.play();
                isManuallyPaused = false;
                updateUI(true);
            } else {
                audio.pause();
                isManuallyPaused = true;
                updateUI(false);
            }
        };

        const updateUI = (playing) => {
            if (!button) return;
            const icon = button.querySelector("i");
            if (playing) {
                icon.classList.replace("fa-circle-play", "fa-circle-pause");
                icon.classList.add("spin-button");
            } else {
                icon.classList.replace("fa-circle-pause", "fa-circle-play");
                icon.classList.remove("spin-button");
            }
        };

        return {
            init: (src) => {
                if (!src) return;
                audio = new Audio(src);
                audio.loop = true;
                button = document.getElementById("button-music");
                if (button) button.addEventListener("click", toggle);
            },
            play: () => {
                if (audio && !isManuallyPaused) {
                    audio.play().then(() => {
                        if (button) button.classList.remove("d-none");
                        updateUI(true);
                    }).catch(() => {
                        if (button) button.classList.remove("d-none");
                    });
                }
            },
            pause: () => { if (audio) audio.pause(); updateUI(false); },
            resume: () => { if (audio && !isManuallyPaused && !document.hidden) AudioPlayer.play(); }
        };
    })();

    // === 5. Connectivity Module ===
    const Connectivity = (() => {
        let banner = null;
        const show = (online) => {
            if (!banner) {
                banner = document.createElement("div");
                banner.className = "fixed-top pe-none transition-opacity";
                banner.style.cssText = "opacity: 0; z-index: 1057;";
                banner.innerHTML = `<div class="d-flex justify-content-center mx-auto"><div class="rounded-pill my-2 py-1 px-3 shadow text-white" style="font-size: 0.8rem;"></div></div>`;
                document.body.appendChild(banner);
            }
            const inner = banner.querySelector("div > div");
            inner.className = online ? "rounded-pill my-2 py-1 px-3 shadow text-white bg-success" : "rounded-pill my-2 py-1 px-3 shadow text-white bg-danger";
            inner.innerHTML = online ? '<i class="fa-solid fa-cloud me-2"></i>Koneksi tersedia kembali' : '<i class="fa-solid fa-ban me-2"></i>Koneksi tidak tersedia';
            util.changeOpacity(banner, true);
            if (online) util.timeOut(() => util.changeOpacity(banner, false), 3000);
        };

        return {
            init: () => {
                window.addEventListener("online", () => show(true));
                window.addEventListener("offline", () => show(false));
            }
        };
    })();

    // === 6. Invitation Logic (Visibility & Intersection Aware) ===
    const Invitation = (() => {
        let countdownTimer = null;
        let slideTimer = null;
        let countdownVisible = false;
        let currentSlide = 0;
        let nextSlideFunc = null;

        const updateCountdown = () => {
            if (document.hidden || !countdownVisible) return;

            const targetTime = new Date(document.body.getAttribute("data-time").replace(" ", "T")).getTime();
            const now = Date.now();
            const diff = Math.abs(targetTime - now);

            const pad = (n) => n < 10 ? `0${n}` : n;
            const elements = {
                day: document.getElementById("day"),
                hour: document.getElementById("hour"),
                minute: document.getElementById("minute"),
                second: document.getElementById("second")
            };

            if (elements.day) elements.day.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
            if (elements.hour) elements.hour.textContent = pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            if (elements.minute) elements.minute.textContent = pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
            if (elements.second) elements.second.textContent = pad(Math.floor((diff % (1000 * 60)) / 1000));

            countdownTimer = setTimeout(updateCountdown, 1000 - (Date.now() % 1000));
        };

        const handleSlides = async () => {
            const slides = document.querySelectorAll(".slide-desktop");
            const container = document.getElementById("root")?.querySelector(".d-sm-block");
            if (!slides.length || !container || window.getComputedStyle(container).display === "none") return;

            nextSlideFunc = async () => {
                if (document.hidden) return;
                
                await util.changeOpacity(slides[currentSlide], false);
                slides[currentSlide].classList.remove("slide-desktop-active");
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add("slide-desktop-active");
                await util.changeOpacity(slides[currentSlide], true);
                
                slideTimer = setTimeout(nextSlideFunc, 6000);
            };

            slides[currentSlide].classList.add("slide-desktop-active");
            await util.changeOpacity(slides[currentSlide], true);
            slideTimer = setTimeout(nextSlideFunc, 6000);
        };

        const initConfetti = () => {
            if (window.confetti && document.body.getAttribute("data-confetti") === "true") {
                window.confetti({ origin: { y: 1 }, zIndex: 1057 });
            }
        };

        const handleGuestName = () => {
            const params = new URLSearchParams(window.location.search);
            const to = params.get("to");
            if (to) {
                const guestEl = document.getElementById("guest-name");
                if (guestEl) {
                    const msg = guestEl.getAttribute("data-message") || "Kepada Yth Bapak/Ibu/Saudara/i";
                    util.safeInnerHTML(guestEl, `<div class="m-2"><small class="mt-0 mb-1 mx-0 p-0">${util.escapeHtml(msg)}</small><p class="m-0 p-0" style="font-size: 1.25rem">${util.escapeHtml(to)}</p></div>`);
                }
            }
        };

        return {
            init: () => {
                handleGuestName();
                // Observer for Countdown
                const countdownEl = document.getElementById("wedding-date");
                if (countdownEl) {
                    const observer = new IntersectionObserver((entries) => {
                        countdownVisible = entries[0].isIntersecting;
                        if (countdownVisible) updateCountdown();
                        else if (countdownTimer) clearTimeout(countdownTimer);
                    }, { threshold: 0.1 });
                    observer.observe(countdownEl);
                }

                // Global Visibility Handler
                document.addEventListener("visibilitychange", () => {
                    if (document.hidden) {
                        if (countdownTimer) clearTimeout(countdownTimer);
                        if (slideTimer) clearTimeout(slideTimer);
                        AudioPlayer.pause();
                    } else {
                        if (countdownVisible) updateCountdown();
                        if (nextSlideFunc) {
                            if (slideTimer) clearTimeout(slideTimer);
                            slideTimer = setTimeout(nextSlideFunc, 6000);
                        }
                        AudioPlayer.resume();
                    }
                });

                // Image Modal logic
                document.querySelectorAll("[onclick='undangan.guest.modal(this)']").forEach(img => {
                    img.removeAttribute("onclick");
                    img.addEventListener("click", () => {
                        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modal-image"));
                        document.getElementById("show-modal-image").src = img.src;
                        modal.show();
                    });
                });
            },
            open: async (btn) => {
                btn.disabled = true;
                document.getElementById("root").classList.remove("opacity-0");
                
                initConfetti();
                AudioPlayer.play();
                
                const themeBtn = document.getElementById("button-theme");
                if (themeBtn) themeBtn.classList.remove("d-none");

                handleSlides();
                
                await util.changeOpacity(document.getElementById("welcome"), false);
                document.getElementById("welcome").remove();
            },
            showStory: (overlay) => {
                if (navigator.vibrate) navigator.vibrate(100);
                if (window.confetti) window.confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
                util.changeOpacity(overlay, false).then(() => overlay.remove());
            }
        };
    })();

    // === 7. Main Initialization ===
    window.addEventListener("load", () => {
        Theme.init();
        AudioPlayer.init(document.body.getAttribute("data-audio"));
        Connectivity.init();
        Invitation.init();

        if (typeof AOS !== "undefined") AOS.init();
        
        // Final Global Exports
        window.undangan = {
            util: { copy: util.copyText },
            theme: { change: Theme.change },
            guest: { 
                open: (btn) => Invitation.open(btn),
                modal: (img) => {
                    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modal-image"));
                    document.getElementById("show-modal-image").src = img.src;
                    modal.show();
                },
                showStory: (overlay) => Invitation.showStory(overlay),
                closeInformation: () => Storage("information").set("info", true)
            }
        };
    });
})();
