import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

/**
 * Timer Controls component
 * Header and navigation buttons for the timer screen
 */
export function TimerControls({ 
  currentRound, 
  totalRounds, 
  sessionCompleted,
  onGoHome, 
  onReset 
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/30 bg-black/40 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoHome}
          className="text-white hover:text-white hover:bg-white/30 font-bold text-xl border-2 border-white/50 hover:border-white/70 px-4 py-2"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Home
        </Button>
        <div className="text-center">
          <div className="text-2xl text-white font-bold">Round</div>
          <div className="text-5xl font-bold text-white">
            {currentRound} / {totalRounds}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-white hover:text-white hover:bg-white/30 font-bold text-xl border-2 border-white/50 hover:border-white/70 px-4 py-2"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Session Complete Actions - These stay in the header area */}
      {sessionCompleted && (
        <div className="flex gap-6 mb-4 justify-center pt-4">
          <Button
            onClick={onReset}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl px-8 py-4 border-4 border-green-400 rounded-2xl"
          >
            <RotateCcw className="w-8 h-8 mr-3" />
            Again
          </Button>
          <Button
            onClick={onGoHome}
            size="lg"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-2xl px-8 py-4 border-4 border-gray-400 rounded-2xl"
          >
            <ArrowLeft className="w-8 h-8 mr-3" />
            Home
          </Button>
        </div>
      )}
    </>
  );
} 