import React from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Shield, Clock, Timer } from 'lucide-react';
import { formatTime } from '../../utils/timeUtils';

/**
 * Configuration Panel component
 * Handles all workout configuration inputs
 */
export function ConfigurationPanel({ 
  rounds, 
  setRounds, 
  roundDuration, 
  setRoundDuration, 
  restDuration, 
  setRestDuration 
}) {
  
  // Round duration: 15-second increments for full flexibility
  const workDurationToSlider = (seconds) => {
    return Math.round(seconds / 15);
  };
  
  const sliderToWorkDuration = (sliderValue) => {
    return sliderValue * 15;
  };
  
  // Rest duration: 15-second increments from 0s (no rest) to 2:00 (120s)
  const restDurationToSlider = (seconds) => {
    return Math.round(seconds / 15);
  };
  
  const sliderToRestDuration = (sliderValue) => {
    return sliderValue * 15;
  };
  
  return (
    <div className="glass rounded-2xl shadow-2xl shadow-black/40 p-5 mb-4 border border-white/20 backdrop-blur-xl max-w-md mx-auto">
      {/* Rounds Section */}
      <div className="mb-5">
        <label className="block text-base font-bold text-white mb-4 flex items-center">
          <div className="relative mr-3">
            <Shield className="w-5 h-5 text-krav-accent" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-accent/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-accent font-bold">Rounds</span>
        </label>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={rounds === num ? "default" : "outline"}
              className={`h-11 text-base font-bold transition-all duration-200 btn-interactive ${
                rounds === num 
                  ? "bg-gradient-to-br from-krav-accent to-krav-accent-bright hover:from-krav-accent-bright hover:to-krav-accent text-black border-krav-accent shadow-glow" 
                  : "border-gray-500 text-gray-200 bg-gray-700/50 hover:bg-gray-600/60 hover:border-gray-400 backdrop-blur-sm"
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
            className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-accent [&>span:first-child>span]:to-krav-accent-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between items-center text-sm text-gray-400 mt-2 font-semibold">
            <span>1</span>
            <span className="text-base text-white">
              <span className="text-krav-accent">{rounds}</span> round{rounds !== 1 ? 's' : ''}
            </span>
            <span>20</span>
          </div>
        </div>
      </div>

      {/* Round Duration Section */}
      <div className="mb-5">
        <label className="block text-base font-bold text-white mb-4 flex items-center">
          <div className="relative mr-3">
            <Timer className="w-5 h-5 text-krav-success" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-success/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-success font-bold">Round Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[60, 90, 120, 150, 180, 300].map((seconds) => (
            <Button
              key={seconds}
              variant={roundDuration === seconds ? "default" : "outline"}
              className={`h-11 text-base font-bold transition-all duration-200 btn-interactive ${
                roundDuration === seconds 
                  ? "bg-gradient-to-br from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white border-krav-success shadow-glow-green" 
                  : "border-gray-500 text-gray-200 bg-gray-700/50 hover:bg-gray-600/60 hover:border-gray-400 backdrop-blur-sm"
              }`}
              onClick={() => setRoundDuration(seconds)}
            >
              {formatTime(seconds)}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Slider
            value={[workDurationToSlider(roundDuration)]}
            max={20} // 20 * 15 = 300 seconds (5:00), 15-second increments
            min={1}  // 1 * 15 = 15 seconds (0:15)
            step={1} // Each step = 15 seconds
            onValueChange={(value) => {
              const newDuration = sliderToWorkDuration(value[0]);
              setRoundDuration(newDuration);
            }}
            className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-success [&>span:first-child>span]:to-krav-success-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between items-center text-sm text-gray-400 mt-2 font-semibold">
            <span>0:15</span>
            <span className="text-base text-white">
              <span className="text-krav-success">{formatTime(roundDuration)}</span> per round
            </span>
            <span>5:00</span>
          </div>
        </div>
      </div>

      {/* Rest Duration Section */}
      <div className="mb-3">
        <label className="block text-base font-bold text-white mb-4 flex items-center">
          <div className="relative mr-3">
            <Clock className="w-5 h-5 text-krav-rest" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-rest/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-rest font-bold">Rest Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[15, 30, 60].map((seconds) => (
            <Button
              key={seconds}
              variant={restDuration === seconds ? "default" : "outline"}
              className={`h-11 text-base font-bold transition-all duration-200 btn-interactive ${
                restDuration === seconds 
                  ? "bg-gradient-to-br from-krav-rest to-krav-rest-bright hover:from-krav-rest-bright hover:to-krav-rest text-white border-krav-rest shadow-glow-blue" 
                  : "border-gray-500 text-gray-200 bg-gray-700/50 hover:bg-gray-600/60 hover:border-gray-400 backdrop-blur-sm"
              }`}
              onClick={() => setRestDuration(seconds)}
            >
              {formatTime(seconds)}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Slider
            value={[restDurationToSlider(restDuration)]}
            max={8} // 8 * 15 = 120 seconds (2:00)
            min={0}  // 0 * 15 = 0 seconds (no rest)
            step={1} // 15-second increments
            onValueChange={(value) => {
              const newDuration = sliderToRestDuration(value[0]);
              setRestDuration(newDuration);
            }}
            className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-rest [&>span:first-child>span]:to-krav-rest-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between items-center text-sm text-gray-400 mt-2 font-semibold">
            <span>0:00</span>
            <span className="text-base text-white">
              <span className="text-krav-rest">{restDuration === 0 ? 'No rest' : formatTime(restDuration)}</span> between rounds
            </span>
            <span>2:00</span>
          </div>
        </div>
      </div>
    </div>
  );
} 