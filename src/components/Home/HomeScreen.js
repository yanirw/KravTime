import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Timer, Shield, ChevronRight, Zap } from 'lucide-react';
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
      {/* Custom CSS for logo shine animation */}
      <style jsx>{`
        @keyframes shine {
          0%, 85%, 100% { 
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(245, 158, 11, 0));
          }
          90% { 
            opacity: 1.5;
            transform: scale(1.15);
            filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.9));
          }
          95% { 
            opacity: 1.3;
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.7));
          }
        }
        .logo-shine {
          animation: shine 5s infinite;
        }
      `}</style>
      
      <div className="flex-1 overflow-y-auto scroll-container px-4 py-3">
        <div className="max-w-sm mx-auto space-y-4">
          {/* Compact Header */}
          <div className="text-center mb-4 animate-slide-up">
            <div className="relative inline-block">
              <h1 className="text-xl font-extrabold mb-1 tracking-tight flex items-center justify-center">
                <div className="relative mr-2">
                  <Timer className="w-5 h-5 text-krav-accent logo-shine" />
                </div>
                <span className="text-gradient-accent text-2xl font-black">
                  KravTime
                </span>
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-krav-accent to-krav-accent-bright rounded-full"></div>
            </div>
            <p className="text-gray-300 text-xs font-semibold mt-2 flex items-center justify-center">
              <Zap className="w-3 h-3 mr-1 text-krav-accent" />
              Configure your training
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