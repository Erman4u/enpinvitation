<template>
  <svg viewBox="0 0 800 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <!-- Base Platform -->
    <path d="M 100 450 Q 400 480 700 450 L 750 500 L 50 500 Z" opacity="0.8"/>
    <!-- Main Walls -->
    <path d="M 200 450 L 200 300 L 600 300 L 600 450 Z"/>
    <!-- Main Gate -->
    <path d="M 350 450 L 350 380 A 50 50 0 0 1 450 380 L 450 450 Z" fill="#E6F3F7" opacity="0.3"/>
    
    <!-- Left Tower -->
    <path d="M 150 450 L 150 250 L 250 250 L 250 450 Z"/>
    <!-- Left Spire -->
    <path d="M 140 250 L 200 100 L 260 250 Z"/>
    <!-- Left Spire Flag -->
    <path d="M 200 100 L 200 60 L 230 70 L 200 80" stroke="currentColor" stroke-width="2"/>
    
    <!-- Right Tower -->
    <path d="M 550 450 L 550 250 L 650 250 L 650 450 Z"/>
    <!-- Right Spire -->
    <path d="M 540 250 L 600 100 L 660 250 Z"/>
    <!-- Right Spire Flag -->
    <path d="M 600 100 L 600 60 L 630 70 L 600 80" stroke="currentColor" stroke-width="2"/>
    
    <!-- Center Keep -->
    <path d="M 300 300 L 300 180 L 500 180 L 500 300 Z"/>
    <!-- Center Grand Spire -->
    <path d="M 280 180 L 400 20 L 520 180 Z"/>
    <!-- Center Spire Flag -->
    <path d="M 400 20 L 400 -30 L 440 -15 L 400 0" stroke="currentColor" stroke-width="2"/>
    
    <!-- Crenellations (Battlements) -->
    <!-- Left Wall -->
    <rect x="250" y="280" width="15" height="20" />
    <rect x="270" y="280" width="15" height="20" />
    <rect x="290" y="280" width="15" height="20" />
    <!-- Right Wall -->
    <rect x="495" y="280" width="15" height="20" />
    <rect x="515" y="280" width="15" height="20" />
    <rect x="535" y="280" width="15" height="20" />
    
    <!-- Windows -->
    <path d="M 185 300 A 15 15 0 0 1 215 300 L 215 350 L 185 350 Z" fill="#E6F3F7" opacity="0.3"/>
    <path d="M 585 300 A 15 15 0 0 1 615 300 L 615 350 L 585 350 Z" fill="#E6F3F7" opacity="0.3"/>
    <path d="M 380 220 A 20 20 0 0 1 420 220 L 420 270 L 380 270 Z" fill="#E6F3F7" opacity="0.3"/>
    
    <!-- Small Side Turrets -->
    <path d="M 120 350 L 120 280 L 150 280 L 150 350 Z"/>
    <path d="M 115 280 L 135 220 L 155 280 Z"/>
    
    <path d="M 650 350 L 650 280 L 680 280 L 680 350 Z"/>
    <path d="M 645 280 L 665 220 L 685 280 Z"/>
    
    <!-- Magical Sparkles/Stars around the castle -->
    <circle cx="200" cy="50" r="2" fill="#FFFFFF" opacity="0.6"/>
    <circle cx="350" cy="40" r="3" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="500" cy="60" r="1.5" fill="#FFFFFF" opacity="0.5"/>
    <circle cx="650" cy="80" r="2.5" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="150" cy="150" r="2" fill="#FFFFFF" opacity="0.6"/>
    <circle cx="700" cy="180" r="3" fill="#FFFFFF" opacity="0.8"/>
  </svg>
</template>
