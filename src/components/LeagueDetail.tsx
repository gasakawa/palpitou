import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
import {
  fetchLeagueMatches,
  extractRounds,
  selectDefaultRound,
  Match,
  fetchLeagueDetails,
  LeagueDetails,
} from '../lib/rpc/leagues';
import { RoundBadges } from './RoundBadges';
import { MatchesList } from './MatchesList';
import { LeagueDetailHeader } from './LeagueDetailHeader';
import { useToast } from '../contexts/ToastContext';
import { useLeagueRanking } from '../hooks/useLeagueRanking';

export const LeagueDetail: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();

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

  // Fetch ranking data using hook
  const {
    data: ranking,
    isLoading: rankingLoading,
    error: rankingError,
    refetch: refetchRanking,
  } = useLeagueRanking(leagueId);

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
                        <div
                          key={item.user_id}
                          className={`grid grid-cols-3 gap-4 p-4 transition-colors ${
                            item.is_me ? 'bg-[#10B981]/15 border-l-2 border-l-[#10B981]' : 'hover:bg-white/5'
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
                        </div>
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
                <h3 className="text-lg font-semibold text-white">Meus Pontos</h3>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="text-slate-400">
                    <p className="mb-2">⭐ Seu histórico de pontos será carregado aqui</p>
                    <p className="text-sm text-slate-500">
                      Exibindo detalhes de seus acertos, pontuação por rodada e desempenho.
                    </p>
                  </div>
                </div>
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
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
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
              <div className="p-6 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Informações da Liga</h3>
                  <div className="space-y-2 text-slate-400">
                    <p>📋 Regras e configurações da liga serão exibidas aqui</p>
                    <p className="text-sm text-slate-500">
                      Esta seção mostrará detalhes como sistema de pontuação, critérios de ranking, datas de rodadas e
                      outras informações relevantes da liga.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Histórico de Alterações</h3>
                  <div className="space-y-2 text-slate-400">
                    <p>📝 Log de mudanças será exibido aqui</p>
                    <p className="text-sm text-slate-500">
                      Histórico de alterações nas regras, participantes e configurações da liga.
                    </p>
                  </div>
                </div>
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
