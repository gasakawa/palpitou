import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useLeaguePointsExistence, useLeagueRanking } from '../hooks/useLeagueRanking';
import type { LeagueRankingItem } from '../types/types';

interface RankingTableProps {
  ranking: LeagueRankingItem[];
  onPlayerClick: (userId: string) => void;
}

const RankingTable: React.FC<RankingTableProps> = ({ ranking, onPlayerClick }) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 bg-white/5 border-b border-white/10 p-4 text-sm font-semibold text-slate-300">
        <div>Posição</div>
        <div>Jogador</div>
        <div className="text-right">Pontos</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-white/10">
        {ranking.map((item) => (
          <button
            key={item.user_id}
            onClick={() => onPlayerClick(item.user_id)}
            className={`w-full grid grid-cols-3 gap-4 p-4 text-left transition-colors ${
              item.is_me ? 'bg-[#10B981]/10 hover:bg-[#10B981]/20 border-l-4 border-[#10B981]' : 'hover:bg-white/5'
            }`}>
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.is_me ? 'bg-[#10B981] text-[#121212]' : 'bg-white/10 text-white'
                }`}>
                {item.rank_position}
              </span>
            </div>
            <div>
              <p className={item.is_me ? 'font-semibold text-[#10B981]' : 'text-white'}>{item.display_name}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${item.is_me ? 'text-[#10B981]' : 'text-white'}`}>{item.points}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface LeagueRankingSectionProps {
  leagueId: string;
  onPlayerClick: (userId: string) => void;
}

export const LeagueRankingSection: React.FC<LeagueRankingSectionProps> = ({ leagueId, onPlayerClick }) => {
  const {
    data: ranking,
    isLoading: rankingLoading,
    error: rankingError,
    refetch: refetchRanking,
  } = useLeagueRanking(leagueId);

  const { data: hasPoints } = useLeaguePointsExistence(leagueId);
  const myStanding = ranking?.find((item) => item.is_me);

  return (
    <div className="space-y-4">
      {/* Your Position Card */}
      {hasPoints && ranking && ranking.length > 0 && (
        <div className="mb-6">
          {myStanding && (
            <div className="bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/40 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#10B981]">{myStanding?.rank_position}º</span>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Sua Posição</p>
                  <p className="text-lg font-semibold text-[#10B981]">{myStanding?.points} pontos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">de {ranking.length} jogadores</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {rankingLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-white/5 border border-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {rankingError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-between">
          <div className="text-red-400">
            <p className="font-medium">Erro ao carregar ranking</p>
            <p className="text-sm text-red-300">Tente novamente mais tarde</p>
          </div>
          <button
            onClick={() => refetchRanking()}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 px-3 py-2 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Ranking Table */}
      {hasPoints && !rankingLoading && !rankingError && ranking && ranking.length > 0 && (
        <RankingTable ranking={ranking} onPlayerClick={onPlayerClick} />
      )}

      {!hasPoints && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <p className="text-slate-400">Nenhum ranking disponível ainda</p>
        </div>
      )}
    </div>
  );
};
