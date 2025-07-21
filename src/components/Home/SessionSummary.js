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
    <div className="glass rounded-lg p-3 mb-3 border border-krav-accent/20 backdrop-blur-xl max-w-md mx-auto">
      <div className="flex items-center justify-center">
        <Clock className="w-5 h-5 text-krav-accent mr-3" />
        <span className="text-base font-bold text-gray-200">Total Workout: </span>
        <span className="text-xl font-black text-krav-accent ml-2">{formatTime(totalTime)}</span>
      </div>
    </div>
  );
} 