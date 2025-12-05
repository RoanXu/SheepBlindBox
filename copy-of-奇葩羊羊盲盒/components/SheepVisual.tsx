import React, { useMemo } from 'react';

interface SheepVisualProps {
  color: string;
  skinColor: string;
  className?: string;
  isJumping?: boolean;
}

// Helper to lighten/darken color for 3D effect
const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export const SheepVisual: React.FC<SheepVisualProps> = ({ color, skinColor, className = "", isJumping = false }) => {
  
  // Create unique IDs for gradients to avoid conflicts if multiple sheep are on screen
  const idSuffix = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const woolGradientId = `wool-grad-${idSuffix}`;
  const skinGradientId = `skin-grad-${idSuffix}`;
  const shadowId = `shadow-${idSuffix}`;

  return (
    <div className={`relative w-48 h-48 ${className} ${isJumping ? 'animate-bounce' : 'animate-float'}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* 3D Wool Gradient: Radial from top-left light to bottom-right dark */}
          <radialGradient id={woolGradientId} cx="30%" cy="30%" r="80%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="20%" stopColor={color} />
            <stop offset="100%" stopColor="black" stopOpacity="0.3" />
          </radialGradient>
          
          {/* 3D Skin Gradient */}
          <radialGradient id={skinGradientId} cx="30%" cy="30%" r="90%" fx="30%" fy="30%">
            <stop offset="0%" stopColor={skinColor} />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </radialGradient>

          {/* Soft Shadow */}
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
             <feOffset dx="0" dy="4" result="offsetblur" />
             <feComponentTransfer>
               <feFuncA type="linear" slope="0.3" />
             </feComponentTransfer>
             <feMerge> 
               <feMergeNode />
               <feMergeNode in="SourceGraphic" /> 
             </feMerge>
          </filter>
        </defs>

        {/* Group everything and apply a subtle bounce/float transform if needed */}
        <g filter={`url(#${shadowId})`}>
            
          {/* Legs - rounded cylinders */}
          <path d="M70 140 L70 165 A 8 8 0 0 0 86 165 L86 140 Z" fill={`url(#${skinGradientId})`} />
          <path d="M114 140 L114 165 A 8 8 0 0 0 130 165 L130 140 Z" fill={`url(#${skinGradientId})`} />

          {/* Body Wool - Main Puff */}
          <circle cx="100" cy="110" r="55" fill={color} />
          <circle cx="100" cy="110" r="55" fill={`url(#${woolGradientId})`} />
          
          {/* Extra Wool Puffs for Texture */}
          <circle cx="65" cy="100" r="25" fill={color} />
          <circle cx="65" cy="100" r="25" fill={`url(#${woolGradientId})`} />
          
          <circle cx="135" cy="100" r="25" fill={color} />
          <circle cx="135" cy="100" r="25" fill={`url(#${woolGradientId})`} />
          
          <circle cx="100" cy="70" r="30" fill={color} />
          <circle cx="100" cy="70" r="30" fill={`url(#${woolGradientId})`} />

          {/* Head - Rounded Rectangle/Squircle */}
          <g transform="translate(60, 50)">
            {/* Ears */}
            <ellipse cx="-5" cy="25" rx="18" ry="10" fill={skinColor} transform="rotate(-20)" />
            <ellipse cx="85" cy="25" rx="18" ry="10" fill={skinColor} transform="rotate(20, 85, 25)" />
            
            {/* Face Shape */}
            <rect x="0" y="0" width="80" height="70" rx="35" fill={skinColor} />
            <rect x="0" y="0" width="80" height="70" rx="35" fill={`url(#${skinGradientId})`} />

            {/* Top Wool Bangs */}
            <circle cx="40" cy="-5" r="20" fill={color} />
            <circle cx="40" cy="-5" r="20" fill={`url(#${woolGradientId})`} />

            {/* Eyes - Glossy 3D */}
            <g transform="translate(20, 35)">
                <circle r="8" fill="#1a1a1a" />
                <circle cx="3" cy="-3" r="3" fill="white" opacity="0.9" />
                <circle cx="-3" cy="4" r="1.5" fill="white" opacity="0.5" />
            </g>
            <g transform="translate(60, 35)">
                <circle r="8" fill="#1a1a1a" />
                <circle cx="3" cy="-3" r="3" fill="white" opacity="0.9" />
                <circle cx="-3" cy="4" r="1.5" fill="white" opacity="0.5" />
            </g>

            {/* Cheeks */}
            <ellipse cx="15" cy="45" rx="6" ry="3" fill="#ff9999" opacity="0.6" />
            <ellipse cx="65" cy="45" rx="6" ry="3" fill="#ff9999" opacity="0.6" />

            {/* Nose/Mouth - Cute Y shape */}
            <path d="M35 48 Q40 52 45 48" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};