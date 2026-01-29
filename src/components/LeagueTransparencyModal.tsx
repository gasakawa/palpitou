import React, { useState, useMemo, useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useLeaguePlayersPointsDetails } from '../hooks/useLeaguePlayersPointsDetails';
import type { PlayerPointsDetail } from '../types/types';

interface TransparencyGameCardProps {
  game: PlayerPointsDetail;
}

const TransparencyGameCard: React.FC<TransparencyGameCardProps> = ({ game }) => {
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
    <div className="border border-white/10 rounded-lg bg-white/[0.02] p-4 space-y-3">
      {/* Match Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Home Team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium text-white truncate">{game.home_team}</span>
          </div>

          {/* VS */}
          <span className="text-slate-500 flex-shrink-0">×</span>

          {/* Away Team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium text-white truncate">{game.away_team}</span>
          </div>
        </div>

        {/* Total Points */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-slate-400">Pontos</p>
          <p className="text-xl font-bold text-[#10B981]">{game.total_points}</p>
        </div>
      </div>

      {/* Match Info */}
      <div className="text-xs text-slate-500 space-y-1">
        <p>{formatDate(game.starts_at)}</p>
        {game.round && <p>Rodada {game.round}</p>}
      </div>

      {/* Prediction and Result */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Seu palpite</p>
          <p className="font-medium text-white">
            {game.home_pred} - {game.away_pred}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Resultado</p>
          <p className="font-medium text-white">
            {game.home_score} - {game.away_score}
          </p>
        </div>
      </div>

      {/* Points Breakdown */}
      <div className="pt-2 border-t border-white/10">
        <p className="text-xs text-slate-500">
          {game.exact_points > 0 && `Exato: ${game.exact_points}`}
          {game.exact_points > 0 && game.winner_points > 0 && ' | '}
          {game.winner_points > 0 && `Vencedor/Empate: ${game.winner_points}`}
          {(game.exact_points > 0 || game.winner_points > 0) && game.diff_bonus_points > 0 && ' | '}
          {game.diff_bonus_points > 0 && `Bônus: ${game.diff_bonus_points}`}
          {game.exact_points === 0 && game.winner_points === 0 && game.diff_bonus_points === 0 && 'Sem pontos'}
        </p>
      </div>
    </div>
  );
};

interface PlayerMatchPointsListProps {
  displayedGames: PlayerPointsDetail[];
  totalGames: number;
  hasMore: boolean;
  onLoadMore: () => void;
}

const PlayerMatchPointsList = React.memo<PlayerMatchPointsListProps>(
  ({ displayedGames, totalGames, hasMore, onLoadMore }) => {
    return (
      <>
        <div className="space-y-3">
          {displayedGames.map((game) => (
            <TransparencyGameCard key={game.match_id} game={game} />
          ))}
        </div>

        {hasMore && (
          <button
            onClick={onLoadMore}
            className="w-full bg-[#10B981]/10 hover:bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] font-medium py-2 rounded-lg transition-colors">
            Carregar mais ({displayedGames.length} de {totalGames})
          </button>
        )}
      </>
    );
  },
);

PlayerMatchPointsList.displayName = 'PlayerMatchPointsList';

interface LeagueTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  leagueId: string;
  initialUserId?: string | null;
  onPlayerClick?: (userId: string) => void;
}

