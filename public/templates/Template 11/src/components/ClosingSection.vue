<script setup>
import Scene from './Scene.vue'
</script>

<template>
  <section class="min-h-screen relative flex flex-col items-end justify-end overflow-hidden bg-[#E6F3F7]">
    <!-- Scene as background -->
    <div class="absolute inset-0 z-0 opacity-50">
      <Scene :isInteractive="false" />
    </div>

    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#E6F3F7]/90 via-[#E6F3F7]/40 to-transparent pointer-events-none"></div>

    <!-- Content: Bottom-anchored editorial layout -->
    <div class="closing-content relative z-20 w-full px-8 md:px-20 pb-16 md:pb-24">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">

        <!-- Left: Thank you -->
        <div>
          <p class="text-[10px] tracking-[0.5em] uppercase text-swan-deep/30 mb-4">Terima Kasih</p>
          <h2 class="text-4xl md:text-5xl font-serif text-swan-deep leading-[0.9] mb-6">
            Franz <em class="not-italic text-swan-silver text-3xl">&</em> Rosie
          </h2>
          <p class="text-lg md:text-xl font-serif text-swan-deep/60 mb-2 font-bold" dir="rtl">
            الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
          </p>
          <p class="text-sm text-swan-deep/50 leading-relaxed max-w-sm mb-4">
            Terima kasih atas perhatian dan doa restu Anda. Wassalamualaikum Warahmatullahi Wabarakatuh.
          </p>
          <p class="mt-4 text-xs text-swan-deep/40 font-serif italic">Keluarga Besar Bapak Rustam & Bapak Bima</p>
        </div>

        <!-- Right: Footer -->
        <div class="md:text-right shrink-0">
          <p class="text-[10px] tracking-[0.4em] uppercase text-swan-deep/30 mb-3">Created with love by</p>
          <p class="text-3xl font-serif text-swan-deep/70 mb-4">EnP Digital Service</p>
          <div class="flex flex-col md:items-end gap-1 text-[10px] tracking-widest uppercase text-swan-deep/30">
            <a href="https://enpdigitalservice.my.id" target="_blank" class="hover:text-swan-deep transition-colors">enpdigitalservice.my.id</a>
            <a href="https://wa.me/6282229243737" target="_blank" class="hover:text-swan-deep transition-colors">082229243737</a>
            <a href="https://instagram.com/enpdigitalservice" target="_blank" class="hover:text-swan-deep transition-colors">@enpdigitalservice</a>
          </div>
          <p class="text-[9px] mt-6 text-swan-deep/20">© 2026 EnP Digital Service. All rights reserved.</p>
        </div>

      </div>
    </div>
  </section>
</template>
