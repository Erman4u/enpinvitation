<script setup>
import { onMounted, ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  count: {
    type: Number,
    default: 15
  },
  opacity: {
    type: Number,
    default: 0.4
  }
})

const feathers = ref([])

onMounted(() => {
  initAnimations()
})

// Re-initialize if count changes
watch(() => props.count, () => {
  gsap.killTweensOf('.feather-item')
  initAnimations()
})

function initAnimations() {
  feathers.value.forEach((el, i) => {
    if (el) animateFeather(el, i)
  })
}

function animateFeather(el, i) {
  if (!el) return
  
  const startX = (i / props.count) * 100 + (Math.random() - 0.5) * 15
  const duration = 15 + Math.random() * 15
  const delay = Math.random() * 10
  
  gsap.set(el, {
    left: startX + '%',
    top: '-10%',
    rotation: Math.random() * 360,
    opacity: 0,
    scale: 0.3 + Math.random() * 0.4
  })
  
  const tl = gsap.timeline({
    repeat: -1,
    delay: delay
  })

  tl.to(el, {
    opacity: props.opacity,
    duration: 3,
    ease: "power1.in"
  })
  .to(el, {
    y: '110vh',
    x: (Math.random() - 0.5) * 400,
    rotation: '+=720',
    duration: duration,
    ease: "none"
  }, 0)
  .to(el, {
    opacity: 0,
    duration: 3,
    ease: "power1.out"
  }, "-=3")

  gsap.to(el, {
    x: '+=50',
    duration: 3 + Math.random() * 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  })
}
</script>

<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-[25]">
    <div
      v-for="i in count"
      :key="i"
      ref="feathers"
      class="feather-item absolute w-6 h-6 md:w-10 md:h-10"
    >
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M21,11C21,16.5 17.1,21 12,21C11.5,21 11,21 10.5,21C11.5,19 12,17 12,15C12,10.5 8.5,7 4,7C3.5,7 3,7 2.5,7.1C4.5,4.1 8,2 12,2C17,2 21,6 21,11Z" />
      </svg>
    </div>
  </div>
</template>
