import React, { useEffect, useState } from 'react';
import { fetchLeagueMatches, extractRounds, selectDefaultRound } from '../lib/rpc/leagues';
import { RoundBadges } from './RoundBadges';
import { MatchesList } from './MatchesList';
import { useToast } from '../contexts/ToastContext';
import type { Match } from '../types/types';

interface LeagueMatchesSectionProps {
  leagueId: string;
  onPredictionSaved?: () => void;
}

export const LeagueMatchesSection: React.FC<LeagueMatchesSectionProps> = ({ leagueId, onPredictionSaved }) => {
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [rounds, setRounds] = useState<string[]>([]);
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [roundLoading, setRoundLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (!leagueId) return;

    const loadMatches = async () => {
      try {
        setError(null);
        const matches = await fetchLeagueMatches(leagueId);
        const extractedRounds = extractRounds(matches);
        const defaultRound = selectDefaultRound(matches, extractedRounds);

        setAllMatches(matches);
        setRounds(extractedRounds);
        setSelectedRound(defaultRound);
      } catch (err) {
        setError('Erro ao carregar jogos');
        addToast('Erro ao carregar jogos', 'error');
      }
    };

    loadMatches();
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
    try {
      const matches = await fetchLeagueMatches(leagueId, selectedRound);
      setAllMatches(matches);
      onPredictionSaved?.();
    } catch (err) {
      console.error('Erro ao atualizar matches:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
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
            leagueId={leagueId}
            matches={allMatches}
            loading={false}
            error={error}
            onPredictionSaved={handlePredictionSaved}
          />
        )}
      </div>
    </div>
  );
};
