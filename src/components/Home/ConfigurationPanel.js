import React from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Shield, Clock } from 'lucide-react';
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
  
  return (
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
            value={[roundDurationToSlider(roundDuration)]}
            max={20} 
            min={1} 
            step={0.5}
            onValueChange={(value) => {
              const newDuration = sliderToRoundDuration(value[0]);
              setRoundDuration(newDuration);
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
            value={[restDurationToSlider(restDuration)]}
            max={10} 
            min={1} 
            step={1}
            onValueChange={(value) => {
              const newDuration = sliderToRestDuration(value[0]);
              setRestDuration(newDuration);
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
    </div>
  );
} 