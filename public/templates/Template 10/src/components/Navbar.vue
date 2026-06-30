<template>
  <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[90%] max-w-lg">
    <div class="glass-panel py-3 px-6 flex justify-between items-center border border-magical-gold/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <a href="#home" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">Home</span>
      </a>

      <a href="#couple" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">Couple</span>
      </a>

      <a href="#event" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">Event</span>
      </a>

      <a href="#story" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">Story</span>
      </a>

      <a href="#gallery" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">Gallery</span>
      </a>

      <a href="#rsvp" class="group flex flex-col items-center">
        <div class="w-10 h-10 flex items-center justify-center text-magical-gold group-hover:bg-magical-gold/20 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </div>
        <span class="text-[10px] uppercase font-bold tracking-tighter text-white group-hover:text-magical-gold transition-colors">RSVP</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  animation: slide-up 1s ease-out 2s both;
}

@keyframes slide-up {
  from { transform: translate(-50%, 100px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}

a {
  -webkit-tap-highlight-color: transparent;
}
</style>
