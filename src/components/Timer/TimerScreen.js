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
 * Optimized for gym visibility with large timer display and better mobile fit
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
    if (sessionCompleted) return 'bg-gradient-to-b from-slate-700/30 to-slate-600/15';
    if (isPaused) return 'bg-gradient-to-b from-red-900/30 to-red-800/15';
    if (isResting) return 'bg-gradient-to-b from-blue-900/30 to-blue-800/15';
    return 'bg-gradient-to-b from-green-900/30 to-green-800/15';
  };

  // Get footer background color based on state
  const getFooterBackgroundColor = () => {
    if (sessionCompleted) return 'bg-gradient-to-t from-slate-700/30 to-slate-600/15';
    if (isPaused) return 'bg-gradient-to-t from-red-900/30 to-red-800/15';
    if (isResting) return 'bg-gradient-to-t from-blue-900/30 to-blue-800/15';
    return 'bg-gradient-to-t from-green-900/30 to-green-800/15';
  };

  const workoutProgress = calculateWorkoutProgress();

  return (
    <div 
      key={`${isResting}-${isPaused}-${sessionCompleted}`}
      className={`fixed inset-0 h-screen w-screen flex flex-col safe-area transition-all duration-700 ease-in-out touch-optimized mobile-optimized z-40 ${getBackgroundColor()}`}
    >
      
      {/* Ultra Compact Header */}
      <div 
        key={`header-${isResting}-${isPaused}-${sessionCompleted}`}
        className={`px-4 py-2 backdrop-blur-xl border-b border-white/20 transition-all duration-700 ${getHeaderBackgroundColor()}`}
      >
        <div className="flex justify-between items-center mb-2">
          <Button
            onClick={onGoHome}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white p-3 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95"
          >
            <Home className="w-6 h-6" />
          </Button>
          
          <div className="text-center">
            <div className="text-white font-black text-2xl md:text-3xl lg:text-4xl tracking-tight">
              Round {currentRound} / {config.rounds}
            </div>
          </div>
          
          <Button
            onClick={resetTimer}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white p-3 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

        {/* Ultra Compact Round Progress */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: config.rounds }, (_, index) => {
            const roundNumber = index + 1;
            const isCompleted = roundNumber < currentRound;
            const isCurrent = roundNumber === currentRound;
            
            return (
              <div
                key={roundNumber}
                className={`w-12 h-4 transition-all duration-500 ease-in-out rounded-full ${
                  isCompleted 
                    ? 'bg-white shadow-md' 
                    : isCurrent 
                      ? `${isResting ? 'bg-krav-rest-bright' : 'bg-krav-accent-bright'} animate-pulse shadow-md` 
                      : 'bg-white/30'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* MASSIVE TIMER SECTION - More Space */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 relative">
        
        {/* HUGE Timer Display */}
        <div className="text-center mb-4">
          {sessionCompleted ? (
            <div className="space-y-3">
              <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-white drop-shadow-2xl tracking-tighter leading-none">
                COMPLETE!
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl text-white/80 font-bold">
                Workout Finished
              </div>
            </div>
          ) : (
            <>
              {/* MASSIVE TIMER - Even Bigger for Gym Visibility */}
              <div className={`text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black text-white drop-shadow-2xl tracking-tighter leading-none transition-all duration-300 ${
                isPaused ? 'animate-pulse opacity-70' : ''
              }`}>
                {formatTime(timeLeft)}
              </div>
              {/* Simplified State Text - Only show when resting */}
              {isResting && (
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-white/90">
                  REST
                </div>
              )}
            </>
          )}
        </div>

        {/* Bigger Progress Bar */}
        <div className="w-full max-w-lg mb-4">
          <div className="relative mb-3">
            <Progress 
              value={getProgress} 
              className={`h-8 bg-black/30 rounded-full border border-white/20 shadow-inner ${
                isResting ? '[&>div]:bg-gradient-to-r [&>div]:from-krav-rest [&>div]:to-krav-rest-bright [&>div]:shadow-lg [&>div]:shadow-blue-500/30' : 
                '[&>div]:bg-gradient-to-r [&>div]:from-krav-success [&>div]:to-krav-success-bright [&>div]:shadow-lg [&>div]:shadow-green-500/30'
              } progress-smooth`}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xl md:text-2xl font-bold">
              {isResting ? 'Rest Progress' : 'Round Progress'}
            </span>
            <span className="text-white/80 text-xl md:text-2xl font-bold">{Math.round(getProgress)}%</span>
          </div>
        </div>

        {/* Much Larger Control Button */}
        {!sessionCompleted && (
          <div className="mb-4">
            <Button
              onClick={togglePause}
              className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full text-white border-4 transition-all duration-400 btn-interactive flex items-center justify-center shadow-2xl ${
                isPaused 
                  ? 'bg-gradient-to-br from-krav-success to-krav-success-bright border-krav-success-bright shadow-glow-green hover:shadow-green-500/50' 
                  : 'bg-gradient-to-br from-krav-danger to-krav-danger-bright border-krav-danger-bright shadow-glow-red hover:shadow-red-500/50'
              }`}
            >
              {isPaused ? 
                <Play className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ml-1" fill="currentColor" /> : 
                <Pause className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="currentColor" />
              }
            </Button>
            <div className="text-center mt-2">
              <span className="text-white/70 text-xl md:text-2xl font-bold">
                {isPaused ? 'Resume' : 'Pause'}
              </span>
            </div>
          </div>
        )}

        {/* Bigger Session Complete Actions */}
        {sessionCompleted && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4">
              <Button
                onClick={onGoHome}
                className="bg-gradient-to-r from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:scale-105 transition-all duration-300"
              >
                Finish Workout
              </Button>
              <Button
                onClick={resetTimer}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Start Again
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Much Bigger Footer Elements */}
      <div 
        key={`footer-${isResting}-${isPaused}-${sessionCompleted}`}
        className={`px-4 py-4 backdrop-blur-xl border-t border-white/20 transition-all duration-700 ${getFooterBackgroundColor()}`}
      >
        {/* Much Bigger Workout Info Cards */}
        <div className="flex justify-center gap-3 text-center mb-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 min-w-[100px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-base font-bold mb-2 uppercase tracking-wider">Work</div>
            <div className="text-white font-black text-2xl md:text-3xl">{formatTime(config.roundDuration)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 min-w-[100px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-base font-bold mb-2 uppercase tracking-wider">Rest</div>
            <div className="text-white font-black text-2xl md:text-3xl">{formatTime(config.restDuration)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 min-w-[100px] border border-white/20 shadow-lg">
            <div className="text-white/70 text-base font-bold mb-2 uppercase tracking-wider">Total</div>
            <div className="text-white font-black text-2xl md:text-3xl">
              {formatTime((config.roundDuration * config.rounds) + (config.restDuration * Math.max(0, config.rounds - 1)))}
            </div>
          </div>
        </div>
        
        {/* Much Bigger Workout Status */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20 shadow-lg">
            <div className={`w-5 h-5 rounded-full mr-4 shadow-lg ${
              sessionCompleted ? 'bg-krav-success animate-pulse shadow-green-500/50' :
              isPaused ? 'bg-krav-danger animate-pulse shadow-red-500/50' :
              isResting ? 'bg-krav-rest animate-pulse shadow-blue-500/50' :
              'bg-krav-accent animate-pulse shadow-amber-500/50'
            }`}></div>
            <span className="text-white font-bold text-2xl md:text-3xl">
              {workoutProgress}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 