<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const isVisible = ref(true)

let observer

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    isVisible.value = entries[0].isIntersecting
  }, { threshold: 0 })

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="containerRef" 
       class="water-container absolute bottom-0 left-0 w-full overflow-hidden"
       :class="{ 'paused-anim': !isVisible }">
    <!-- SVG Waves -->
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(230, 243, 247, 0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#F5F5F5" />
      </g>
    </svg>
    <!-- Solid base below waves -->
    <div class="h-10 bg-[#F5F5F5] w-full border-t border-white/20 backdrop-blur-md"></div>
  </div>
</template>

<style scoped>
.water-container {
  height: 25%;
  min-height: 120px;
  will-change: transform;
  transform: translateZ(0); /* Force GPU */
}

.waves {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: -7px;
}

/* Animation */
.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}

/* Pause animation when not visible or tab hidden */
.paused-anim .parallax > use {
  animation-play-state: paused !important;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}
</style>
