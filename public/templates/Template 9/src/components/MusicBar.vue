<template>
  <!-- Music Bar -->
  <div class="music-bar" id="music-bar">
    <button class="music-btn" @click="toggleMusic" :id="isPlaying ? 'btn-pause-music' : 'btn-play-music'">
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    </button>
    <div class="music-title-scroll">
      <span class="music-scroll-text">♪ {{ musicTitle }} ♪</span>
    </div>
    <div class="music-eq" :class="{ active: isPlaying }">
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
  <audio ref="audioRef" :src="musicSrc" loop preload="auto"></audio>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  musicSrc: { type: String, default: '/assets/audio/background-music.mp3' },
  musicTitle: { type: String, default: 'Background Music — Claude & Fanny' }
})

const audioRef = ref(null)
const isPlaying = ref(false)

function toggleMusic() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().catch(() => {})
    isPlaying.value = true
  }
}

function handleVisibility() {
  if (document.hidden && isPlaying.value) {
    audioRef.value?.pause()
  } else if (!document.hidden && isPlaying.value) {
    audioRef.value?.play().catch(() => {})
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
})
onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  audioRef.value?.pause()
})

// expose for parent
defineExpose({ toggleMusic, isPlaying })
</script>

<style scoped>
.music-btn {
  background: var(--neo-red);
  color: white;
  border: 2px solid var(--bg-main);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.08s;
}
.music-btn:active { transform: scale(0.93); }

.music-scroll-text {
  display: inline-block;
  animation: marquee 12s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.music-eq {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 18px;
  flex-shrink: 0;
}
.music-eq span {
  width: 3px;
  background: var(--neo-red);
  height: 4px;
  transition: height 0.1s;
}
.music-eq.active span:nth-child(1) { animation: eq1 0.5s ease-in-out infinite alternate; }
.music-eq.active span:nth-child(2) { animation: eq2 0.4s ease-in-out infinite alternate; }
.music-eq.active span:nth-child(3) { animation: eq3 0.6s ease-in-out infinite alternate; }
.music-eq.active span:nth-child(4) { animation: eq4 0.35s ease-in-out infinite alternate; }

@keyframes eq1 { to { height: 16px; } }
@keyframes eq2 { to { height: 12px; } }
@keyframes eq3 { to { height: 18px; } }
@keyframes eq4 { to { height: 10px; } }
</style>
