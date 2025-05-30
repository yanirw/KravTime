import React from 'react';

/**
 * Countdown Display component
 * Shows the 3-2-1 countdown before timer starts
 */
export function CountdownDisplay({ countdownTime }) {
  return (
    <div className="h-full flex items-center justify-center bg-blue-900">
      <div className="text-center">
        <div className="text-9xl font-bold text-white mb-8 drop-shadow-2xl">
          {countdownTime}
        </div>
        <div className="text-4xl text-white font-bold">GET READY!</div>
      </div>
    </div>
  );
} 