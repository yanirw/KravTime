import React from 'react';
import { Button } from '../ui/button';

const PRESETS = [
  {
    name: 'UFC Standard',
    rounds: 3,
    roundDuration: 300,
    restDuration: 60,
    description: 'Non-title UFC fights',
    icon: '🥊',
  },
  {
    name: 'UFC Title Fight / Main Event',
    rounds: 5,
    roundDuration: 300,
    restDuration: 60,
    description: 'UFC main events and titles',
    icon: '🏆',
  },
  {
    name: 'Boxing (Pro)',
    rounds: 12,
    roundDuration: 180,
    restDuration: 60,
    description: 'Traditional pro boxing',
    icon: '🥊',
  },
  {
    name: 'Boxing (Amateur / Olympic)',
    rounds: 3,
    roundDuration: 180,
    restDuration: 60,
    description: 'National/international amateur format',
    icon: '🥇',
  },
  {
    name: 'Muay Thai (Traditional)',
    rounds: 5,
    roundDuration: 180,
    restDuration: 120,
    description: 'Long recovery between rounds',
    icon: '🦵',
  },
  {
    name: 'Kickboxing (K-1 Rules)',
    rounds: 3,
    roundDuration: 180,
    restDuration: 60,
    description: 'Standard for K-1 and Glory',
    icon: '🥋',
  },
  {
    name: 'Jiu-Jitsu (IBJJF Black Belt Finals)',
    rounds: 1,
    roundDuration: 600,
    restDuration: 0,
    description: 'Submission-based format',
    icon: '🟦',
  },
  {
    name: 'Krav Maga Defense Circuit',
    rounds: 6,
    roundDuration: 90,
    restDuration: 30,
    description: 'Simulates unpredictable threat response',
    icon: '🚨',
  },
  {
    name: 'Krav Maga 360 Drill',
    rounds: 10,
    roundDuration: 60,
    restDuration: 15,
    description: 'Rotate attackers every round',
    icon: '🔄',
  },
  {
    name: 'MMA Conditioning (Shark Tank)',
    rounds: 5,
    roundDuration: 120,
    restDuration: 30,
    description: 'Fresh opponent each round',
    icon: '💪',
  },
  {
    name: 'HIIT Sparring Drill',
    rounds: 8,
    roundDuration: 60,
    restDuration: 30,
    description: 'Builds quick decision-making',
    icon: '🧠',
  },
  {
    name: 'Tabata Fight Drill',
    rounds: 8,
    roundDuration: 20,
    restDuration: 10,
    description: 'Explosive output training',
    icon: '🔥',
  },
];

function formatTime(seconds) {
  if (seconds === 0) return 'N/A';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0 && s > 0) return `${m}:${s.toString().padStart(2, '0')}`;
  if (m > 0) return `${m}:00`;
  return `${s}s`;
}

export function PresetsPage({ onBack, onSelectPreset }) {
  return (
    <div className="h-full flex flex-col items-center justify-start bg-black/80 p-4 animate-fade-in">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button onClick={onBack} className="mr-2 px-3 py-1 text-sm font-bold bg-gray-800 text-white border border-gray-600 rounded-lg">Back</Button>
          <h2 className="text-2xl font-black text-white flex-1 text-center">Presets</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESETS.map((preset, idx) => (
            <Button
              key={preset.name}
              className="flex flex-col items-start justify-between h-28 p-3 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow hover:scale-[1.03] transition-transform duration-150 overflow-hidden"
              onClick={() => onSelectPreset({
                rounds: preset.rounds,
                roundDuration: preset.roundDuration,
                restDuration: preset.restDuration,
              })}
            >
              <div className="flex items-center w-full mb-1">
                <span className="text-xl mr-2">{preset.icon}</span>
                <span className="font-bold text-white text-base truncate flex-1">{preset.name}</span>
              </div>
              <div className="text-xs text-gray-300 flex flex-wrap gap-x-2 gap-y-1 mb-1">
                <span>Rounds: <b>{preset.rounds}</b></span>
                <span>Duration: <b>{formatTime(preset.roundDuration)}</b></span>
                <span>Break: <b>{formatTime(preset.restDuration)}</b></span>
              </div>
              <div className="text-xs text-gray-400 truncate w-full">{preset.description}</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 