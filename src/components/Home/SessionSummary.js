import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime, calculateTotalWorkoutTime } from '../../utils/timeUtils';

/**
 * Session Summary component
 * Displays total workout duration in a compact format
 */
export function SessionSummary({ rounds, roundDuration, restDuration }) {
  const totalTime = calculateTotalWorkoutTime(rounds, roundDuration, restDuration);

  return (
    <div className="glass rounded-lg p-2.5 mb-3 border border-krav-accent/20 backdrop-blur-xl max-w-md mx-auto">
      <div className="flex items-center justify-center">
        <Clock className="w-4 h-4 text-krav-accent mr-2" />
        <span className="text-sm font-semibold text-gray-300">Total Workout: </span>
        <span className="text-lg font-black text-krav-accent ml-1">{formatTime(totalTime)}</span>
      </div>
    </div>
  );
} 