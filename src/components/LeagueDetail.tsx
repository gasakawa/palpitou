import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      navigator.clipboard.writeText(leagueDetails.join_code);
      setCopiedCode(leagueDetails.join_code);
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

        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
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
      </div>
    </div>
  );
};
