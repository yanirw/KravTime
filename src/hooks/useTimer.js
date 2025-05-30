import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing timer functionality
 * Handles countdown, timer state, and precise timing
 */
export const useTimer = (config, audioCallbacks) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.roundDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isCountdown, setIsCountdown] = useState(true);
  const [countdownTime, setCountdownTime] = useState(3);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const intervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const warningTimeoutsRef = useRef([]);

  // Destructure audio callbacks
  const { playBell, playWarning, playSessionEnd } = audioCallbacks;

  // Countdown management
  useEffect(() => {
    if (isCountdown && countdownTime > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdownTime(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            setIsCountdown(false);
            setIsActive(true);
            playBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isCountdown, countdownTime, playBell]);

  // Smooth progress update with better performance
  useEffect(() => {
    if (isActive && !isPaused && !isCountdown && !sessionCompleted) {
      startTimeRef.current = Date.now();
      const totalTime = isResting ? config.restDuration : config.roundDuration;
      let animationFrameId;
      let lastUpdateTime = 0;
      
      const updateProgress = (currentTime) => {
        // Throttle updates to ~15fps for better mobile performance
        if (currentTime - lastUpdateTime >= 66) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const currentProgress = ((totalTime - timeLeft + elapsed) / totalTime) * 100;
          const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);
          
          // Only update if the change is significant (reduces unnecessary renders)
          setSmoothProgress(prev => {
            const diff = Math.abs(clampedProgress - prev);
            return diff > 0.1 ? clampedProgress : prev;
          });
          
          lastUpdateTime = currentTime;
        }
        
        if (isActive && !isPaused && !isCountdown && !sessionCompleted) {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
      };
      
      animationFrameId = requestAnimationFrame(updateProgress);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    } else {
      // Update progress immediately when paused or stopped
      const totalTime = isResting ? config.restDuration : config.roundDuration;
      setSmoothProgress(((totalTime - timeLeft) / totalTime) * 100);
    }
  }, [isActive, isPaused, isCountdown, sessionCompleted, timeLeft, isResting, config]);

  // Main timer logic with improved precision
  useEffect(() => {
    if (isActive && !isPaused && !isCountdown && !sessionCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            playBell();
            
            if (isResting) {
              setIsResting(false);
              setCurrentRound(prev => prev + 1);
              setSmoothProgress(0);
              return config.roundDuration;
            } else {
              if (currentRound < config.rounds) {
                setIsResting(true);
                setSmoothProgress(0);
                return config.restDuration;
              } else {
                setIsActive(false);
                setSessionCompleted(true);
                setSmoothProgress(100);
                playSessionEnd();
                return 0;
              }
            }
          }
          
          // Warning sounds at 10 seconds
          if (prevTime === 11) {
            playWarning();
          }
          
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, isCountdown, sessionCompleted, isResting, currentRound, config, playBell, playWarning, playSessionEnd]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    // Clear all intervals and timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    warningTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    warningTimeoutsRef.current = [];
    
    setCurrentRound(1);
    setIsResting(false);
    setTimeLeft(config.roundDuration);
    setIsActive(false);
    setIsPaused(false);
    setSessionCompleted(false);
    setIsCountdown(true);
    setCountdownTime(3);
    setSmoothProgress(0);
  }, [config.roundDuration]);

  const getProgress = useCallback(() => {
    return smoothProgress;
  }, [smoothProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      warningTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return {
    // Timer state
    currentRound,
    isResting,
    timeLeft,
    isActive,
    isPaused,
    sessionCompleted,
    isCountdown,
    countdownTime,
    
    // Timer controls
    togglePause,
    resetTimer,
    
    // Progress
    getProgress: getProgress()
  };
}; 