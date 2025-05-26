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
          /* Ensure proper viewport handling on mobile */
          min-height: -webkit-fill-available;
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
                  value={[roundDuration === 45 ? 1.5 : roundDuration / 30]}
                  max={20} 
                  min={1} 
                  step={0.5}
                  onValueChange={(value) => {
                    const sliderValue = value[0];
                    if (sliderValue === 1.5) {
                      setRoundDuration(45);
                    } else {
                      setRoundDuration(Math.round(sliderValue) * 30);
                    }
                  }}
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
            <p className="flex items-center justify-center font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              KravTime • Professional Training Timer
            </p>
            <p className="text-gray-500 text-xs">
              Made by Yanir Winnik © 2025
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
          
          // Re-acquire wake lock when page becomes visible again
          const handleVisibilityChange = async () => {
            if (wakeLockRef.current !== null && document.visibilityState === 'visible') {
              try {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
                console.log('Wake lock re-acquired');
              } catch (err) {
                console.warn('Wake lock re-acquisition failed:', err);
              }
            }
          };
          
          document.addEventListener('visibilitychange', handleVisibilityChange);
          
          // Store the cleanup function
          wakeLockRef.current.cleanup = () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };
        } else {
          // Fallback for older browsers - use video element trick
          console.log('Wake Lock API not supported, using video fallback');
          const video = document.createElement('video');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.style.position = 'fixed';
          video.style.top = '-1px';
          video.style.left = '-1px';
          video.style.width = '1px';
          video.style.height = '1px';
          video.style.opacity = '0';
          video.style.pointerEvents = 'none';
          
          // Create a minimal video data URL
          video.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAAAr1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAA';
          
          document.body.appendChild(video);
          video.play().catch(() => {
            console.log('Video fallback failed');
          });
          
          // Store reference for cleanup
          wakeLockRef.current = {
            release: () => {
              if (video.parentNode) {
                video.parentNode.removeChild(video);
              }
            },
            cleanup: () => {}
          };
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
        bellAudioRef.current = new Audio(`${process.env.PUBLIC_URL}/sounds/boxing-bell.mp3`);
        bellAudioRef.current.preload = 'auto';
        bellAudioRef.current.volume = 0.8;
        
        // Add event listeners to track loading
        bellAudioRef.current.addEventListener('canplaythrough', () => {
          console.log('Bell sound loaded and ready to play');
        });
        
        bellAudioRef.current.addEventListener('error', (e) => {
          console.warn('Bell sound loading error:', e);
        });
        
        // Set up for mobile - user interaction required
        const enableAudio = async () => {
          try {
            // Resume audio context if suspended
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
              await audioContextRef.current.resume();
              console.log('Audio context resumed');
            }
            
            // Test bell audio
            if (bellAudioRef.current) {
              try {
                bellAudioRef.current.currentTime = 0;
                const playPromise = bellAudioRef.current.play();
                if (playPromise !== undefined) {
                  await playPromise;
                  bellAudioRef.current.pause();
                  bellAudioRef.current.currentTime = 0;
                  console.log('Bell audio enabled successfully');
                }
              } catch (testErr) {
                console.warn('Bell audio test failed:', testErr);
                                 // Try creating a fresh instance
                 try {
                   const testBell = new Audio(`${process.env.PUBLIC_URL}/sounds/boxing-bell.mp3`);
                   testBell.volume = 0.1;
                   await testBell.play();
                   testBell.pause();
                   console.log('Fresh bell audio instance works');
                 } catch (freshErr) {
                   console.warn('Fresh bell audio also failed:', freshErr);
                 }
              }
            }
          } catch (err) {
            console.log('Audio setup - user interaction needed:', err);
          }

          document.removeEventListener('touchstart', enableAudio);
          document.removeEventListener('click', enableAudio);
          document.removeEventListener('keydown', enableAudio);
        };
        
        document.addEventListener('touchstart', enableAudio);
        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
        
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
        if (wakeLockRef.current.cleanup) {
          wakeLockRef.current.cleanup();
        }
        wakeLockRef.current.release().catch(err => {
          console.warn('Wake lock release failed:', err);
        });
      }
    };
  }, []);

  const playBellSound = useCallback(async () => {
    try {
      // Resume audio context if suspended
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Try multiple approaches to play the bell sound
      let bellPlayed = false;
      
      // Method 1: Try the preloaded audio
      if (bellAudioRef.current && !bellPlayed) {
        try {
          bellAudioRef.current.currentTime = 0;
          bellAudioRef.current.volume = 0.8;
          await bellAudioRef.current.play();
          
          setTimeout(() => {
            bellAudioRef.current.pause();
            bellAudioRef.current.currentTime = 0;
          }, 2000);
          
          console.log('Preloaded bell sound played successfully');
          bellPlayed = true;
        } catch (preloadErr) {
          console.warn('Preloaded bell failed:', preloadErr);
        }
      }
      
             // Method 2: Try a fresh audio instance
       if (!bellPlayed) {
         try {
           const bellAudio = new Audio(`${process.env.PUBLIC_URL}/sounds/boxing-bell.mp3`);
           bellAudio.volume = 0.8;
           bellAudio.crossOrigin = 'anonymous';
          
          await bellAudio.play();
          
          setTimeout(() => {
            bellAudio.pause();
            bellAudio.currentTime = 0;
          }, 2000);
          
          console.log('Fresh bell audio played successfully');
          bellPlayed = true;
        } catch (freshErr) {
          console.warn('Fresh bell audio failed:', freshErr);
        }
      }
      
             // Method 3: Try relative path
       if (!bellPlayed) {
         try {
           const bellAudio = new Audio('/KravTime/sounds/boxing-bell.mp3');
           bellAudio.volume = 0.8;
          
          await bellAudio.play();
          
          setTimeout(() => {
            bellAudio.pause();
            bellAudio.currentTime = 0;
          }, 2000);
          
          console.log('Relative path bell played successfully');
          bellPlayed = true;
        } catch (relativeErr) {
          console.warn('Relative path bell failed:', relativeErr);
        }
      }
      
      // Strong vibration for bell (regardless of audio success)
      if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
      }
      
      // If no bell sound worked, don't use synthetic fallback - just log
      if (!bellPlayed) {
        console.warn('All bell sound methods failed - no audio will play');
      }
      
    } catch (err) {
      console.warn('Bell sound function error:', err);
    }
  }, []);

  const playWoodClapSound = useCallback(async () => {
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
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

  // Smooth progress update logic - optimized for mobile performance
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
    <div className={`h-full flex flex-col safe-area transition-colors duration-500 touch-optimized mobile-optimized ${
      sessionCompleted ? 'bg-gray-900' :
      isPaused ? 'bg-red-800' :
      isResting ? 'bg-blue-800' : 'bg-green-800'
    }`}>
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

      {/* Main Timer Display - Now scrollable */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="min-h-full flex flex-col items-center justify-center p-6 pb-8">
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
            <div className="flex gap-6 mb-4">
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
    </div>
  );
} 