<template>
  <nav class="navbar" v-show="show">
    <a 
      v-for="item in navItems" 
      :key="item.id"
      :href="'#' + item.id"
      class="navbar-item"
      :class="{ active: activeSection === item.id }"
      @click="activeSection = item.id"
    >
      <component :is="item.icon" />
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false }
})

const activeSection = ref('hero')

const HomeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })])
const CoupleIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' })])
const EventIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z' })])
const StoryIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z' })])
const GalleryIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })])
const RSVPIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' })])

const navItems = [
  { id: 'hero', label: 'Home', icon: HomeIcon },
  { id: 'mempelai', label: 'Mempelai', icon: CoupleIcon },
  { id: 'acara', label: 'Acara', icon: EventIcon },
  { id: 'cerita', label: 'Cerita', icon: StoryIcon },
  { id: 'galeri', label: 'Galeri', icon: GalleryIcon },
  { id: 'rsvp', label: 'RSVP', icon: RSVPIcon }
]

let observer = null

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSection.value = entry.target.id
    }
  })
}

onMounted(() => {
  observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  })

  navItems.forEach(item => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
</style>
