<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Scene from './components/Scene.vue'
import HeroSection from './components/HeroSection.vue'
import QuoteSection from './components/QuoteSection.vue'
import CoupleSection from './components/CoupleSection.vue'
import FallingFeathers from './components/FallingFeathers.vue'
import CountdownSection from './components/CountdownSection.vue'
import EventDetail from './components/EventDetail.vue'
import LoveStory from './components/LoveStory.vue'
import GallerySection from './components/GallerySection.vue'
import RSVPSection from './components/RSVPSection.vue'
import GiftSection from './components/GiftSection.vue'
import ClosingSection from './components/ClosingSection.vue'
import Navbar from './components/Navbar.vue'

import { Music2, Music } from 'lucide-vue-next'

const isOpened = ref(false)
const isPlaying = ref(false)
const audioPlayer = ref(null)

const openInvitation = () => {
  isOpened.value = true
  window.scrollTo(0, 0)
  
  if (audioPlayer.value) {
    audioPlayer.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => console.log("Autoplay blocked:", err))
  }

  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  }, 500)
}

const toggleMusic = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    document.body.classList.add('tab-hidden')
    if (isPlaying.value && audioPlayer.value) {
      audioPlayer.value.pause()
    }
  } else {
    document.body.classList.remove('tab-hidden')
    if (isPlaying.value && audioPlayer.value) {
      audioPlayer.value.play()
    }
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="min-h-screen bg-swan-gray selection:bg-swan-blue overflow-x-hidden">
    <!-- Opening Scene -->
    <Transition name="fade">
      <div v-if="!isOpened" class="fixed inset-0 z-[100]">
        <Scene :isInteractive="true" @open="openInvitation" />
      </div>
    </Transition>

    <!-- Main Content -->
    <main v-if="isOpened" class="relative">
      <!-- Bottom Navigation Bar -->
      <Navbar />

      <!-- Background Effects (Fewer feathers for main content) -->
      <FallingFeathers :count="8" :opacity="0.2" />

      <HeroSection id="hero" />
      <QuoteSection />
      <CoupleSection id="couple" />
      <CountdownSection />
      <EventDetail id="event" />
      <LoveStory id="story" />
      <GallerySection id="gallery" />
      <RSVPSection id="rsvp" />
      <GiftSection id="gift" />
      <ClosingSection />
      
      <!-- Global Effects Layer -->
      <div class="fixed inset-0 pointer-events-none z-[50]">
        <div class="mist-layer animate-mist opacity-10"></div>
      </div>

      <!-- Music Toggle -->
      <button @click="toggleMusic" 
              class="fixed bottom-24 right-6 z-[60] w-12 h-12 glass rounded-full flex items-center justify-center text-swan-deep shadow-2xl hover:scale-110 transition-transform md:bottom-6">
        <Music2 v-if="isPlaying" class="w-5 h-5 animate-spin-slow" />
        <Music v-else class="w-5 h-5 opacity-50" />
      </button>
    </main>

    <!-- Background Music -->
    <audio ref="audioPlayer" loop>
      <source src="/Asset/audio/background-music.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
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

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #C0C0C0;
  border-radius: 10px;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  will-change: transform, opacity;
  backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease-out;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}

.parallax-img {
  transform: scale(1.15) translateY(8%);
  transition: transform 2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  will-change: transform;
}

.reveal.active .parallax-img {
  transform: scale(1.1) translateY(0);
}

.group:hover .parallax-img {
  transform: scale(1.15) translateY(-2%);
}

/* Falling Feathers Overlay Animation */
@keyframes feather-fall {
  0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
  15% { opacity: 0.7; }
  85% { opacity: 0.7; }
  100% { transform: translate3d(30px, 450px, 0) rotate(360deg); opacity: 0; }
}

.feather-particle {
  position: absolute;
  will-change: transform, opacity;
  width: 6px;
  height: 12px;
  background: white;
  border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
  filter: blur(1px);
  pointer-events: none;
  z-index: 25;
  animation: feather-fall linear infinite;
}

.feather-particle:nth-child(even) {
  width: 4px;
  height: 8px;
}
</style>
