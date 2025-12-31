import React from 'react';
import { RotateCcw, ChevronDown } from 'lucide-react';
import { useLeagueMyPointsDetails } from '../hooks/useLeagueMyPointsDetails';
import type { MyPointsGameDetail } from '../types/types';

interface MyPointsMatchCardProps {
  game: MyPointsGameDetail;
  index: number;
}

const MyPointsMatchCard: React.FC<MyPointsMatchCardProps> = ({ game, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasResult = game.home_score !== null && game.away_score !== null;
  const roundLabel = game.round || (game.round_number ? `Rodada ${game.round_number}` : '');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      {/* Card Header / Clickable Area */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between gap-4">
        <div className="flex-1">
          {/* Match Info */}
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-white">
              {game.home_team} <span className="text-slate-400">×</span> {game.away_team}
            </h4>
            {roundLabel && <span className="text-xs bg-white/10 text-slate-400 px-2 py-1 rounded">{roundLabel}</span>}
          </div>

          {/* Date */}
          <p className="text-sm text-slate-500">{formatDate(game.starts_at)}</p>

          {/* Prediction & Result */}
          <div className="mt-3 space-y-1">
            <p className="text-sm text-slate-400">
              Seu palpite:{' '}
              <span className="font-medium text-white">
                {game.my_home_pred} - {game.my_away_pred}
              </span>
            </p>
            {hasResult ? (
              <p className="text-sm text-slate-400">
                Resultado:{' '}
                <span className="font-medium text-white">
                  {game.home_score} - {game.away_score}
                </span>
              </p>
            ) : (
              <p className="text-sm text-amber-400/70">Aguardando resultado</p>
            )}
          </div>
        </div>

        {/* Points Display */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-sm text-slate-400">Pontos</p>
            <p className="text-2xl font-bold text-[#10B981]">{game.total_points}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Breakdown Details */}
      {isOpen && (
        <div className="border-t border-white/10 bg-white/5 p-4 space-y-3">
          {game.breakdown && game.breakdown.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white mb-2">Detalhamento dos Pontos:</p>
              {game.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 capitalize">
                    {item.type === 'exact'
                      ? 'Placar Exato'
                      : item.type === 'winner_draw'
                      ? 'Vencedor/Empate'
                      : item.type === 'bonus_diff'
                      ? 'Bônus Diferença'
                      : item.type}
                  </span>
                  <span className="text-white font-medium">+{item.points}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm font-semibold">
                <span className="text-white">Total</span>
                <span className="text-[#10B981]">{game.total_points}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {hasResult ? 'Sem detalhamento disponível' : 'Pontos serão exibidos após o resultado'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface LeagueMyPointsSectionProps {
  leagueId: string;
  enabled: boolean;
}

export const LeagueMyPointsSection: React.FC<LeagueMyPointsSectionProps> = ({ leagueId, enabled }) => {
  const {
    data: myPointsDetails,
    isLoading: myPointsLoading,
    error: myPointsError,
    refetch: refetchMyPoints,
  } = useLeagueMyPointsDetails(leagueId, enabled);

  return (
    <div className="space-y-4">
      {/* Loading State */}
      {myPointsLoading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 border border-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {myPointsError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-between">
          <div className="text-red-400">
            <p className="font-medium">Erro ao carregar seus pontos</p>
            <p className="text-sm text-red-300">Tente novamente mais tarde</p>
          </div>
          <button
            onClick={() => refetchMyPoints()}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 px-3 py-2 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      )}

      {/* My Points Details */}
      {!myPointsLoading && !myPointsError && myPointsDetails && myPointsDetails.length > 0 && (
        <div className="space-y-4">
          {/* Total Summary */}
          <div className="bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/40 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Total de Pontos</p>
                <p className="text-3xl font-bold text-[#10B981]">
                  {myPointsDetails.reduce((sum, game) => sum + game.total_points, 0)}
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p>{myPointsDetails.length} jogos</p>
                <p>
                  {myPointsDetails.filter((g) => g.home_score !== null && g.away_score !== null).length} finalizados
                </p>
              </div>
            </div>
          </div>

          {/* Games List */}
          <div className="space-y-3">
            {myPointsDetails.map((game, index) => (
              <MyPointsMatchCard key={game.match_id} game={game} index={index} />
            ))}
          </div>
        </div>
      )}

      {!myPointsLoading && !myPointsError && (!myPointsDetails || myPointsDetails.length === 0) && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <p className="text-slate-400">Nenhum jogo finalizado ainda</p>
        </div>
      )}
    </div>
  );
};
