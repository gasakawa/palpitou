import React from 'react';

interface RoundBadgesProps {
  rounds: string[];
  selectedRound: string;
  onSelect: (round: string) => void;
}

export const RoundBadges: React.FC<RoundBadgesProps> = ({ rounds, selectedRound, onSelect }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Rodadas</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {rounds.map((round) => (
          <button
            key={round}
            onClick={() => onSelect(round)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              selectedRound === round
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'border border-emerald-500/30 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50'
            }`}
            aria-pressed={selectedRound === round}
            role="tab">
            {round}
          </button>
        ))}
      </div>
    </div>
  );
};
