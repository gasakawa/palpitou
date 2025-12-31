import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, RotateCcw, ChevronDown } from 'lucide-react';
import {
  fetchLeagueMatches,
  extractRounds,
  selectDefaultRound,
  Match,
  fetchLeagueDetails,
  LeagueDetails,
  PlayerPointsDetail,
} from '../lib/rpc/leagues';
import { RoundBadges } from './RoundBadges';
import { MatchesList } from './MatchesList';
import { LeagueDetailHeader } from './LeagueDetailHeader';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../auth/AuthProvider';
import { useLeagueRanking } from '../hooks/useLeagueRanking';
import { useLeagueMyPointsDetails } from '../hooks/useLeagueMyPointsDetails';
import { useLeaguePlayersPointsDetails } from '../hooks/useLeaguePlayersPointsDetails';

export const LeagueDetail: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [rounds, setRounds] = useState<string[]>([]);
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [roundLoading, setRoundLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leagueDetails, setLeagueDetails] = useState<LeagueDetails | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ranking' | 'points'>('ranking');
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [gamesDisplayLimit, setGamesDisplayLimit] = useState(30);

  // Fetch ranking data using hook
  const {
    data: ranking,
    isLoading: rankingLoading,
    error: rankingError,
    refetch: refetchRanking,
  } = useLeagueRanking(leagueId);

  // Fetch my points details - only when "Meus Pontos" tab is active
  const {
    data: myPointsDetails,
    isLoading: myPointsLoading,
    error: myPointsError,
    refetch: refetchMyPoints,
  } = useLeagueMyPointsDetails(leagueId, activeTab === 'points');

  // Fetch players points details - only when transparency modal is open
  const {
    data: playersPointsDetails,
    isLoading: playersPointsLoading,
    error: playersPointsError,
    refetch: refetchPlayersPoints,
  } = useLeaguePlayersPointsDetails(leagueId, isTransparencyModalOpen);

  // Memoized derived data for transparency modal
  const { players, groupedByUser } = useMemo(() => {
    if (!playersPointsDetails || playersPointsDetails.length === 0) {
      return { players: [], groupedByUser: new Map() };
    }

    // Get unique players
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

    // Sort each player's games by starts_at descending (newest first)
    grouped.forEach((games) => {
      games.sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
    });

    // Sort players by display_name
    const playersList = Array.from(playersMap.values()).sort((a, b) => a.display_name.localeCompare(b.display_name));

    return { players: playersList, groupedByUser: grouped };
  }, [playersPointsDetails]);
  // Initialize selected user on modal open or when players change
  useEffect(() => {
    if (isTransparencyModalOpen && (!selectedUserId || !players.find((p) => p.user_id === selectedUserId))) {
      // Try to select current user first, then first player
      const currentUserPlayer = players.find((p) => p.user_id === user?.id);
      setSelectedUserId(currentUserPlayer?.user_id || players[0]?.user_id || null);
    }
  }, [isTransparencyModalOpen, players, selectedUserId, user?.id]);

  // Reset games display limit when selected user changes or modal opens
  useEffect(() => {
    setGamesDisplayLimit(30);
  }, [selectedUserId, isTransparencyModalOpen]);

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

  // Handler to open transparency modal with specific user
  const openTransparencyModal = (userId?: string) => {
    if (userId) {
      setSelectedUserId(userId);
    } else if (user?.id) {
      setSelectedUserId(user.id);
    }
    setIsTransparencyModalOpen(true);
  };

  useEffect(() => {
    if (!leagueId) return;

    const loadAllMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const [matches, details] = await Promise.all([fetchLeagueMatches(leagueId), fetchLeagueDetails(leagueId)]);
        const extractedRounds = extractRounds(matches);
        const defaultRound = selectDefaultRound(matches, extractedRounds);

        setAllMatches(matches);
        setRounds(extractedRounds);
        setSelectedRound(defaultRound);
        setLeagueDetails(details);
      } catch (err) {
        setError('Erro ao carregar bolão');
        addToast('Erro ao carregar bolão', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadAllMatches();
  }, [leagueId, addToast]);

  const handleRoundSelect = async (round: string) => {
    setSelectedRound(round);
    setRoundLoading(true);
    try {
      const matches = await fetchLeagueMatches(leagueId, round);
      setAllMatches(matches);
    } catch (err) {
      addToast('Erro ao carregar jogos da rodada', 'error');
    } finally {
      setRoundLoading(false);
    }
  };

  const handlePredictionSaved = async () => {
    // Refresh matches for current round after prediction save
    try {
      const matches = await fetchLeagueMatches(leagueId, selectedRound);
      setAllMatches(matches);
    } catch (err) {
      console.error('Erro ao atualizar matches:', err);
    }
  };

  const handleCopyCode = () => {
    if (leagueDetails) {
      const invitation = `https://palpitou.com.br/invite/${leagueDetails.join_code}`;
      navigator.clipboard.writeText(invitation);
      setCopiedCode(invitation);
      addToast('Código copiado!', 'success');
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 relative overflow-hidden w-full font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center py-20">
          <div className="animate-pulse text-slate-400">Carregando bolão...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 relative overflow-hidden w-full font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos bolões</span>
        </button>

        {leagueDetails && (
          <div className="mb-8">
            <LeagueDetailHeader league={leagueDetails} copiedCode={copiedCode} onCopyCode={handleCopyCode} />
          </div>
        )}

        <div className="mb-6">
          <RoundBadges rounds={rounds} selectedRound={selectedRound} onSelect={handleRoundSelect} />
        </div>

        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-lg font-semibold mb-6">Jogos da Rodada {selectedRound}</h2>
          {roundLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-slate-400">Carregando jogos da rodada...</div>
            </div>
          ) : (
            <MatchesList
              leagueId={leagueId || ''}
              matches={allMatches}
              loading={false}
              error={error}
              onPredictionSaved={handlePredictionSaved}
            />
          )}
        </div>

        {/* Dashboard Tabs Section */}
        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          {/* Tabs Navigation */}
          <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'ranking' ? 'text-[#10B981]' : 'text-slate-400 hover:text-white'
              }`}>
              Ranking
              {activeTab === 'ranking' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981]" />}
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'points' ? 'text-[#10B981]' : 'text-slate-400 hover:text-white'
              }`}>
              Meus Pontos
              {activeTab === 'points' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981]" />}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-64">
            {activeTab === 'ranking' && (
              <div className="space-y-4">
                {/* Your Position Card */}
                {ranking && ranking.length > 0 && (
                  <div className="mb-6">
                    {ranking.find((item) => item.is_me) && (
                      <div className="bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/40 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl font-bold text-[#10B981]">
                            {ranking.find((item) => item.is_me)?.position}º
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Sua Posição</p>
                            <p className="text-lg font-semibold text-white">
                              {ranking.find((item) => item.is_me)?.points || 0} pontos
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-[#10B981]/30 text-[#10B981] px-3 py-1 rounded-full text-xs font-medium">
                            Você
                          </span>
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
                      <p className="text-sm text-red-300">{rankingError.message || 'Tente novamente'}</p>
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
                {!rankingLoading && !rankingError && ranking && ranking.length > 0 && (
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
                          onClick={() => openTransparencyModal(item.user_id)}
                          className={`w-full grid grid-cols-3 gap-4 p-4 transition-colors text-left ${
                            item.is_me
                              ? 'bg-[#10B981]/15 border-l-2 border-l-[#10B981] hover:bg-[#10B981]/25'
                              : 'hover:bg-white/5'
                          }`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-sm font-bold text-white">
                              {item.position}
                            </div>
                            <span className="text-sm text-slate-400">#{item.position}</span>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <p className={`font-medium ${item.is_me ? 'text-[#10B981]' : 'text-white'}`}>
                                {item.user_name}
                              </p>
                              {item.is_me && <p className="text-xs text-[#10B981]">Você está aqui</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-lg ${item.is_me ? 'text-[#10B981]' : 'text-white'}`}>
                              {item.points}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!rankingLoading && !rankingError && (!ranking || ranking.length === 0) && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                    <p className="text-slate-400">Nenhum ranking disponível ainda</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'points' && (
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
                      <p className="text-sm text-red-300">{myPointsError.message || 'Tente novamente'}</p>
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
                        <span className="text-slate-400">Total de Pontos</span>
                        <span className="text-3xl font-bold text-[#10B981]">
                          {myPointsDetails.reduce((sum, game) => sum + game.total_points, 0)}
                        </span>
                      </div>
                    </div>

                    {/* Games List */}
                    <div className="space-y-3">
                      {myPointsDetails.map((game, index) => (
                        <GamePointsCard key={game.match_id} game={game} index={index} />
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
            )}
          </div>

          {/* Transparency Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setIsTransparencyModalOpen(true)}
              className="px-6 py-3 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] rounded-lg hover:bg-[#10B981]/30 transition-colors font-medium">
              Transparência da Liga
            </button>
          </div>
        </div>

        {/* Transparency Modal */}
        {isTransparencyModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Transparência da Liga</h2>
                <button
                  onClick={() => setIsTransparencyModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors">
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
                      <p className="text-sm text-red-300">{playersPointsError.message || 'Tente novamente'}</p>
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
                {!playersPointsLoading &&
                  !playersPointsError &&
                  playersPointsDetails &&
                  playersPointsDetails.length > 0 && (
                    <div className="space-y-4">
                      {/* Player Select */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Selecionar Jogador</label>
                        <select
                          value={selectedUserId || ''}
                          onChange={(e) => setSelectedUserId(e.target.value)}
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
                        <p className="text-xs text-slate-500">
                          Mostrando apenas jogos finalizados (pontuação calculada).
                        </p>
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
                      <p className="text-slate-400">Ainda não há pontuação calculada.</p>
                      <p className="text-sm text-slate-500 mt-2">Volte quando os jogos terminarem.</p>
                    </div>
                  )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-white/10 p-6 flex justify-end">
                <button
                  onClick={() => setIsTransparencyModalOpen(false)}
                  className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors font-medium">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoized component for rendering player's game list in transparency modal
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

interface GamePointsCardProps {
  game: typeof undefined extends any ? any : any;
  index: number;
}

const GamePointsCard: React.FC<GamePointsCardProps> = ({ game, index }) => {
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

  const getBreakdownLabel = (type: string, value: number): string => {
    if (type === 'exact') return `Exato: ${value}`;
    if (type === 'winner') return `Vencedor/Empate: ${value}`;
    if (type === 'diff_bonus') return `Bônus: ${value}`;
    return `${type}: ${value}`;
  };

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] p-4 space-y-3">
      {/* Match Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Home Team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {game.home_team_image_url && (
              <img
                src={game.home_team_image_url}
                alt={game.home_team}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            )}
            <span className="text-sm font-medium text-white truncate">{game.home_team}</span>
          </div>

          {/* VS */}
          <span className="text-slate-500 flex-shrink-0">×</span>

          {/* Away Team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium text-white truncate">{game.away_team}</span>
            {game.away_team_image_url && (
              <img
                src={game.away_team_image_url}
                alt={game.away_team}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            )}
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
