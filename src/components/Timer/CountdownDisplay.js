import React from 'react';

/**
 * Countdown Display component
 * Shows the 3-2-1 countdown before timer starts
 */
export function CountdownDisplay({ countdownTime }) {
  const getCountdownColor = () => {
    if (countdownTime === 3) return 'text-krav-rest-bright';
    if (countdownTime === 2) return 'text-krav-accent-bright';
    return 'text-krav-success-bright';
  };

  const getGlowColor = () => {
    if (countdownTime === 3) return 'shadow-glow-blue';
    if (countdownTime === 2) return 'shadow-glow';
    return 'shadow-glow-green';
  };

  return (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-gradient-to-br from-krav-dark via-krav-light to-krav-dark safe-area touch-optimized mobile-optimized z-50">
      <div className="text-center">
        <div className={`text-9xl md:text-10xl font-black ${getCountdownColor()} mb-8 drop-shadow-2xl tracking-tighter leading-none transition-all duration-300 ${getGlowColor()} animate-pulse-slow`}>
          {countdownTime}
        </div>
        <div className="text-3xl md:text-4xl text-white font-black animate-bounce-gentle tracking-wide">
          GET READY!
        </div>
        
        {/* Enhanced visual elements */}
        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: 3 }, (_, index) => {
            const dotNumber = index + 1;
            const isActive = dotNumber <= (4 - countdownTime);
            
            return (
              <div
                key={dotNumber}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-white shadow-lg animate-pulse' 
                    : 'bg-white/30'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 