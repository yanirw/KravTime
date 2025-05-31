import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Timer, Shield, ChevronRight, Zap, Target } from 'lucide-react';
import { ConfigurationPanel } from './ConfigurationPanel';
import { SessionSummary } from './SessionSummary';

/**
 * Home Screen component
 * Main configuration screen for workout settings
 */
export function HomeScreen({ onStartTimer }) {
  const [rounds, setRounds] = useState(3);
  const [roundDuration, setRoundDuration] = useState(120);
  const [restDuration, setRestDuration] = useState(30);

  const handleStartTimer = () => {
    onStartTimer({ rounds, roundDuration, restDuration });
  };

  return (
    <div className="h-full flex flex-col bg-transparent safe-area transition-all duration-500 animate-fade-in">
      {/* Minimal 80's retro logo CSS */}
      <style jsx>{`
        @keyframes subtleGlow {
          0%, 100% {
            text-shadow: 
              0 0 2px currentColor,
              0 0 4px currentColor;
          }
          50% {
            text-shadow: 
              0 0 1px currentColor,
              0 0 3px currentColor;
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }

        .retro-title {
          font-family: 'Arial Black', Arial, sans-serif;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .retro-krav {
          color: #FBBF24;
          text-shadow: 
            0 0 2px #F59E0B,
            1px 1px 1px rgba(0,0,0,0.2);
          animation: subtleGlow 4s ease-in-out infinite alternate;
        }

        .retro-time {
          color: #FFFFFF;
          text-shadow: 
            0 0 2px rgba(255,255,255,0.3),
            1px 1px 1px rgba(0,0,0,0.2);
          animation: subtleGlow 4s ease-in-out infinite alternate;
          animation-delay: 0.5s;
        }

        .retro-subtitle {
          font-family: 'Arial', sans-serif;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #94A3B8;
          text-shadow: 0 0 1px rgba(148, 163, 184, 0.2);
          animation: gentleFloat 5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="flex-1 overflow-y-auto scroll-container px-4 py-3">
        <div className="max-w-md mx-auto space-y-4">
          {/* Minimal 80's Retro Logo */}
          <div className="text-center mb-2 animate-slide-up">
            <h1 className="retro-title text-4xl md:text-5xl mb-1">
              <span className="retro-krav">KRAV</span>
              <span className="retro-time">TIME</span>
            </h1>
            <p className="retro-subtitle text-xs">
              TRAINING TIMER
            </p>
          </div>

          {/* Configuration Panel with enhanced styling */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ConfigurationPanel
              rounds={rounds}
              setRounds={setRounds}
              roundDuration={roundDuration}
              setRoundDuration={setRoundDuration}
              restDuration={restDuration}
              setRestDuration={setRestDuration}
            />
          </div>

          {/* Session Summary with enhanced styling */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SessionSummary
              rounds={rounds}
              roundDuration={roundDuration}
              restDuration={restDuration}
            />
          </div>

          {/* Compact Start Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={handleStartTimer} 
              className="w-full h-12 text-lg font-black bg-gradient-to-r from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white border-2 border-krav-success shadow-glow-green transition-all duration-300 btn-interactive relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                START WORKOUT
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
          </div>

          {/* Compact Footer */}
          <div className="text-center text-2xs text-gray-400 px-2 pb-3 mt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass rounded-xl p-3 border border-white/10">
              <p className="flex items-center justify-center font-semibold mb-1">
                <Shield className="w-3 h-3 mr-1 text-krav-accent" />
                <span className="text-gradient-accent font-bold text-xs">KravTime</span>
                <span className="mx-1 text-gray-500">•</span>
                <span className="text-gray-300 text-2xs">Training Timer</span>
              </p>
              <p className="text-gray-400 text-2xs">
                Made by <span className="text-krav-accent font-medium">Yanir Winnik</span> © 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 