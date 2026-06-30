<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
  }, 2000)
})
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-[200] bg-[#fff5f7] flex flex-col items-center justify-center">
      <div class="relative w-24 h-24 md:w-32 md:h-32 mb-6">
        <!-- Pulsing Sakura SVG -->
        <svg viewBox="0 0 100 100" class="w-full h-full animate-pulse-slow">
          <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" fill="#b76e79" opacity="0.8"/>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <img src="/assets/img/Logo-EnP.webp" alt="Loading..." class="w-10 h-10 md:w-14 md:h-14 object-contain animate-bounce-slow" />
        </div>
      </div>
      <h2 class="font-serif text-2xl text-rose-gold tracking-widest animate-pulse">Memuat Kebahagiaan...</h2>
      <div class="mt-8 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-rose-gold animate-loading-bar"></div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes loading-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-loading-bar {
  animation: loading-bar 2s linear infinite;
}

.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
