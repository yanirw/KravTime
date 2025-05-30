import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Timer, Shield, ChevronRight } from 'lucide-react';
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

          {/* Configuration Panel */}
          <ConfigurationPanel
            rounds={rounds}
            setRounds={setRounds}
            roundDuration={roundDuration}
            setRoundDuration={setRoundDuration}
            restDuration={restDuration}
            setRestDuration={setRestDuration}
          />

          {/* Session Summary */}
          <SessionSummary
            rounds={rounds}
            roundDuration={roundDuration}
            restDuration={restDuration}
          />

          {/* Start Button */}
          <Button 
            onClick={handleStartTimer} 
            className="w-full h-10 text-lg font-bold bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 shadow-lg transition-all duration-150"
          >
            START
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 px-4 pb-2 mt-4">
            <p className="flex items-center justify-center font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              KravTime • Professional Training Timer
            </p>
            <p className="text-gray-500 text-xs">
              Made by Yanir Winnik © 2025
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Version 0.1.4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 