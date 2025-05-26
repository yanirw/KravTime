import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import { ArrowLeft, Play, Pause, RotateCcw, Timer, Clock, Shield, ChevronRight } from "lucide-react";
import { Progress } from "./components/ui/progress";

// Main App Component
export default function KravTimeApp() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'timer'
  const [timerConfig, setTimerConfig] = useState({
    rounds: 3,
    roundDuration: 120,
    restDuration: 30
  });

  const startTimer = (config) => {
    setTimerConfig(config);
    setCurrentScreen('timer');
  };

  const goHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="app-container">
      {/* PWA Meta Tags would go in document head */}
      <style jsx global>{`
        @viewport {
          width=device-width;
          initial-scale=1.0;
          maximum-scale=1.0;
          user-scalable=no;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        .app-container {
          height: 100vh;
          height: 100dvh; /* Dynamic viewport height for mobile */
          width: 100vw;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          background: #111827;
        }
        
        /* iPhone specific optimizations */
        @supports (-webkit-touch-callout: none) {
          .app-container {
            height: -webkit-fill-available;
          }
        }
        
        /* Prevent pull-to-refresh */
        body {
          overscroll-behavior: none;
        }
        
        /* Hide scrollbars but keep functionality */
        ::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {currentScreen === 'home' ? (
        <HomeScreen onStartTimer={startTimer} />
      ) : (
        <TimerScreen 
          config={timerConfig} 
          onGoHome={goHome} 
        />
      )}
    </div>
  );
}

// Home Screen Component
function HomeScreen({ onStartTimer }) {
  const [rounds, setRounds] = useState(3);
  const [roundDuration, setRoundDuration] = useState(120);
  const [restDuration, setRestDuration] = useState(30);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    onStartTimer({ rounds, roundDuration, restDuration });
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 safe-area transition-colors duration-500">
      <div className="flex-1 overflow-y-auto scroll-container px-3 py-3">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-extrabold text-amber-400 mb-1 tracking-tight flex items-center justify-center">
              <Timer className="w-5 h-5 mr-2 text-amber-500" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                KravTime
              </span>
            </h1>
            <p className="text-gray-400 text-xs font-semibold">Configure your training intensity</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-black/40 p-3 mb-3">
            {/* Rounds Section */}
            <div className="mb-3">
              <label className="block text-xs font-bold text-amber-300 mb-2 flex items-center">
                <Shield className="w-3 h-3 mr-1.5 text-amber-500" />
                Rounds
              </label>
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={rounds === num ? "default" : "outline"}
                    className={`h-8 text-xs ${
                      rounds === num 
                        ? "bg-amber-500 hover:bg-amber-600 text-black font-bold border-amber-400" 
                        : "border-gray-400 text-gray-200 bg-gray-600 hover:bg-gray-500 hover:border-gray-300 font-semibold"
                    }`}
                    onClick={() => setRounds(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Slider
                  value={[rounds]}
                  max={20}
                  min={1}
                  step={1}
                  onValueChange={(value) => setRounds(value[0])}
                  className="py-1.5 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-amber-500"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1 font-semibold">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-100 mt-1.5 font-semibold">
                {rounds} round{rounds !== 1 ? 's' : ''} total
              </p>
            </div>

            {/* Round Duration Section */}
            <div className="mb-3">
              <label className="block text-xs font-bold text-amber-300 mb-2 flex items-center">
                <Clock className="w-3 h-3 mr-1.5 text-green-500" />
                Work Duration
              </label>
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                {[60, 90, 120, 150, 180, 300].map((seconds) => (
                  <Button
                    key={seconds}
                    variant={roundDuration === seconds ? "default" : "outline"}
                    className={`h-8 text-xs ${
                      roundDuration === seconds 
                        ? "bg-amber-500 hover:bg-amber-600 text-black font-bold border-amber-400" 
                        : "border-gray-400 text-gray-200 bg-gray-600 hover:bg-gray-500 hover:border-gray-300 font-semibold"
                    }`}
                    onClick={() => setRoundDuration(seconds)}
                  >
                    {formatTime(seconds)}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Slider
                  value={[roundDuration / 30]}
                  max={20} 
                  min={1} 
                  step={1}
                  onValueChange={(value) => setRoundDuration(value[0] * 30)}
                  className="py-1.5 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-amber-500"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1 font-semibold">
                  <span>0:30</span>
                  <span>2:30</span>
                  <span>5:00</span>
                  <span>7:30</span>
                  <span>10:00</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-100 mt-1.5 font-semibold">
                {formatTime(roundDuration)} per round
              </p>
            </div>

            {/* Rest Duration Section */}
            <div className="mb-3">
              <label className="block text-xs font-bold text-amber-300 mb-2 flex items-center">
                <Clock className="w-3 h-3 mr-1.5 text-blue-500" />
                Rest Duration
              </label>
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                {[15, 30, 60].map((seconds) => (
                  <Button
                    key={seconds}
                    variant={restDuration === seconds ? "default" : "outline"}
                    className={`h-8 text-xs ${
                      restDuration === seconds 
                        ? "bg-amber-500 hover:bg-amber-600 text-black font-bold border-amber-400" 
                        : "border-gray-400 text-gray-200 bg-gray-600 hover:bg-gray-500 hover:border-gray-300 font-semibold"
                    }`}
                    onClick={() => setRestDuration(seconds)}
                  >
                    {formatTime(seconds)}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Slider
                  value={[restDuration === 10 ? 1 : restDuration <= 60 ? Math.round(restDuration / 15) + 1 : 4 + (restDuration - 60) / 30]}
                  max={10} 
                  min={1} 
                  step={1}
                  onValueChange={(value) => {
                    const sliderValue = value[0];
                    if (sliderValue === 1) {
                      setRestDuration(10);
                    } else if (sliderValue <= 4) {
                      // 0:15 to 1:00 in 15-second increments
                      setRestDuration((sliderValue - 1) * 15);
                    } else {
                      // 1:30 to 5:00 in 30-second increments
                      setRestDuration(60 + (sliderValue - 4) * 30);
                    }
                  }}
                  className="py-1.5 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-amber-500"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1 font-semibold">
                  <span>0:10</span>
                  <span>0:30</span>
                  <span>1:00</span>
                  <span>3:00</span>
                  <span>5:00</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-100 mt-1.5 font-semibold">
                {formatTime(restDuration)} between rounds
              </p>
            </div>

            {/* Session Summary */}
            <div className="p-2.5 bg-gray-700 border border-gray-600 rounded-lg mb-3 text-sm">
              <div className="flex items-center justify-between text-amber-300 mb-2">
                <div className="flex items-center">
                  <Timer className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  <span className="font-bold text-sm">Session Summary</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-2 text-xs mb-2">
                <div className="text-gray-300 font-semibold">Rounds: <span className="text-gray-100 font-bold">{rounds}</span></div>
                <div className="text-gray-300 font-semibold">Work: <span className="text-gray-100 font-bold">{formatTime(roundDuration)}</span></div>
                <div className="text-gray-300 font-semibold">Rest: <span className="text-gray-100 font-bold">{formatTime(restDuration)}</span></div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                <span className="text-amber-300 font-bold text-sm">Total Workout Time:</span>
                <span className="font-bold text-amber-100 text-base">
                  {formatTime((roundDuration * rounds) + (restDuration * Math.max(0, rounds - 1)))}
                </span>
              </div>
            </div>

            {/* Start Button */}
            <Button 
              onClick={handleStartTimer} 
              className="w-full h-10 text-lg font-bold bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 shadow-lg transition-all duration-150"
            >
              START
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="text-center text-xs text-gray-400 px-4 pb-2">
            <p className="flex items-center justify-center font-semibold">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              KravTime • Professional Training Timer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Timer Screen Component
function TimerScreen({ config, onGoHome }) {
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.roundDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isCountdown, setIsCountdown] = useState(true);
  const [countdownTime, setCountdownTime] = useState(3);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const wakeLockRef = useRef(null);
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);
  const smoothIntervalRef = useRef(null);
  const bellAudioRef = useRef(null);
  const startTimeRef = useRef(null);
  const warningTimeoutsRef = useRef([]);

  // iPhone sleep prevention and audio setup
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          console.log('Wake lock activated');
        }
      } catch (err) {
        console.warn('Wake lock failed:', err);
      }
    };

    const setupAudio = async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioContextRef.current = new AudioContext();
        }
        
        // Preload the boxing bell sound
        bellAudioRef.current = new Audio('/sounds/boxing-bell.mp3');
        bellAudioRef.current.preload = 'auto';
        
        // Set up for mobile - user interaction required
        const enableAudio = () => {
          if (bellAudioRef.current) {
            bellAudioRef.current.play().then(() => {
              bellAudioRef.current.pause();
              bellAudioRef.current.currentTime = 0;
            }).catch(() => {
              console.log('Audio setup - user interaction needed');
            });
          }

          document.removeEventListener('touchstart', enableAudio);
          document.removeEventListener('click', enableAudio);
        };
        
        document.addEventListener('touchstart', enableAudio);
        document.addEventListener('click', enableAudio);
        
      } catch (err) {
        console.warn('Audio context setup failed:', err);
      }
    };

    requestWakeLock();
    setupAudio();

    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdownTime(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsCountdown(false);
          setIsActive(true);
          playBellSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      // Clear any pending warning timeouts
      warningTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      warningTimeoutsRef.current = [];
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(err => {
          console.warn('Wake lock release failed:', err);
        });
      }
    };
  }, []);

  const playBellSound = useCallback(() => {
    if (bellAudioRef.current) {
      try {
        // Clone the audio to allow overlapping plays
        const bellClone = bellAudioRef.current.cloneNode();
        bellClone.currentTime = 0;
        
        // Play only the first 2 seconds
        bellClone.play();
        setTimeout(() => {
          bellClone.pause();
        }, 2000);
        
        // Strong vibration for bell
        if (navigator.vibrate) {
          navigator.vibrate([300, 100, 300]);
        }
      } catch (err) {
        console.warn('Bell sound playback failed:', err);
      }
    }
  }, []);

  const playWoodClapSound = useCallback(() => {
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        
        // Create wood clap sound using white noise burst
        const bufferSize = audioContextRef.current.sampleRate * 0.06; // Shorter - 0.06 seconds
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
        const output = buffer.getChannelData(0);
        
        // Generate filtered white noise for wood clap effect
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        
        const source = audioContextRef.current.createBufferSource();
        const gainNode = audioContextRef.current.createGain();
        const filter = audioContextRef.current.createBiquadFilter();
        
        source.buffer = buffer;
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        // Filter for wood-like sound
        filter.type = 'highpass';
        filter.frequency.value = 1200;
        
        const now = audioContextRef.current.currentTime;
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        
        source.start();
        source.stop(now + 0.06);
        
        // Sharp vibration for clap
        if (navigator.vibrate) {
          navigator.vibrate(80);
        }
      } catch (err) {
        console.warn('Wood clap sound failed:', err);
      }
    }
  }, []);

  const playWarningSound = useCallback(() => {
    try {
      // Clear any existing warning timeouts to prevent overlap
      warningTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      warningTimeoutsRef.current = [];
      
      // Play 3 wood claps with UFC-style rapid pace
      playWoodClapSound(); // First clap immediately
      
      const timeout1 = setTimeout(() => playWoodClapSound(), 250); // Second clap after 250ms
      const timeout2 = setTimeout(() => playWoodClapSound(), 500); // Third clap after 500ms
      
      // Store timeouts so we can clear them if needed
      warningTimeoutsRef.current = [timeout1, timeout2];
      
      if (navigator.vibrate) {
        // Rapid vibration pattern: clap-clap-clap
        navigator.vibrate([80, 170, 80, 170, 80]);
      }
    } catch (err) {
      console.warn('Warning sound failed:', err);
    }
  }, [playWoodClapSound]);

  const playTripleBell = useCallback(() => {
    // Fast-paced triple bell like in boxing - 400ms apart
    playBellSound();
    setTimeout(() => playBellSound(), 400);
    setTimeout(() => playBellSound(), 800);
    
    // Extended vibration pattern for session end
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300, 100, 300, 100, 300]);
    }
  }, [playBellSound]);

  // Smooth progress update logic
  useEffect(() => {
    if (isActive && !isPaused && !isCountdown && !sessionCompleted) {
      startTimeRef.current = Date.now();
      const totalTime = isResting ? config.restDuration : config.roundDuration;
      
      smoothIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const currentProgress = ((totalTime - timeLeft + elapsed) / totalTime) * 100;
        setSmoothProgress(Math.min(currentProgress, 100));
      }, 50); // Update every 50ms for smooth animation
    } else {
      if (smoothIntervalRef.current) {
        clearInterval(smoothIntervalRef.current);
      }
      // Update progress immediately when paused or stopped
      const totalTime = isResting ? config.restDuration : config.roundDuration;
      setSmoothProgress(((totalTime - timeLeft) / totalTime) * 100);
    }

    return () => {
      if (smoothIntervalRef.current) {
        clearInterval(smoothIntervalRef.current);
      }
    };
  }, [isActive, isPaused, isCountdown, sessionCompleted, timeLeft, isResting, config]);

  // Main timer logic
  useEffect(() => {
    if (isActive && !isPaused && !isCountdown && !sessionCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            playBellSound();
            
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
                // Triple bell for session end - fast pace like boxing
                playTripleBell();
                return 0;
              }
            }
          }
          
          // Warning sounds at 10 seconds
          if (prevTime === 11) {
            playWarningSound();
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
  }, [isActive, isPaused, isCountdown, sessionCompleted, isResting, currentRound, config, playBellSound, playWarningSound, playTripleBell]);



  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    // Clear all intervals and timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (smoothIntervalRef.current) {
      clearInterval(smoothIntervalRef.current);
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
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return smoothProgress;
  };

  if (isCountdown) {
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

  return (
    <div className={`h-full flex flex-col safe-area transition-colors duration-500 ${
      sessionCompleted ? 'bg-gray-900' :
      isPaused ? 'bg-red-800' :
      isResting ? 'bg-blue-800' : 'bg-green-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/30 bg-black/40">
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
            {currentRound} / {config.rounds}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetTimer}
          className="text-white hover:text-white hover:bg-white/30 font-bold text-xl border-2 border-white/50 hover:border-white/70 px-4 py-2"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <div className="text-3xl text-white mb-6 font-bold">
            {sessionCompleted ? '🎉 SESSION COMPLETE! 🎉' : 
             isPaused ? '⏸️ PAUSED' :
             isResting ? '😤 REST TIME' : '🥊 FIGHT TIME!'}
          </div>
          <div className={`text-9xl font-bold mb-8 text-white drop-shadow-2xl`}>
            {sessionCompleted ? '00:00' : formatTime(timeLeft)}
          </div>
          <Progress 
            value={getProgress()} 
            className={`w-full max-w-80 h-6 bg-white/30 ${
              isResting ? '[&>div]:bg-blue-400' : '[&>div]:bg-green-400'
            }`}
          />
        </div>

        {/* Phase Indicator */}
        <div className={`text-5xl font-bold mb-8 px-8 py-6 rounded-2xl border-4 text-white shadow-2xl ${
          sessionCompleted ? 'bg-green-700 border-green-400' :
          isPaused ? 'bg-red-700 border-red-400' :
          isResting ? 'bg-blue-700 border-blue-400' : 'bg-green-700 border-green-400'
        }`}>
          {sessionCompleted ? 'COMPLETE!' : 
           isPaused ? 'PAUSED' :
           isResting ? 'REST' : 'FIGHT!'}
        </div>

        {/* Control Buttons */}
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

        {/* Session Complete Actions */}
        {sessionCompleted && (
          <div className="flex gap-6">
            <Button
              onClick={resetTimer}
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
      </div>
    </div>
  );
} 