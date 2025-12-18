import React from 'react';
import { Copy, Check } from 'lucide-react';

interface LeagueCardProps {
  league_id: string;
  league_name: string;
  join_code: string;
  role: string;
  championship_name: string;
  created_at: string;
  copiedCode: string | null;
  onCopyToClipboard: (code: string) => void;
  formatDate: (date: string) => string;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({
  league_id,
  league_name,
  join_code,
  role,
  championship_name,
  created_at,
  copiedCode,
  onCopyToClipboard,
  formatDate,
}) => {
  return (
    <div
      key={league_id}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
      <h3 className="text-emerald-400 font-semibold mb-2">{league_name}</h3>
      <div className="space-y-2 text-sm text-slate-400">
        <p>{championship_name}</p>
        <p>
          <span className="text-white/60">Papel:</span> {role}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-white/60">Convite:</span>
          <code className="bg-white/5 px-2 py-1 rounded text-xs font-mono">{join_code}</code>
          <button
            onClick={() => onCopyToClipboard(join_code)}
            className="ml-auto p-1 hover:bg-white/10 rounded transition-colors">
            {copiedCode === join_code ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500">Data: {formatDate(created_at)}</p>
      </div>
    </div>
  );
};
