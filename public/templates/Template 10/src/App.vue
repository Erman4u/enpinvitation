<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import OpeningScreen from './components/OpeningScreen.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Couple from './components/Couple.vue'
import Countdown from './components/Countdown.vue'
import EventDetails from './components/EventDetails.vue'
import LoveStory from './components/LoveStory.vue'
import Gallery from './components/Gallery.vue'
import RSVP from './components/RSVP.vue'
import Gift from './components/Gift.vue'
import Closing from './components/Closing.vue'

const isOpened = ref(false)
const guestName = ref('')
const isPlaying = ref(false)

const handleVisibilityChange = () => {
  const audio = document.getElementById('bg-music')
  if (document.hidden) {
    // Tab inactive: Pause animations & music
    document.body.classList.add('pause-animations')
    if (audio && isPlaying.value) audio.pause()
  } else {
    // Tab active: Resume animations & music
    document.body.classList.remove('pause-animations')
    if (audio && isPlaying.value) audio.play()
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  guestName.value = urlParams.get('to') || ''
  
  // Setup Performance Optimizer
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const handleOpen = () => {
  isOpened.value = true
  isPlaying.value = true
  const audio = document.getElementById('bg-music')
  if (audio) {
    audio.play()
  }
}

const toggleMusic = () => {
  const audio = document.getElementById('bg-music')
  if (audio) {
    if (isPlaying.value) {
      audio.pause()
    } else {
      audio.play()
    }
    isPlaying.value = !isPlaying.value
  }
}
</script>

<template>
  <div class="min-h-screen bg-magical-blue overflow-x-hidden">
    <!-- Opening Screen Overlay -->
    <OpeningScreen 
      v-if="!isOpened" 
      :guest-name="guestName" 
      @open="handleOpen" 
    />

    <!-- Main Content -->
    <div v-show="isOpened" class="relative">
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="couple">
          <Couple />
        </section>

        <section id="countdown">
          <Countdown />
        </section>

        <section id="event">
          <EventDetails />
        </section>

        <section id="story">
          <LoveStory />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="rsvp">
          <RSVP />
        </section>

        <section id="gift">
          <Gift />
        </section>

        <Closing />
      </main>
    </div>

    <!-- Background Music -->
    <audio id="bg-music" loop>
      <source src="/asset/audio/background-music.mp3" type="audio/mpeg">
    </audio>

    <!-- Music Toggle Button -->
    <button 
      v-if="isOpened"
      @click="toggleMusic"
      class="fixed top-6 right-6 z-[90] w-12 h-12 flex items-center justify-center glass-panel rounded-full border border-magical-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      :class="{ 'animate-spin-slow': isPlaying }"
    >
      <svg v-if="isPlaying" class="w-6 h-6 text-magical-gold" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <svg v-else class="w-6 h-6 text-magical-gold/50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"/>
      </svg>
    </button>
  </div>
</template>

<style>
/* Global transitions can go here */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
