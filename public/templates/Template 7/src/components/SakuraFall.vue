<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)

const handleVisibilityChange = () => {
  isHidden.value = document.hidden
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
  isHidden.value = document.hidden
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const getContainerStyle = () => {
  const left = Math.random() * 100
  const fallDuration = 10 + Math.random() * 15 
  const delay = Math.random() * 10
  
  return {
    left: `${left}%`,
    animationDuration: `${fallDuration}s`,
    animationDelay: `-${delay}s`,
    animationPlayState: isHidden.value ? 'paused' : 'running'
  }
}

const getInnerStyle = () => {
  const size = 12 + Math.random() * 12
  const swayDuration = 3 + Math.random() * 3
  const rotation = Math.random() * 360
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${rotation}deg)`,
    animationDuration: `${swayDuration}s`,
    animationPlayState: isHidden.value ? 'paused' : 'running'
  }
}
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div v-for="n in 20" :key="n" class="sakura-container" :style="getContainerStyle()">
      <div class="sakura" :style="getInnerStyle()">
        <!-- Premium SVG Sakura Petal -->
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <path d="M20 0C25 10 35 15 40 20C35 25 25 30 20 40C15 30 5 25 0 20C5 15 15 10 20 0Z" fill="url(#sakura-grad)" opacity="0.8"/>
          <defs>
            <radialGradient id="sakura-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(20)">
              <stop stop-color="#FFD1DC"/>
              <stop offset="1" stop-color="#FFB7C5"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sakura-container {
  position: absolute;
  top: -15%;
  animation: fall linear infinite;
  will-change: transform;
}

.sakura {
  animation: sway ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes fall {
  0% { transform: translateY(0); }
  100% { transform: translateY(125vh); }
}

@keyframes sway {
  0% { transform: translateX(-40px) rotate(0deg) scale(0.8); }
  100% { transform: translateX(40px) rotate(360deg) scale(1.1); }
}
</style>
