import React, { useState } from 'react';
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
  // State for edit modes
  const [isEditingRounds, setIsEditingRounds] = useState(false);
  const [isEditingRoundDuration, setIsEditingRoundDuration] = useState(false);
  const [isEditingRestDuration, setIsEditingRestDuration] = useState(false);
  
  // Temporary input values
  const [roundsInput, setRoundsInput] = useState(rounds.toString());
  const [roundDurationInput, setRoundDurationInput] = useState('');
  const [restDurationInput, setRestDurationInput] = useState('');
  
  // Helper function to parse time input (supports formats like "2:30", "230", "90")
  const parseTimeInput = (input) => {
    const cleaned = input.trim();
    
    // If it contains a colon, parse as MM:SS
    if (cleaned.includes(':')) {
      const [minutes, seconds] = cleaned.split(':').map(num => parseInt(num, 10));
      if (isNaN(minutes) || isNaN(seconds) || seconds >= 60) return null;
      return minutes * 60 + seconds;
    }
    
    // If it's just numbers, parse intelligently
    const num = parseInt(cleaned, 10);
    if (isNaN(num)) return null;
    
    // Smart parsing for numbers without colon:
    // 1-59: treat as seconds (5 → 0:05, 45 → 0:45)
    // 60+: treat as MMSS format (230 → 2:30, 130 → 1:30, 90 → 1:30)
    if (num < 60) {
      return num; // Direct seconds
    } else if (num >= 100) {
      // Parse as MMSS format (230 → 2:30)
      const minutes = Math.floor(num / 100);
      const seconds = num % 100;
      if (seconds >= 60) return null; // Invalid seconds
      return minutes * 60 + seconds;
    } else {
      // 60-99: treat as total seconds (90 → 1:30)
      return num;
    }
  };
  
  // Helper function to format seconds for input display
  const formatSecondsForInput = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds === 0 ? `${minutes}:00` : `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handlers for rounds input
  const handleRoundsClick = () => {
    setRoundsInput(rounds.toString());
    setIsEditingRounds(true);
  };
  
  const handleRoundsSubmit = () => {
    const value = parseInt(roundsInput, 10);
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setRounds(value);
    }
    setIsEditingRounds(false);
  };
  
  const handleRoundsKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRoundsSubmit();
    } else if (e.key === 'Escape') {
      setIsEditingRounds(false);
    }
  };
  
  // Handlers for round duration input
  const handleRoundDurationClick = () => {
    setRoundDurationInput(formatSecondsForInput(roundDuration));
    setIsEditingRoundDuration(true);
  };
  
  const handleRoundDurationSubmit = () => {
    const value = parseTimeInput(roundDurationInput);
    if (value !== null && value >= 10 && value <= 600) { // 10 seconds to 10 minutes
      setRoundDuration(value);
    }
    setIsEditingRoundDuration(false);
  };
  
  const handleRoundDurationKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRoundDurationSubmit();
    } else if (e.key === 'Escape') {
      setIsEditingRoundDuration(false);
    }
  };
  
  // Handlers for rest duration input
  const handleRestDurationClick = () => {
    setRestDurationInput(formatSecondsForInput(restDuration));
    setIsEditingRestDuration(true);
  };
  
  const handleRestDurationSubmit = () => {
    const value = parseTimeInput(restDurationInput);
    if (value !== null && value >= 0 && value <= 120) {
      setRestDuration(value);
    }
    setIsEditingRestDuration(false);
  };
  
  const handleRestDurationKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRestDurationSubmit();
    } else if (e.key === 'Escape') {
      setIsEditingRestDuration(false);
    }
  };
  
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
    <div className="glass-enhanced rounded-2xl shadow-2xl shadow-black/40 p-5 mb-4 border border-white/20 backdrop-blur-xl max-w-md mx-auto">
      {/* Rounds Section */}
      <div className="mb-4">
        <label className="block text-lg font-bold text-white mb-4 flex items-center" id="rounds-label">
          <div className="relative mr-3">
            <Shield className="w-6 h-6 text-krav-accent" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-accent/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-accent font-bold">Rounds</span>
        </label>
        <div className="grid grid-cols-5 gap-2 mb-3" role="radiogroup" aria-labelledby="rounds-label">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={rounds === num ? "default" : "outline"}
              className={`h-12 text-lg font-bold transition-all duration-200 btn-interactive focus-visible-enhanced ${
                rounds === num 
                  ? "bg-gradient-to-br from-krav-accent to-krav-accent-bright hover:from-krav-accent-bright hover:to-krav-accent text-black border-krav-accent shadow-glow" 
                  : ""
              }`}
              onClick={() => setRounds(Number(num))}
              role="radio"
              aria-checked={rounds === num}
              aria-label={`${num} round${num !== 1 ? 's' : ''}`}
            >
              {num}
            </Button>
          ))}
        </div>
        <Slider
          value={[rounds]}
          max={20}
          min={1}
          step={1}
          onValueChange={(value) => setRounds(Number(value[0]))}
          className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-accent [&>span:first-child>span]:to-krav-accent-bright [&>span:first-child]:bg-gray-700/90 [&>span:first-child]:border [&>span:first-child]:border-gray-500/30"
          aria-label="Number of rounds slider"
          aria-valuemin={1}
          aria-valuemax={20}
          aria-valuenow={rounds}
          aria-valuetext={`${rounds} round${rounds !== 1 ? 's' : ''}`}
        />
        <div className="flex justify-between items-center text-base text-gray-200 mt-1 font-bold">
          <span>1</span>
          {isEditingRounds ? (
            <input
              type="text"
              value={roundsInput}
              onChange={(e) => setRoundsInput(e.target.value)}
              onBlur={handleRoundsSubmit}
              onKeyDown={handleRoundsKeyPress}
              className="bg-gray-800/80 border border-krav-accent rounded px-2 py-1 text-lg text-white font-bold text-center w-20 focus:outline-none focus:ring-2 focus:ring-krav-accent"
              autoFocus
              placeholder="1-50"
            />
          ) : (
            <span 
              className="text-xl text-white font-bold cursor-pointer hover:bg-gray-700/50 rounded px-2 py-1 transition-colors duration-200"
              onClick={handleRoundsClick}
              title="Click to edit manually"
            >
              <span className="text-krav-accent text-xl font-bold">{rounds}</span> round{rounds !== 1 ? 's' : ''}
            </span>
          )}
          <span>20</span>
        </div>
      </div>

      {/* Round Duration Section */}
      <div className="mb-4">
        <label className="block text-lg font-bold text-white mb-4 flex items-center" id="round-duration-label">
          <div className="relative mr-3">
            <Timer className="w-6 h-6 text-krav-success" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-success/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-success font-bold">Round Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3" role="radiogroup" aria-labelledby="round-duration-label">
          {[60, 90, 120, 150, 180, 300].map((seconds) => (
            <Button
              key={seconds}
              variant={roundDuration === seconds ? "default" : "outline"}
              className={`h-12 text-lg font-bold transition-all duration-200 btn-interactive focus-visible-enhanced ${
                roundDuration === seconds 
                  ? "bg-gradient-to-br from-krav-success to-krav-success-bright hover:from-krav-success-bright hover:to-krav-success text-white border-krav-success shadow-glow-green" 
                  : ""
              }`}
              onClick={() => setRoundDuration(Number(seconds))}
              role="radio"
              aria-checked={roundDuration === seconds}
              aria-label={`${formatTime(seconds)} round duration`}
            >
              {formatTime(seconds)}
            </Button>
          ))}
        </div>
        <Slider
          value={[workDurationToSlider(roundDuration)]}
          max={20}
          min={1}
          step={1}
          onValueChange={(value) => {
            const newDuration = sliderToWorkDuration(value[0]);
            setRoundDuration(Number(newDuration));
          }}
          className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-success [&>span:first-child>span]:to-krav-success-bright [&>span:first-child]:bg-gray-700/90 [&>span:first-child]:border [&>span:first-child]:border-gray-500/30"
          aria-label="Round duration slider"
          aria-valuemin={15}
          aria-valuemax={300}
          aria-valuenow={roundDuration}
          aria-valuetext={`${formatTime(roundDuration)} per round`}
        />
        <div className="flex justify-between items-center text-base text-gray-200 mt-1 font-bold">
          <span>0:15</span>
          {isEditingRoundDuration ? (
            <input
              type="text"
              value={roundDurationInput}
              onChange={(e) => setRoundDurationInput(e.target.value)}
              onBlur={handleRoundDurationSubmit}
              onKeyDown={handleRoundDurationKeyPress}
              className="bg-gray-800/80 border border-krav-success rounded px-2 py-1 text-lg text-white font-bold text-center w-28 focus:outline-none focus:ring-2 focus:ring-krav-success"
              autoFocus
              placeholder="10s-10m"
            />
          ) : (
            <span 
              className="text-xl text-white font-bold cursor-pointer hover:bg-gray-700/50 rounded px-2 py-1 transition-colors duration-200"
              onClick={handleRoundDurationClick}
              title="Click to edit manually"
            >
              <span className="text-krav-success text-xl font-bold">{formatTime(roundDuration)}</span> per round
            </span>
          )}
          <span>5:00</span>
        </div>
      </div>

      {/* Rest Duration Section */}
      <div className="mb-2">
        <label className="block text-lg font-bold text-white mb-4 flex items-center" id="rest-duration-label">
          <div className="relative mr-3">
            <Clock className="w-6 h-6 text-krav-rest" />
            <div className="absolute -inset-0.5 rounded-full bg-krav-rest/20 animate-pulse"></div>
          </div>
          <span className="text-gradient-rest font-bold">Rest Duration</span>
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3" role="radiogroup" aria-labelledby="rest-duration-label">
          {[15, 30, 60].map((seconds) => (
            <Button
              key={seconds}
              variant={restDuration === seconds ? "default" : "outline"}
              className={`h-12 text-lg font-bold transition-all duration-200 btn-interactive focus-visible-enhanced ${
                restDuration === seconds 
                  ? "bg-gradient-to-br from-krav-rest to-krav-rest-bright hover:from-krav-rest-bright hover:to-krav-rest text-white border-krav-rest shadow-glow-blue" 
                  : ""
              }`}
              onClick={() => setRestDuration(Number(seconds))}
              role="radio"
              aria-checked={restDuration === seconds}
              aria-label={`${formatTime(seconds)} rest duration`}
            >
              {formatTime(seconds)}
            </Button>
          ))}
        </div>
        <Slider
          value={[restDurationToSlider(restDuration)]}
          max={8}
          min={0}
          step={1}
          onValueChange={(value) => {
            const newDuration = sliderToRestDuration(value[0]);
            setRestDuration(Number(newDuration));
          }}
          className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-krav-rest [&>span:first-child>span]:to-krav-rest-bright [&>span:first-child]:bg-gray-700/90 [&>span:first-child]:border [&>span:first-child]:border-gray-500/30"
          aria-label="Rest duration slider"
          aria-valuemin={0}
          aria-valuemax={120}
          aria-valuenow={restDuration}
          aria-valuetext={`${restDuration === 0 ? 'No rest' : formatTime(restDuration)} between rounds`}
        />
        <div className="flex justify-between items-center text-base text-gray-200 mt-1 font-bold">
          <span>0:00</span>
          {isEditingRestDuration ? (
            <input
              type="text"
              value={restDurationInput}
              onChange={(e) => setRestDurationInput(e.target.value)}
              onBlur={handleRestDurationSubmit}
              onKeyDown={handleRestDurationKeyPress}
              className="bg-gray-800/80 border border-krav-rest rounded px-2 py-1 text-lg text-white font-bold text-center w-28 focus:outline-none focus:ring-2 focus:ring-krav-rest"
              autoFocus
              placeholder="0s-2m"
            />
          ) : (
            <span 
              className="text-xl text-white font-bold cursor-pointer hover:bg-gray-700/50 rounded px-2 py-1 transition-colors duration-200"
              onClick={handleRestDurationClick}
              title="Click to edit manually"
            >
              <span className="text-krav-rest text-xl font-bold">{restDuration === 0 ? 'No rest' : formatTime(restDuration)}</span> between rounds
            </span>
          )}
          <span>2:00</span>
        </div>
      </div>
    </div>
  );
} 