export const LeagueTransparencyModal: React.FC<LeagueTransparencyModalProps> = ({
  isOpen,
  onClose,
  leagueId,
  initialUserId = null,
  onPlayerClick,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(initialUserId);
  const [gamesDisplayLimit, setGamesDisplayLimit] = useState(30);

  const {
    data: playersPointsDetails,
    isLoading: playersPointsLoading,
    error: playersPointsError,
    refetch: refetchPlayersPoints,
  } = useLeaguePlayersPointsDetails(leagueId, isOpen);

  // Memoized derived data
  const { players, groupedByUser } = useMemo(() => {
    if (!playersPointsDetails || playersPointsDetails.length === 0) {
      return { players: [], groupedByUser: new Map() };
    }

    const playersMap = new Map<string, { user_id: string; display_name: string; avatar_url: string | null }>();
    const grouped = new Map<string, PlayerPointsDetail[]>();

    playersPointsDetails.forEach((detail) => {
      if (!playersMap.has(detail.user_id)) {
        playersMap.set(detail.user_id, {
          user_id: detail.user_id,
          display_name: detail.display_name,
          avatar_url: detail.avatar_url,
        });
      }

      if (!grouped.has(detail.user_id)) {
        grouped.set(detail.user_id, []);
      }
      grouped.get(detail.user_id)!.push(detail);
    });

    // Sort each player's games by starts_at descending
    grouped.forEach((games) => {
      games.sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
    });

    const playersList = Array.from(playersMap.values()).sort((a, b) => a.display_name.localeCompare(b.display_name));

    return { players: playersList, groupedByUser: grouped };
  }, [playersPointsDetails]);

  // Initialize selected user on modal open or when initialUserId changes
  useEffect(() => {
    if (isOpen) {
      if (initialUserId && players.find((p) => p.user_id === initialUserId)) {
        setSelectedUserId(initialUserId);
      } else if (!selectedUserId || !players.find((p) => p.user_id === selectedUserId)) {
        setSelectedUserId(players[0]?.user_id || null);
      }
    }
  }, [isOpen, players, initialUserId]);

  // Reset games display limit when selected user changes
  useEffect(() => {
    setGamesDisplayLimit(30);
  }, [selectedUserId, isOpen]);

  // Memoized games for selected user with limit
  const selectedUserGames = useMemo(() => {
    if (!selectedUserId || !groupedByUser.has(selectedUserId)) {
      return { displayedGames: [], totalGames: 0, hasMore: false };
    }

    const allGames = groupedByUser.get(selectedUserId) || [];
    const displayedGames = allGames.slice(0, gamesDisplayLimit);
    const hasMore = allGames.length > gamesDisplayLimit;

    return { displayedGames, totalGames: allGames.length, hasMore };
  }, [selectedUserId, groupedByUser, gamesDisplayLimit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Pontuação detalhada dos jogadores</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Loading State */}
          {playersPointsLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-white/5 border border-white/10 rounded-lg animate-pulse" />
              ))}
            </div>
          )}

          {/* Error State */}
          {playersPointsError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-between">
              <div className="text-red-400">
                <p className="font-medium">Erro ao carregar transparência</p>
                <p className="text-sm text-red-300">Tente novamente mais tarde</p>
              </div>
              <button
                onClick={() => refetchPlayersPoints()}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 px-3 py-2 rounded-lg transition-colors">
                <RotateCcw className="w-4 h-4" />
                Tentar Novamente
              </button>
            </div>
          )}

          {/* Success State */}
          {!playersPointsLoading && !playersPointsError && playersPointsDetails && playersPointsDetails.length > 0 && (
            <div className="space-y-4">
              {/* Player Select */}
              <div>
                <style>
                  {`
                    select option {
                      background-color: #1a1a1a;
                      color: white;
                    }
                  `}
                </style>
                <label className="block text-sm font-medium text-slate-300 mb-2">Selecionar Jogador</label>
                <select
                  value={selectedUserId || ''}
                  onChange={(e) => {
                    setSelectedUserId(e.target.value);
                    onPlayerClick?.(e.target.value);
                  }}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 transition-colors hover:bg-white/15 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50">
                  {players.map((player) => (
                    <option key={player.user_id} value={player.user_id}>
                      {player.display_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Info: Only Finalized Games */}
              {selectedUserId && groupedByUser.has(selectedUserId) && (
                <p className="text-xs text-slate-500">Mostrando apenas jogos finalizados (pontuação calculada).</p>
              )}

              {/* Selected Player's Games */}
              {selectedUserId && groupedByUser.has(selectedUserId) && (
                <PlayerMatchPointsList
                  displayedGames={selectedUserGames.displayedGames}
                  totalGames={selectedUserGames.totalGames}
                  hasMore={selectedUserGames.hasMore}
                  onLoadMore={() => setGamesDisplayLimit((prev) => prev + 30)}
                />
              )}

              {selectedUserId && !groupedByUser.has(selectedUserId) && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                  <p className="text-slate-400">Nenhum jogo registrado para este jogador</p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!playersPointsLoading &&
            !playersPointsError &&
            (!playersPointsDetails || playersPointsDetails.length === 0) && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                <p className="text-slate-400">Nenhum dado disponível</p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-white/10 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors font-medium">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
