import React from 'react';
import { Timer, Clock, Zap, Shield } from 'lucide-react';
import { formatTime, calculateTotalWorkoutTime } from '../../utils/timeUtils';

/**
 * Session Summary component
 * Displays workout configuration and total duration
 */
export function SessionSummary({ rounds, roundDuration, restDuration }) {
  const totalTime = calculateTotalWorkoutTime(rounds, roundDuration, restDuration);

  return (
    <div className="glass rounded-xl p-3 mb-3 border-2 border-krav-accent/30 backdrop-blur-xl shadow-glow">
      {/* Compact Stats Grid */}
      <div className="grid grid-cols-4 gap-2 items-start">
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-krav-accent/30 flex items-center justify-center border border-krav-accent/50">
            <Shield className="w-2.5 h-2.5 text-krav-accent" />
          </div>
          <div className="text-2xs text-gray-300 font-semibold">Rounds</div>
          <div className="text-2xs text-white font-bold">{rounds}</div>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-krav-success/30 flex items-center justify-center border border-krav-success/50">
            <Clock className="w-2.5 h-2.5 text-krav-success" />
          </div>
          <div className="text-2xs text-gray-300 font-semibold">Work</div>
          <div className="text-2xs text-white font-bold">{formatTime(roundDuration)}</div>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-krav-rest/30 flex items-center justify-center border border-krav-rest/50">
            <Zap className="w-2.5 h-2.5 text-krav-rest" />
          </div>
          <div className="text-2xs text-gray-300 font-semibold">Rest</div>
          <div className="text-2xs text-white font-bold">{formatTime(restDuration)}</div>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-krav-accent/30 flex items-center justify-center border border-krav-accent/50">
            <Timer className="w-2.5 h-2.5 text-krav-accent" />
          </div>
          <div className="text-2xs text-gray-300 font-semibold">Total</div>
          <div className="text-xs text-krav-accent font-black">
            {formatTime(totalTime)}
          </div>
        </div>
      </div>
    </div>
  );
} 