import React, { useState, useMemo } from 'react';
import { useLeagueMatches } from '../hooks/useLeagueMatches';
import { extractRounds, selectDefaultRound } from '../lib/rpc/leagues';
import { RoundBadges } from './RoundBadges';
import { MatchesList } from './MatchesList';
import { useToast } from '../contexts/ToastContext';
import type { Match } from '../types/types';

interface LeagueMatchesSectionProps {
  leagueId: string;
  onPredictionSaved?: () => void;
}

export const LeagueMatchesSection: React.FC<LeagueMatchesSectionProps> = ({ leagueId, onPredictionSaved }) => {
  const { addToast } = useToast();
  const [selectedRound, setSelectedRound] = useState<string>('');

  // React Query hook - fetches all matches for the league
  const { data: allMatches = [], isLoading, error } = useLeagueMatches(leagueId);

  // Compute rounds from matches
  const rounds = useMemo(() => extractRounds(allMatches), [allMatches]);

  // Set default round on first load
  React.useEffect(() => {
    if (rounds.length > 0 && !selectedRound) {
      const defaultRound = selectDefaultRound(allMatches, rounds);
      setSelectedRound(defaultRound);
    }
  }, [rounds, allMatches, selectedRound]);

  // Filter matches for selected round
  const matchesForSelectedRound: Match[] = useMemo(() => {
    if (!selectedRound || !allMatches.length) return [];
    return allMatches.filter((m) => m.round === selectedRound);
  }, [allMatches, selectedRound]);

  const handleRoundSelect = (round: string) => {
    setSelectedRound(round);
  };

  const handlePredictionSaved = () => {
    // React Query will auto-refetch due to mutation invalidation
    onPredictionSaved?.();
  };

  return (
    <div className="space-y-6">
      <div>
        <RoundBadges rounds={rounds} selectedRound={selectedRound} onSelect={handleRoundSelect} />
      </div>

      <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-lg font-semibold mb-6">Jogos da Rodada {selectedRound}</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-slate-400">Carregando jogos da rodada...</div>
          </div>
        ) : (
          <MatchesList
            leagueId={leagueId}
            matches={matchesForSelectedRound}
            loading={isLoading}
            error={error?.message || null}
            onPredictionSaved={handlePredictionSaved}
          />
        )}
      </div>
    </div>
  );
};
