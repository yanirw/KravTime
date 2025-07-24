import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

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
    rounds: 3,
    roundDuration: 60,
    restDuration: 10,
    description: 'Defend against attacks from all directions. Rotate attackers each round.',
    icon: '🔄',
  },
  {
    name: 'Krav Maga Multiple Opponents',
    rounds: 6,
    roundDuration: 60,
    restDuration: 30,
    description: 'Face multiple attackers. Switch roles each round. Practice awareness and movement.',
    icon: '👥',
  },
  {
    name: 'Krav Maga Surprise Attack',
    rounds: 6,
    roundDuration: 30,
    restDuration: 10,
    description: 'Sudden weapon attacks (knife/stick). React and neutralize quickly.',
    icon: '⚡️',
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

const PRESETS_PER_PAGE = 6;

export function PresetsPage({ onBack, onSelectPreset }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(PRESETS.length / PRESETS_PER_PAGE);
  const startIdx = page * PRESETS_PER_PAGE;
  const endIdx = startIdx + PRESETS_PER_PAGE;
  const pagePresets = PRESETS.slice(startIdx, endIdx);

  return (
    <div className="h-full flex flex-col items-center justify-start bg-black/80 p-2 animate-fade-in">
      <div className="w-full max-w-md mx-auto">
        {/* Header: Back icon left, Presets title perfectly centered */}
        <div className="relative flex items-center mb-3 mt-2 h-12">
          <div className="absolute left-0 top-0 h-full flex items-center">
            <Button onClick={onBack} className="p-2 text-sm font-bold bg-gray-800 text-white border border-gray-600 rounded-full"><ArrowLeft className="w-5 h-5" /></Button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-xl font-black text-white text-center w-full">Presets</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          {pagePresets.map((preset) => (
            <Button
              key={preset.name}
              className="flex flex-col items-center justify-center h-20 p-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow hover:scale-[1.03] transition-transform duration-150 overflow-hidden w-[97%] mx-auto min-h-0"
              onClick={() => onSelectPreset({
                rounds: preset.rounds,
                roundDuration: preset.roundDuration,
                restDuration: preset.restDuration,
              })}
            >
              <span className="text-lg mb-0.5">{preset.icon}</span>
              <span className="font-bold text-white text-base text-center leading-tight mb-0.5">{preset.name}</span>
              <div className="text-xs text-gray-300 flex flex-wrap gap-x-1 gap-y-0.5 mb-0.5 justify-center w-full text-center">
                <span>Rounds: <b>{preset.rounds}</b></span>
                <span>Duration: <b>{formatTime(preset.roundDuration)}</b></span>
                <span>Break: <b>{formatTime(preset.restDuration)}</b></span>
              </div>
              <div className="text-xs text-gray-400 truncate w-full text-center leading-tight">{preset.description}</div>
            </Button>
          ))}
        </div>
        {/* Navigation: Prev/Next centered and spaced at the bottom */}
        <div className="flex justify-between items-center mt-2 w-full">
          <Button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 text-sm font-bold bg-gray-800 text-white border border-gray-600 rounded-lg disabled:opacity-50"
          >
            Prev
          </Button>
          <span className="text-gray-300 text-xs font-bold">
            Page {page + 1} / {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 text-sm font-bold bg-gray-800 text-white border border-gray-600 rounded-lg disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 