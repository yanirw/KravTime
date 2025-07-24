import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Timer, Shield, ChevronRight, Zap, Target, Star } from 'lucide-react';
import { ConfigurationPanel } from './ConfigurationPanel';
import { SessionSummary } from './SessionSummary';
import { PresetsPage } from './PresetsPage';

/**
 * Home Screen component
 * Main configuration screen for workout settings
 */
export function HomeScreen({ onStartTimer }) {
  const [rounds, setRounds] = useState(3);
  const [roundDuration, setRoundDuration] = useState(120);
  const [restDuration, setRestDuration] = useState(30);
  // Add state for showing presets
  const [showPresets, setShowPresets] = useState(false);

  const handleStartTimer = (params) => {
    if (params) {
      onStartTimer(params);
    } else {
      onStartTimer({ rounds, roundDuration, restDuration });
    }
  };

  // If showing presets, render the PresetsPage
  if (showPresets) {
    return <PresetsPage onBack={() => setShowPresets(false)} onSelectPreset={({ rounds, roundDuration, restDuration }) => {
      handleStartTimer({ rounds, roundDuration, restDuration });
    }} />;
  }

  return (
    <div className="h-full flex flex-col bg-transparent safe-area transition-all duration-500 animate-fade-in">
      {/* Minimal 80's retro logo CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
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
      `}</style>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scroll-container px-4 py-3">
        <div className="max-w-md mx-auto space-y-4">
          {/* Minimal 80's Retro Logo */}
          <div className="text-center mb-2 animate-slide-up">
            <h1 className="retro-title text-4xl md:text-5xl mb-1">
              <span className="retro-krav">KRAV</span>
              <span className="retro-time">TIME</span>
            </h1>
          </div>

          {/* Configuration Panel with enhanced styling */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Small floating presets icon button with label */}
            <button
              className="absolute top-0 right-0 m-2 flex items-center gap-1 px-3 h-9 rounded-full bg-gradient-to-br from-krav-accent to-krav-accent-bright text-black shadow-glow border-2 border-krav-accent font-bold text-sm hover:scale-105 transition-transform duration-150 z-10"
              title="Presets"
              onClick={() => setShowPresets(true)}
              aria-label="Presets"
              type="button"
            >
              <Star className="w-5 h-5 mr-1" />
              Presets
            </button>
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

          {/* Start Button - Original Design */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={handleStartTimer}
              className="w-full h-14 text-lg font-black bg-gradient-to-r from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white border-2 border-krav-success shadow-glow-green transition-all duration-300 btn-interactive relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                START WORKOUT
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 