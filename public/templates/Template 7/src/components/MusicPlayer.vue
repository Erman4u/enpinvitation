<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Music, Pause, Disc } from 'lucide-vue-next'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const playMusic = () => {
  if (audioRef.value && !isPlaying.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(e => console.log('Autoplay blocked', e))
  }
}

defineExpose({
  playMusic
})

const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const handleVisibilityChange = () => {
  if (document.hidden && isPlaying.value) {
    audioRef.value?.pause()
    isPlaying.value = false
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="fixed z-[100] bottom-24 md:bottom-10 right-6 md:right-10 flex flex-col items-center gap-4">
    <!-- Pulsing Ring -->
    <div v-show="isPlaying" class="absolute inset-0 rounded-full bg-rose-gold/20 animate-ping -z-10"></div>
    
    <button 
      @click="togglePlay" 
      class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full glass border border-white/50 shadow-2xl text-rose-gold hover:scale-110 active:scale-95 transition-all group overflow-hidden"
    >
      <div v-if="isPlaying" class="relative">
        <Disc class="w-6 h-6 md:w-7 md:h-7 animate-spin-slow" />
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Pause class="w-4 h-4 text-rose-gold fill-current" />
        </div>
      </div>
      <Music v-else class="w-6 h-6 md:w-7 md:h-7" />
      
      <!-- Inner Glow -->
      <div class="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none"></div>
    </button>

    <audio ref="audioRef" src="/assets/audio/background-music.mp3" loop preload="auto"></audio>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
