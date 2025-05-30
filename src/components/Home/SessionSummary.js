import React from 'react';
import { Timer } from 'lucide-react';
import { formatTime, calculateTotalWorkoutTime } from '../../utils/timeUtils';

/**
 * Session Summary component
 * Displays workout configuration and total duration
 */
export function SessionSummary({ rounds, roundDuration, restDuration }) {
  const totalTime = calculateTotalWorkoutTime(rounds, roundDuration, restDuration);

  return (
    <div className="p-2.5 bg-gray-700 border border-gray-600 rounded-lg mb-3 text-sm">
      <div className="flex items-center justify-between text-amber-300 mb-2">
        <div className="flex items-center">
          <Timer className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
          <span className="font-bold text-sm">Session Summary</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-2 text-xs mb-2">
        <div className="text-gray-300 font-semibold">
          Rounds: <span className="text-gray-100 font-bold">{rounds}</span>
        </div>
        <div className="text-gray-300 font-semibold">
          Work: <span className="text-gray-100 font-bold">{formatTime(roundDuration)}</span>
        </div>
        <div className="text-gray-300 font-semibold">
          Rest: <span className="text-gray-100 font-bold">{formatTime(restDuration)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-600">
        <span className="text-amber-300 font-bold text-sm">Total Workout Time:</span>
        <span className="font-bold text-amber-100 text-base">
          {formatTime(totalTime)}
        </span>
      </div>
    </div>
  );
} 