import React from 'react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Play, Pause, Home, RotateCcw } from 'lucide-react';
import { CountdownDisplay } from './CountdownDisplay';
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

  // Calculate overall workout completion percentage
  const calculateWorkoutProgress = () => {
    if (sessionCompleted) return 100;
    
    const totalWorkoutTime = (config.roundDuration * config.rounds) + (config.restDuration * Math.max(0, config.rounds - 1));
    const completedRounds = currentRound - 1;
    const completedTime = completedRounds * (config.roundDuration + config.restDuration);
    
    // Current round progress
    let currentRoundProgress = 0;
    if (isResting) {
      // We've completed the work portion, now in rest
      currentRoundProgress = config.roundDuration + (config.restDuration - timeLeft);
    } else {
      // We're in work time
      currentRoundProgress = config.roundDuration - timeLeft;
    }
    
    const totalElapsedTime = completedTime + currentRoundProgress;
    return Math.min(100, Math.round((totalElapsedTime / totalWorkoutTime) * 100));
  };

  // Get background color based on state
  const getBackgroundColor = () => {
    if (sessionCompleted) return 'bg-gradient-to-br from-krav-dark via-krav-light to-krav-dark';
    if (isPaused) return 'bg-gradient-to-br from-red-900 via-krav-danger to-red-800';
    if (isResting) return 'bg-gradient-to-br from-blue-900 via-krav-rest to-blue-800';
    return 'bg-gradient-to-br from-green-900 via-krav-success to-green-800';
  };

  // Get header background color based on state
  const getHeaderBackgroundColor = () => {
    if (sessionCompleted) return 'bg-gradient-to-b from-slate-700/60 to-slate-600/40';
    if (isPaused) return 'bg-gradient-to-b from-red-900/60 to-red-800/40';
    if (isResting) return 'bg-gradient-to-b from-blue-900/60 to-blue-800/40';
    return 'bg-gradient-to-b from-green-900/60 to-green-800/40';
  };

  // Get footer background color based on state
  const getFooterBackgroundColor = () => {
    if (sessionCompleted) return 'bg-gradient-to-t from-slate-700/60 to-slate-600/40';
    if (isPaused) return 'bg-gradient-to-t from-red-900/60 to-red-800/40';
    if (isResting) return 'bg-gradient-to-t from-blue-900/60 to-blue-800/40';
    return 'bg-gradient-to-t from-green-900/60 to-green-800/40';
  };

  const workoutProgress = calculateWorkoutProgress();

  return (
    <div className={`fixed inset-0 h-screen w-screen flex flex-col safe-area transition-all duration-700 ease-in-out touch-optimized mobile-optimized z-40 ${getBackgroundColor()}`}>
      
      {/* Enhanced Top Header with Glass Morphism */}
      <div className={`p-6 backdrop-blur-xl border-b border-white/20 ${getHeaderBackgroundColor()}`}>
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={onGoHome}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95"
          >
            <Home className="w-6 h-6" />
          </Button>
          
          <div className="text-center">
            <div className="text-white font-black text-2xl mb-2 tracking-tight">
              Round {currentRound}
            </div>
            <div className="text-white/80 text-base font-semibold">
              of {config.rounds} rounds
            </div>
          </div>
          
          <Button
            onClick={resetTimer}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

        {/* Simple and Clean Round Progress - Back in Header */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: config.rounds }, (_, index) => {
            const roundNumber = index + 1;
            const isCompleted = roundNumber < currentRound;
            const isCurrent = roundNumber === currentRound;
            
            return (
              <div
                key={roundNumber}
                className={`w-12 h-5 transition-all duration-500 ease-in-out rounded-full ${
                  isCompleted 
                    ? 'bg-white shadow-lg' 
                    : isCurrent 
                      ? `${isResting ? 'bg-krav-rest-bright' : 'bg-krav-accent-bright'} animate-pulse shadow-lg` 
                      : 'bg-white/30'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content Area with Better Spacing */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        
        {/* Enhanced Main Timer - Much Bigger for Gym Visibility */}
        <div className="text-center mb-6">
          <div className={`text-10xl md:text-12xl font-black text-white drop-shadow-2xl tracking-tighter leading-none transition-all duration-300 ${
            isPaused ? 'animate-pulse opacity-70' : ''
          }`}>
            {sessionCompleted ? '00:00' : formatTime(timeLeft)}
          </div>
          <div className="text-white/60 text-xl font-medium mt-4">
            {isResting ? 'Recovery Period' : 'Training Active'}
          </div>
        </div>

        {/* Simplified Progress Visualization - Reordered */}
        <div className="w-full max-w-md mb-6">
          <div className="relative mb-3">
            <Progress 
              value={getProgress} 
              className={`h-3 bg-black/30 rounded-full border border-white/20 shadow-inner ${
                isResting ? '[&>div]:bg-gradient-to-r [&>div]:from-krav-rest [&>div]:to-krav-rest-bright [&>div]:shadow-lg [&>div]:shadow-blue-500/30' : 
                '[&>div]:bg-gradient-to-r [&>div]:from-krav-success [&>div]:to-krav-success-bright [&>div]:shadow-lg [&>div]:shadow-green-500/30'
              } progress-smooth`}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm font-semibold">
              {isResting ? 'Rest Progress' : 'Round Progress'}
            </span>
            <span className="text-white/80 text-sm font-semibold">{Math.round(getProgress)}%</span>
          </div>
        </div>

        {/* Enhanced Control Button */}
        {!sessionCompleted && (
          <div className="mb-6">
            <Button
              onClick={togglePause}
              className={`w-24 h-24 rounded-full text-white border-4 transition-all duration-400 btn-interactive flex items-center justify-center shadow-2xl ${
                isPaused 
                  ? 'bg-gradient-to-br from-krav-success to-krav-success-bright border-krav-success-bright shadow-glow-green hover:shadow-green-500/50' 
                  : 'bg-gradient-to-br from-krav-danger to-krav-danger-bright border-krav-danger-bright shadow-glow-red hover:shadow-red-500/50'
              }`}
            >
              {isPaused ? 
                <Play className="w-12 h-12 ml-1" fill="currentColor" /> : 
                <Pause className="w-12 h-12" fill="currentColor" />
              }
            </Button>
            <div className="text-center mt-3">
              <span className="text-white/70 text-sm font-medium">
                {isPaused ? 'Tap to Resume' : 'Tap to Pause'}
              </span>
            </div>
          </div>
        )}

        {/* Enhanced Session Complete Actions */}
        {sessionCompleted && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4">
              <Button
                onClick={onGoHome}
                className="bg-gradient-to-r from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white px-8 py-3 rounded-2xl font-bold text-base shadow-xl hover:scale-105 transition-all duration-300"
              >
                Finish Workout
              </Button>
              <Button
                onClick={resetTimer}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-8 py-3 rounded-2xl font-bold text-base shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Start Again
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Bottom Info Panel with Cards */}
      <div className={`p-6 backdrop-blur-xl border-t border-white/20 ${getFooterBackgroundColor()}`}>
        {/* Workout Info Cards */}
        <div className="flex justify-center gap-4 text-center mb-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 min-w-[80px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wider">Work</div>
            <div className="text-white font-black text-lg">{formatTime(config.roundDuration)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 min-w-[80px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wider">Rest</div>
            <div className="text-white font-black text-lg">{formatTime(config.restDuration)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 min-w-[80px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wider">Total</div>
            <div className="text-white font-black text-lg">
              {formatTime((config.roundDuration * config.rounds) + (config.restDuration * Math.max(0, config.rounds - 1)))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Workout Status */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 shadow-lg">
            <div className={`w-3 h-3 rounded-full mr-3 shadow-lg ${
              sessionCompleted ? 'bg-krav-success animate-pulse shadow-green-500/50' :
              isPaused ? 'bg-krav-danger animate-pulse shadow-red-500/50' :
              isResting ? 'bg-krav-rest animate-pulse shadow-blue-500/50' :
              'bg-krav-accent animate-pulse shadow-amber-500/50'
            }`}></div>
            <span className="text-white font-bold text-base">
              {workoutProgress}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 