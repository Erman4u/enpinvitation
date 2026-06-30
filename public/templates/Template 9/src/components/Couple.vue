<template>
  <section id="mempelai" class="py-24 px-6 bg-neo-white grid-bg border-b-8 border-neo-black">
    <div class="max-w-5xl mx-auto">
      <div class="mb-16 text-center transform rotate-[-2deg]">
        <h2 class="section-label mb-4 bg-neo-red text-neo-white px-6 py-2">Groom & Bride</h2>
        <h3 class="section-title text-neo-black">Pasangan Melangsungkan Pernikahan</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
        <!-- Groom -->
        <div class="flex flex-col items-center md:items-end text-center md:text-right">
          <div class="w-full max-w-[350px] relative mb-8 group">
            <div class="absolute inset-0 bg-neo-red translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform opacity-20"></div>
            <img 
              src="/assets/Image/pria.jpg" 
              
              alt="Claude" 
              loading="lazy"
              class="w-full h-auto aspect-[3/4] object-cover neo-border-4 relative z-10"
            />
          </div>
          <div class="relative z-10">
            <h4 class="text-4xl md:text-5xl font-black uppercase mb-2">Claude</h4>
            <p class="text-sm font-black bg-neo-black text-neo-white inline-block px-3 py-1 mb-4">Putra ke-1 Dari :</p>
            <p class="text-lg font-bold">Bapak Tigreal & Ibu Layla</p>
            <a href="https://instagram.com/enpdigitalservice" target="_blank" class="flex items-center justify-center md:justify-end gap-3 mt-6 group">
              <div class="w-10 h-10 bg-neo-blue text-neo-white flex items-center justify-center neo-border-2 neo-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <span class="text-2xl font-black group-hover:text-neo-blue">@Claude</span>
            </a>
          </div>
        </div>

        <!-- Center "&" Divider for Desktop -->
        <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
          <span class="text-[220px] font-black text-neo-black opacity-[0.03]">&</span>
        </div>

        <!-- Bride -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <div class="w-full max-w-[350px] relative mb-8 group">
            <div class="absolute inset-0 bg-neo-red translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            <img 
              src="/assets/Image/wanita.jpg" 
              
              alt="Fanny" 
              class="w-full h-auto aspect-[3/4] object-cover neo-border-4 relative z-10"
            />
          </div>
          <div class="relative z-10">
            <h4 class="text-4xl md:text-5xl font-black uppercase mb-2">Fanny</h4>
            <p class="text-sm font-black bg-neo-black text-neo-white inline-block px-3 py-1 mb-4">Putri ke-2 Dari :</p>
            <p class="text-lg font-bold">Bapak Nolan & Ibu Lancelot</p>
            <a href="https://instagram.com/enpdigitalservice" target="_blank" class="flex items-center justify-center md:justify-start gap-3 mt-6 group">
              <div class="w-10 h-10 bg-neo-red text-neo-white flex items-center justify-center neo-border-2 neo-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <span class="text-2xl font-black group-hover:text-neo-red">@Fanny</span>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-20 flex justify-center">
        <div class="max-w-2xl bg-neo-white neo-border neo-shadow-lg p-8 transform rotate-[1deg]">
          <img src="/assets/Image/bismillah.webp" alt="Bismillah" loading="lazy" class="h-12 mx-auto mb-8 opacity-80" />
          <p class="text-center font-bold italic leading-relaxed text-base md:text-lg text-neo-black">
            "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)."
          </p>
          <p class="text-center font-black mt-4 uppercase tracking-widest text-xs text-neo-red">— QS. Adh-Dhariyat: 49</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
</style>
