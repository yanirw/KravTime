import React from 'react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Play, Pause } from 'lucide-react';
import { CountdownDisplay } from './CountdownDisplay';
import { TimerControls } from './TimerControls';
import { useTimer } from '../../hooks/useTimer';
import { useAudio } from '../../hooks/useAudio';
import { useWakeLock } from '../../hooks/useWakeLock';
import { formatTime } from '../../utils/timeUtils';

/**
 * Timer Screen component
 * Main workout timer interface with countdown, progress, and controls
 */
export function TimerScreen({ config, onGoHome }) {
  // Initialize hooks
  const { playBell, playWarning, playSessionEnd } = useAudio();
  useWakeLock(); // Automatically prevent screen sleep
  
  const {
    currentRound,
    isResting,
    timeLeft,
    isPaused,
    sessionCompleted,
    isCountdown,
    countdownTime,
    togglePause,
    resetTimer,
    getProgress
  } = useTimer(config, { playBell, playWarning, playSessionEnd });

  // Show countdown screen
  if (isCountdown) {
    return <CountdownDisplay countdownTime={countdownTime} />;
  }

  // Get background color based on state
  const getBackgroundColor = () => {
    if (sessionCompleted) return 'bg-gray-900';
    if (isPaused) return 'bg-red-800';
    if (isResting) return 'bg-blue-800';
    return 'bg-green-800';
  };

  // Get status text
  const getStatusText = () => {
    if (sessionCompleted) return '🎉 SESSION COMPLETE! 🎉';
    if (isPaused) return '⏸️ PAUSED';
    if (isResting) return '😤 REST TIME';
    return '🥊 FIGHT TIME!';
  };

  // Get phase indicator
  const getPhaseIndicator = () => {
    if (sessionCompleted) return { text: 'COMPLETE!', bg: 'bg-green-700', border: 'border-green-400' };
    if (isPaused) return { text: 'PAUSED', bg: 'bg-red-700', border: 'border-red-400' };
    if (isResting) return { text: 'REST', bg: 'bg-blue-700', border: 'border-blue-400' };
    return { text: 'FIGHT!', bg: 'bg-green-700', border: 'border-green-400' };
  };

  const phase = getPhaseIndicator();

  return (
    <div className={`h-full flex flex-col safe-area transition-colors duration-500 touch-optimized mobile-optimized ${getBackgroundColor()}`}>
      <TimerControls
        currentRound={currentRound}
        totalRounds={config.rounds}
        sessionCompleted={sessionCompleted}
        onGoHome={onGoHome}
        onReset={resetTimer}
      />

      {/* Main Timer Display - Now scrollable */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="min-h-full flex flex-col items-center justify-center p-6 pb-8">
          <div className="text-center mb-8">
            <div className="text-3xl text-white mb-6 font-bold">
              {getStatusText()}
            </div>
            <div className="text-9xl font-bold mb-8 text-white drop-shadow-2xl">
              {sessionCompleted ? '00:00' : formatTime(timeLeft)}
            </div>
            <Progress 
              value={getProgress} 
              className={`w-full max-w-80 h-6 bg-white/30 ${
                isResting ? '[&>div]:bg-blue-400' : '[&>div]:bg-green-400'
              }`}
            />
          </div>

          {/* Phase Indicator */}
          <div className={`text-5xl font-bold mb-8 px-8 py-6 rounded-2xl border-4 text-white shadow-2xl ${phase.bg} ${phase.border}`}>
            {phase.text}
          </div>

          {/* Control Buttons - Now positioned above Workout Info */}
          {!sessionCompleted && (
            <div className="flex gap-8 mb-8">
              <Button
                onClick={togglePause}
                size="lg"
                className={`w-24 h-24 rounded-full text-white font-bold text-2xl border-4 shadow-2xl ${
                  isPaused 
                    ? 'bg-green-600 hover:bg-green-700 border-green-400' 
                    : 'bg-red-600 hover:bg-red-700 border-red-400'
                }`}
              >
                {isPaused ? <Play className="w-12 h-12" /> : <Pause className="w-12 h-12" />}
              </Button>
            </div>
          )}

          {/* Workout Info Box */}
          <div className="bg-black/50 border-2 border-white/40 rounded-2xl p-6 mb-6 w-full max-w-md">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Workout Info</h3>
              <div className="grid grid-cols-3 gap-4 text-xl font-bold">
                <div>
                  <div className="text-green-400 text-lg">Work</div>
                  <div>{formatTime(config.roundDuration)}</div>
                </div>
                <div>
                  <div className="text-blue-400 text-lg">Rest</div>
                  <div>{formatTime(config.restDuration)}</div>
                </div>
                <div>
                  <div className="text-blue-400 text-lg">Duration</div>
                  <div>{formatTime((config.roundDuration * config.rounds) + (config.restDuration * Math.max(0, config.rounds - 1)))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 