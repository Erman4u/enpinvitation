<template>
  <section id="hero" class="min-h-screen relative overflow-hidden border-b-8 border-neo-black flex flex-col justify-center items-center py-20 md:py-32 px-6">
    <!-- Layered Background -->
    <div class="absolute inset-0 bg-neo-white grid-bg z-0"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-main)] opacity-50 z-0"></div>
    
    <!-- Grain/Noise Filter Overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.08] z-[1] bg-noise"></div>
    
    <!-- Massive Background Decorative Text -->
    <div class="absolute -top-10 -left-10 text-[15rem] font-black text-neo-black opacity-[0.04] pointer-events-none select-none uppercase leading-none z-0">
      VOWS <br/> 2027
    </div>
    
    <div class="max-w-6xl w-full relative z-10">
      <div class="flex flex-col items-center gap-10 md:gap-12">
        <!-- Text Content -->
        <div class="relative text-center">
          <div class="bg-neo-black text-neo-white inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.5em] mb-8 transform -rotate-2 shadow-neo-red">
            The Wedding Of
          </div>
          
          <h1 class="text-[clamp(1.5rem,10vw,3.5rem)] font-black leading-tight uppercase tracking-tighter relative inline-block">
            <span class="relative z-10 text-neo-black">CLAUDE</span>
            <span class="text-neo-red relative z-10 mx-2">&</span>
            <span class="relative z-10 text-neo-black">FANNY</span>
            <!-- Brutalist Shadow Text -->
            <span class="absolute -top-0.5 -left-0.5 text-neo-black -z-10 opacity-10 blur-[1px] whitespace-nowrap">CLAUDE & FANNY</span>
          </h1>
        </div>

        <!-- Brutal Image Container -->
        <div class="relative group w-full max-w-[220px] mx-auto">
          <div class="animate-float">
            <!-- Floating Date Sticker -->
            <div class="absolute -top-2 -right-2 bg-neo-red text-neo-white border border-neo-black shadow-[2px_2px_0px_var(--border-main)] px-1.5 py-1 rotate-[12deg] z-30 flex flex-col items-center">
              <span class="block text-[5px] font-black uppercase tracking-tight leading-none mb-0.5">Mark The Date</span>
              <span class="block text-[11px] font-black text-neo-black leading-none">15.03.</span>
              <span class="block text-[7px] font-black text-neo-white leading-none">2027</span>
            </div>
            
            <!-- Photo Inside Frame -->
            <div class="relative border-[6px] border-neo-blue bg-neo-white p-1.5 neo-shadow transform rotate-2 group-hover:rotate-0 transition-all duration-700">
              <div class="relative border-2 border-neo-black overflow-hidden bg-neo-black">
                <img 
                  src="/assets/Image/hero.webp" 
                  alt="Claude & Fanny" 
                  loading="lazy"
                  class="w-full aspect-[4/5] object-cover filter contrast-125 saturate-150"
                />
              </div>
            </div>
          </div>

          <!-- Side Label -->
          <div class="absolute top-1/2 -left-14 -translate-y-1/2 -rotate-90 hidden md:block opacity-20">
            <span class="text-xl font-black uppercase tracking-[0.5em] text-neo-black">SAVE THE DATE</span>
          </div>
        </div>

        <!-- Quote Below Photo -->
        <div class="max-w-xs bg-neo-white neo-border-2 neo-shadow p-4 transform rotate-1 mx-auto mt-4">
          <p class="text-[11px] md:text-xs font-bold uppercase tracking-tight italic leading-snug text-neo-black text-center">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)."
          </p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <div class="w-10 h-1 bg-neo-blue border border-neo-black"></div>
            <span class="font-black text-[9px] uppercase tracking-[0.2em] text-neo-red">QS. Adh-Dhariyat: 49</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Corner Pattern -->
    <div class="absolute bottom-10 right-10 flex gap-4">
      <div class="w-8 h-8 bg-neo-black animate-bounce" style="animation-delay: 0.1s"></div>
      <div class="w-8 h-8 bg-neo-red animate-bounce" style="animation-delay: 0.2s"></div>
      <div class="w-8 h-8 bg-neo-blue animate-bounce" style="animation-delay: 0.3s"></div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
