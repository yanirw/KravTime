import React from 'react';

/**
 * Countdown Display component
 * Shows the 3-2-1 countdown before timer starts (silent)
 * Optimized for gym visibility with massive countdown numbers
 */
export function CountdownDisplay({ countdownTime }) {
  return (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-gradient-to-br from-krav-dark via-krav-light to-krav-dark safe-area touch-optimized mobile-optimized z-50">
      <div className="text-center px-4">
        {/* MASSIVE Countdown Number - Gym Visible */}
        <div className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-none transition-all duration-300 animate-pulse">
          {countdownTime}
        </div>
        
        {/* Large Get Ready Text */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/80 font-bold tracking-wide mb-8">
          GET READY!
        </div>
        
        {/* Visible Progress Dots */}
        <div className="flex justify-center gap-4 md:gap-6">
          {Array.from({ length: 3 }, (_, index) => {
            const dotNumber = index + 1;
            const isActive = dotNumber <= (4 - countdownTime);
            
            return (
              <div
                key={dotNumber}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-500 border-2 ${
                  isActive 
                    ? 'bg-white border-white shadow-lg' 
                    : 'bg-transparent border-white/40'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 