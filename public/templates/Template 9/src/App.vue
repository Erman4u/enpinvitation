<template>
  <div class="relative min-h-screen overflow-x-hidden font-brutal">
    <!-- Theme Toggle Floating Button -->
    <button 
      @click="toggleTheme" 
      class="fixed top-20 right-6 z-[1001] w-12 h-12 rounded-full neo-border neo-shadow flex items-center justify-center transition-all active:scale-95"
      :class="isDarkMode ? 'bg-neo-yellow text-neo-black' : 'bg-neo-black text-neo-yellow'"
    >
      <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </button>

    <!-- Opening Overlay -->
    <Opening 
      :guest-name="guestName" 
      @opened="openInvitation" 
    />

    <!-- Main Content -->
    <div v-if="isOpened" class="animate-slide-in">
      <MusicBar ref="musicRef" />

      <Hero />
      <Couple />
      <SaveTheDate />
      <EventDetails />
      <LoveStory />
      <Gallery />
      <RSVP :guest-name="guestName" />
      <Gift />
      <Footer />

      <Navbar :show="isOpened" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Opening from './components/Opening.vue'
import MusicBar from './components/MusicBar.vue'
import Hero from './components/Hero.vue'
import Couple from './components/Couple.vue'
import SaveTheDate from './components/SaveTheDate.vue'
import EventDetails from './components/EventDetails.vue'
import LoveStory from './components/LoveStory.vue'
import Gallery from './components/Gallery.vue'
import RSVP from './components/RSVP.vue'
import Gift from './components/Gift.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

const isOpened = ref(false)
const isDarkMode = ref(false)
const guestName = ref('')
const musicRef = ref(null)

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function openInvitation() {
  isOpened.value = true
  // Start music otomatis saat undangan dibuka
  if (musicRef.value) {
    musicRef.value.toggleMusic()
  }
}

onMounted(() => {
  // Handle ?to=namatamu
  const params = new URLSearchParams(window.location.search)
  const to = params.get('to')
  if (to) {
    guestName.value = to.replace(/\+/g, ' ')
  }

  // Performance optimization: manage global visibility
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('is-hidden')
    } else {
      document.body.classList.remove('is-hidden')
    }
  })
})
</script>

<style>
/* Global transition for main content arrival */
.animate-slide-in {
  animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
