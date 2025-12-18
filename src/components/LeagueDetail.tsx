import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchLeagueMatches, extractRounds, selectDefaultRound, Match } from '../lib/rpc/leagues';
import { RoundBadges } from './RoundBadges';
import { MatchesList } from './MatchesList';
import { useToast } from '../contexts/ToastContext';

export const LeagueDetail: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [rounds, setRounds] = useState<string[]>([]);
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    if (!leagueId) return;

    const loadAllMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const matches = await fetchLeagueMatches(leagueId);
        const extractedRounds = extractRounds(matches);
        const defaultRound = selectDefaultRound(matches, extractedRounds);

        setAllMatches(matches);
        setRounds(extractedRounds);
        setSelectedRound(defaultRound);
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
    setRequestId((prev) => prev + 1);
  };

  const handlePredictionSaved = () => {
    setRequestId((prev) => prev + 1);
  };

  const currentMatches = allMatches.filter((m) => m.round === selectedRound);

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

        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Detalhes do Bolão</h1>
          <p className="text-slate-400">Selecione uma rodada para visualizar e fazer palpites</p>
        </div>

        {rounds.length > 0 && (
          <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-lg font-semibold mb-4">Rodadas</h2>
            <RoundBadges rounds={rounds} selectedRound={selectedRound} onSelect={handleRoundSelect} />
          </div>
        )}

        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-6">Jogos da Rodada {selectedRound}</h2>
          <MatchesList
            key={requestId}
            leagueId={leagueId || ''}
            matches={currentMatches}
            loading={false}
            error={error}
            onPredictionSaved={handlePredictionSaved}
          />
        </div>
      </div>
    </div>
  );
};
