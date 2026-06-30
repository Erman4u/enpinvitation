<script setup lang="ts">
import { ref } from 'vue'
import OpeningScreen from './components/OpeningScreen.vue'
import SakuraFall from './components/SakuraFall.vue'
import SakuraOrnament from './components/SakuraOrnament.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import HeroSection from './components/HeroSection.vue'
import MempelaiSection from './components/MempelaiSection.vue'
import StorySection from './components/StorySection.vue'
import EventSection from './components/EventSection.vue'
import GallerySection from './components/GallerySection.vue'
import GiftSection from './components/GiftSection.vue'
import RsvpSection from './components/RsvpSection.vue'
import FooterSection from './components/FooterSection.vue'
import Navbar from './components/Navbar.vue'
import AOS from 'aos'

const isOpened = ref(false)
const musicPlayerRef = ref<InstanceType<typeof MusicPlayer> | null>(null)

const handleOpen = () => {
  isOpened.value = true
  if (musicPlayerRef.value && musicPlayerRef.value.playMusic) {
    musicPlayerRef.value.playMusic()
  }
  setTimeout(() => {
    AOS.refresh()
  }, 100)
}
</script>

<template>
  <main class="font-sans antialiased text-gray-800 min-h-screen relative">
    
    <!-- Global Japanese Sakura Theme Background Layers (Optimized for Mobile) -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/assets/img/bg-new.webp');"></div>
      <div class="absolute inset-0 bg-[#fff5f7]/90"></div>
      <!-- Detailed sakura branches at corners globally -->
      <SakuraOrnament position="top-left" class="w-64 h-64 md:w-96 md:h-96 opacity-60" />
      <SakuraOrnament position="bottom-right" class="w-80 h-80 md:w-[500px] md:h-[500px] opacity-40" />
      
      <SakuraFall />
    </div>

    <transition name="fade-up">
      <OpeningScreen v-if="!isOpened" @open="handleOpen" />
    </transition>

    <div v-show="isOpened" class="overflow-x-hidden relative z-10 bg-white/40">
      <Navbar />
      <HeroSection />
      <MempelaiSection />
      <EventSection />
      <StorySection />
      <GallerySection />
      <GiftSection />
      <RsvpSection />
      <FooterSection />
    </div>

    <!-- Always mounted so audio is ready for user interaction -->
    <MusicPlayer v-show="isOpened" ref="musicPlayerRef" />
  </main>
</template>

<style>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}
</style>
