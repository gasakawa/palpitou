import React, { useState } from 'react';
import { Match } from '../lib/rpc/leagues';
import { Clock, Check } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onSavePrediction: (homePred: number, awayPred: number) => Promise<void>;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSavePrediction }) => {
  const [homePred, setHomePred] = useState<string>(match.my_home_pred?.toString() || '');
  const [awayPred, setAwayPred] = useState<string>(match.my_away_pred?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isMatchStarted = new Date(match.starts_at) <= new Date() || match.status === 'finished';
  const hasRealScore = match.home_score !== null && match.away_score !== null;

  const validatePrediction = (value: string): boolean => {
    if (value === '') return true;
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 99;
  };

  const handleSave = async () => {
    if (!validatePrediction(homePred) || !validatePrediction(awayPred)) {
      setError('Valores devem estar entre 0 e 99');
      return;
    }

    if (homePred === '' || awayPred === '') {
      setError('Preencha ambos os campos');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await onSavePrediction(parseInt(homePred, 10), parseInt(awayPred, 10));
    } catch (err) {
      setError('Erro ao salvar palpite');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="text-white font-semibold flex items-center gap-1 mb-1">
            <span>{match.home_team}</span>
            <span className="text-slate-400 mx-2">vs</span>
            <span>{match.away_team}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {formatDate(match.starts_at)}
          </div>
        </div>
        {match.status === 'finished' && (
          <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded text-xs text-emerald-400">
            <Check className="w-3 h-3" />
            Finalizado
          </div>
        )}
      </div>

      {isMatchStarted ? (
        <div className="bg-white/5 rounded-lg p-3 text-center">
          {hasRealScore ? (
            <div className="text-white">
              <div className="text-2xl font-bold">
                {match.home_score} <span className="text-slate-400">-</span> {match.away_score}
              </div>
              <div className="text-xs text-slate-400 mt-1">Placar final</div>
            </div>
          ) : null}
          {match.my_home_pred !== null && match.my_away_pred !== null && (
            <div className="text-xs text-slate-400 mt-2">
              Seu palpite:{' '}
              <span className="text-emerald-400 font-semibold">
                {match.my_home_pred} - {match.my_away_pred}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-slate-400 block mb-1">Palpite - {match.home_team}</label>
              <input
                type="number"
                value={homePred}
                onChange={(e) => setHomePred(e.target.value)}
                disabled={loading}
                min="0"
                max="99"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-center focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-400 block mb-1">Palpite - {match.away_team}</label>
              <input
                type="number"
                value={awayPred}
                onChange={(e) => setAwayPred(e.target.value)}
                disabled={loading}
                min="0"
                max="99"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-center focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="0"
              />
            </div>
          </div>

          {error && <div className="text-xs text-red-400">{error}</div>}

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Salvando...' : 'Salvar palpite'}
          </button>
        </div>
      )}
    </div>
  );
};
