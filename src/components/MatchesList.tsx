import React, { useState } from 'react';
import { Match, upsertPrediction } from '../lib/rpc/leagues';
import { MatchCard } from './MatchCard';
import { useToast } from '../contexts/ToastContext';

interface MatchesListProps {
  leagueId: string;
  matches: Match[];
  loading: boolean;
  error: string | null;
  onPredictionSaved: () => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({ leagueId, matches, loading, error, onPredictionSaved }) => {
  const { addToast } = useToast();
  const [updatedMatches, setUpdatedMatches] = useState<Record<string, Match>>({});

  const handleSavePrediction = async (matchId: string, homePred: number, awayPred: number) => {
    try {
      await upsertPrediction(leagueId, matchId, homePred, awayPred);
      addToast('Palpite salvo com sucesso!', 'success');
    } catch (err) {
      addToast('Erro ao salvar palpite', 'error');
      throw err;
    }
  };

  const handlePredictionUpdate = (matchId: string, homePred: number, awayPred: number) => {
    // Update local state to reflect the saved prediction
    const matchToUpdate = matches.find((m) => m.match_id === matchId);
    if (matchToUpdate) {
      setUpdatedMatches((prev) => ({
        ...prev,
        [matchId]: {
          ...matchToUpdate,
          my_home_pred: homePred,
          my_away_pred: awayPred,
          my_prediction_updated_at: new Date().toISOString(),
        },
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Carregando jogos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
        Erro ao carregar jogos: {error}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Nenhum jogo nesta rodada</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {matches.map((match) => {
        const displayMatch = updatedMatches[match.match_id] || match;
        return (
          <MatchCard
            key={match.match_id}
            match={displayMatch}
            onSavePrediction={(home, away) => handleSavePrediction(match.match_id, home, away)}
            onPredictionUpdate={handlePredictionUpdate}
          />
        );
      })}
    </div>
  );
};
