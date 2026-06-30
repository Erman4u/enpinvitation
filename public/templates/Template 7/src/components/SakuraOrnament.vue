<script setup lang="ts">
defineProps<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}>()
</script>

<template>
  <svg 
    :class="[
      'absolute pointer-events-none drop-shadow-xl z-0 text-rose-gold',
      position === 'top-left' ? 'top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 rotate-0' : '',
      position === 'top-right' ? 'top-0 right-0 transform translate-x-1/4 -translate-y-1/4 rotate-90' : '',
      position === 'bottom-left' ? 'bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 -rotate-90' : '',
      position === 'bottom-right' ? 'bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 rotate-180' : '',
      className
    ]" 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Stylized Sakura / Cherry Blossom Branch Vector -->
    <g>
      <!-- Branch -->
      <path d="M 0 0 Q 30 20 80 50 T 160 120" stroke="#7a5c58" stroke-width="4" stroke-linecap="round" fill="none" class="opacity-80"/>
      <path d="M 80 50 Q 120 40 150 60" stroke="#7a5c58" stroke-width="2" stroke-linecap="round" fill="none" class="opacity-80"/>
      <path d="M 120 85 Q 140 100 130 140" stroke="#7a5c58" stroke-width="2" stroke-linecap="round" fill="none" class="opacity-80"/>

      <!-- Flowers template macro effectively -->
      <g stroke="#f43f5e" stroke-width="1">
        <!-- Flower 1 (Large) -->
        <g transform="translate(80, 50) scale(0.35) rotate(15)" fill="#fda4af">
          <path d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(72)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(144)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(216)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(288)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <circle cx="0" cy="0" r="5" fill="#fecdd3" />
        </g>
        
        <!-- Flower 2 (Medium) -->
        <g transform="translate(150, 60) scale(0.25) rotate(-30)" fill="#ffb7c5">
          <path d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(72)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(144)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(216)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(288)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <circle cx="0" cy="0" r="5" fill="#fecdd3" />
        </g>

        <!-- Flower 3 (Small) -->
        <g transform="translate(160, 120) scale(0.2) rotate(45)" fill="#fda4af">
          <path d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(72)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(144)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(216)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(288)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <circle cx="0" cy="0" r="5" fill="#fecdd3" />
        </g>
        
        <!-- Flower 4 -->
        <g transform="translate(130, 140) scale(0.18) rotate(115)" fill="#ffb7c5">
          <path d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(72)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(144)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(216)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
          <path transform="rotate(288)" d="M 0 0 C -15 -10 -20 -25 -10 -40 C -5 -35 0 -30 0 -30 C 0 -30 5 -35 10 -40 C 20 -25 15 -10 0 0 Z" />
        </g>
      </g>
      <!-- Falling petals -->
      <path d="M 120 120 Q 115 130 125 140 Q 130 135 120 120 Z" fill="#fda4af" opacity="0.6"/>
      <path d="M 90 90 Q 80 100 90 110 Q 95 100 90 90 Z" fill="#ffb7c5" opacity="0.5"/>
    </g>
  </svg>
</template>
