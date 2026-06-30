<template>
  <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <!-- Graceful Swan Body -->
    <path d="M 50,150 
             C 50,150 70,170 110,165 
             C 140,160 160,140 160,120 
             C 160,100 150,90 140,80 
             C 135,75 130,60 135,50 
             C 140,40 145,30 135,20 
             C 125,10 110,10 100,20 
             C 90,30 95,50 100,70 
             C 105,90 90,110 70,120 
             C 50,130 40,140 50,150 Z" />
    
    <!-- Wing Feathers -->
    <path d="M 90,120 
             C 110,110 130,120 140,130 
             C 130,130 110,125 90,135 Z" 
          fill="#FFFFFF" opacity="0.6"/>
          
    <path d="M 85,135 
             C 105,125 125,135 135,145 
             C 125,145 105,140 85,150 Z" 
          fill="#FFFFFF" opacity="0.4"/>
          
    <!-- Beak -->
    <path d="M 135,20 
             C 145,15 155,20 155,25 
             C 150,30 140,30 135,25 Z" 
          fill="#D4AF37"/> <!-- Gold beak -->
          
    <!-- Eye -->
    <circle cx="125" cy="25" r="2" fill="#1A2A3A" />
    
    <!-- Water ripples around base -->
    <path d="M 30,160 Q 50,155 70,160 T 110,160 T 150,160 T 180,160" 
          stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
    <path d="M 40,170 Q 60,165 80,170 T 120,170 T 160,170" 
          stroke="currentColor" stroke-width="1" fill="none" opacity="0.2"/>
  </svg>
</template>
