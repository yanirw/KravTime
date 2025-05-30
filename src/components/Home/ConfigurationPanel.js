import React from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Shield, Clock, Timer } from 'lucide-react';
import { 
  formatTime, 
  sliderToRoundDuration, 
  roundDurationToSlider, 
  sliderToRestDuration, 
  restDurationToSlider 
} from '../../utils/timeUtils';

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
  
  // Work duration: Custom mapping to match button values
  const workDurationToSlider = (seconds) => {
    // Map specific durations to slider positions (1-20)
    const durationMap = {
      15: 1,    // 0:15
      30: 2,    // 0:30
      45: 3,    // 0:45
      60: 4,    // 1:00
      75: 5,    // 1:15
      90: 6,    // 1:30
      105: 7,   // 1:45
      120: 8,   // 2:00
      135: 9,   // 2:15
      150: 10,  // 2:30
      165: 11,  // 2:45
      180: 12,  // 3:00
      195: 13,  // 3:15
      210: 14,  // 3:30
      225: 15,  // 3:45
      240: 16,  // 4:00
      255: 17,  // 4:15
      270: 18,  // 4:30
      285: 19,  // 4:45
      300: 20   // 5:00
    };
    return durationMap[seconds] || Math.round(seconds / 15);
  };
  
  const sliderToWorkDuration = (sliderValue) => {
    return sliderValue * 15; // Convert back to seconds (15-second increments)
  };
  
  // Rest duration: 15-second increments from 15s to 3:00 (180s)
  const restDurationToSlider = (seconds) => {
    return seconds / 15; // 15-second increments
  };
  
  const sliderToRestDuration = (sliderValue) => {
    return sliderValue * 15; // Convert back to seconds
  };
  
  return (
    <div className="glass rounded-2xl shadow-2xl shadow-black/40 p-4 mb-3 border border-white/20 backdrop-blur-xl">
      {/* Rounds Section */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-3 flex items-center">
          <div className="relative mr-2">
            <Shield className="w-4 h-4 text-krav-accent" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-accent/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-accent font-bold">Rounds</span>
        </label>
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={rounds === num ? "default" : "outline"}
              className={`h-8 text-xs font-bold transition-all duration-200 btn-interactive ${
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
            className="py-1.5 [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-accent [&>span:first-child>span]:to-krav-accent-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between text-2xs text-gray-400 mt-1 font-semibold">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>
        <p className="text-center text-xs text-white mt-1.5 font-semibold">
          <span className="text-krav-accent">{rounds}</span> round{rounds !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Work Duration Section */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-3 flex items-center">
          <div className="relative mr-2">
            <Timer className="w-4 h-4 text-krav-success" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-success/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-success font-bold">Work Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[60, 90, 120, 150, 180, 300].map((seconds) => (
            <Button
              key={seconds}
              variant={roundDuration === seconds ? "default" : "outline"}
              className={`h-8 text-xs font-bold transition-all duration-200 btn-interactive ${
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
            max={20} // 20 * 15 = 300 seconds (5:00)
            min={1}  // 1 * 15 = 15 seconds
            step={1} // 15-second increments
            onValueChange={(value) => {
              const newDuration = sliderToWorkDuration(value[0]);
              setRoundDuration(newDuration);
            }}
            className="py-1.5 [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-success [&>span:first-child>span]:to-krav-success-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between text-2xs text-gray-400 mt-1 font-semibold">
            <span>0:15</span>
            <span>1:00</span>
            <span>2:00</span>
            <span>3:00</span>
            <span>4:00</span>
            <span>5:00</span>
          </div>
        </div>
        <p className="text-center text-xs text-white mt-1.5 font-semibold">
          <span className="text-krav-success">{formatTime(roundDuration)}</span> per round
        </p>
      </div>

      {/* Rest Duration Section */}
      <div className="mb-2">
        <label className="block text-sm font-bold text-white mb-3 flex items-center">
          <div className="relative mr-2">
            <Clock className="w-4 h-4 text-krav-rest" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-rest/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-rest font-bold">Rest Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[15, 30, 60].map((seconds) => (
            <Button
              key={seconds}
              variant={restDuration === seconds ? "default" : "outline"}
              className={`h-8 text-xs font-bold transition-all duration-200 btn-interactive ${
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
            max={12} // 12 * 15 = 180 seconds (3:00)
            min={1}  // 1 * 15 = 15 seconds
            step={1} // 15-second increments
            onValueChange={(value) => {
              const newDuration = sliderToRestDuration(value[0]);
              setRestDuration(newDuration);
            }}
            className="py-1.5 [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-rest [&>span:first-child>span]:to-krav-rest-bright [&>span:first-child]:bg-gray-700 [&>span:first-child]:rounded-full"
          />
          <div className="flex justify-between text-2xs text-gray-400 mt-1 font-semibold">
            <span>0:15</span>
            <span>0:45</span>
            <span>1:30</span>
            <span>2:15</span>
            <span>3:00</span>
          </div>
        </div>
        <p className="text-center text-xs text-white mt-1.5 font-semibold">
          <span className="text-krav-rest">{formatTime(restDuration)}</span> between rounds
        </p>
      </div>
    </div>
  );
} 