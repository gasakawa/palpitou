import React from 'react';
import { Copy, Check } from 'lucide-react';
import { LeagueDetails } from '../lib/rpc/leagues';

interface LeagueDetailHeaderProps {
  league: LeagueDetails;
  copiedCode: string | null;
  onCopyCode: () => void;
}

const isInviteAllowed = (role: string) => role.toLowerCase().includes('admin');

export const LeagueDetailHeader: React.FC<LeagueDetailHeaderProps> = ({ league, copiedCode, onCopyCode }) => {
  return (
    <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">{league.league_name}</h1>
          <div className="space-y-1 text-sm text-slate-400">
            <p>{league.championship_name}</p>
          </div>
        </div>

        {isInviteAllowed(league.role) && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-2">Código de convite</div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
              <code className="text-emerald-400 font-mono font-semibold">{league.join_code}</code>
              <button onClick={onCopyCode} className="p-1 hover:bg-white/10 rounded transition-colors">
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
