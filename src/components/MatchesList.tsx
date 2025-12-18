import React from 'react';
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

  const handleSavePrediction = async (matchId: string, homePred: number, awayPred: number) => {
    try {
      await upsertPrediction(leagueId, matchId, homePred, awayPred);
      addToast('Palpite salvo com sucesso!', 'success');
      onPredictionSaved();
    } catch (err) {
      addToast('Erro ao salvar palpite', 'error');
      throw err;
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
      {matches.map((match) => (
        <MatchCard
          key={match.match_id}
          match={match}
          onSavePrediction={(home, away) => handleSavePrediction(match.match_id, home, away)}
        />
      ))}
    </div>
  );
};
