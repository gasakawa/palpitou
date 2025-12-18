import React, { useState, useEffect } from 'react';
import { Match } from '../lib/rpc/leagues';
import { Clock, Check } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onSavePrediction: (homePred: number, awayPred: number) => Promise<void>;
  onPredictionUpdate?: (matchId: string, homePred: number, awayPred: number) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSavePrediction, onPredictionUpdate }) => {
  const [homePred, setHomePred] = useState<string>(match.my_home_pred?.toString() || '');
  const [awayPred, setAwayPred] = useState<string>(match.my_away_pred?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  const isMatchStarted = new Date(match.starts_at) <= new Date() || match.status === 'finished';
  const hasRealScore = match.home_score !== null && match.away_score !== null;

  // Countdown timer
  useEffect(() => {
    if (isMatchStarted) return;

    const updateCountdown = () => {
      const now = new Date();
      const matchStart = new Date(match.starts_at);
      const diff = matchStart.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Prazo encerrado');
        setIsExpired(true);
        return;
      }

      setIsExpired(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) {
        setCountdown(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m`);
      } else {
        setCountdown(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [match.starts_at, isMatchStarted]);

  const validatePrediction = (value: string): boolean => {
    if (value === '') return true;
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 99;
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
      const home = parseInt(homePred, 10);
      const away = parseInt(awayPred, 10);
      await onSavePrediction(home, away);
      // Notify parent of successful save
      if (onPredictionUpdate) {
        onPredictionUpdate(match.match_id, home, away);
      }
    } catch (err) {
      setError('Erro ao salvar palpite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
      {/* Teams and Score */}
      <div className="mb-3">
        <div className="text-white font-semibold text-sm mb-2">
          <div className="flex justify-between items-center">
            <span>{match.home_team}</span>
            <span className="text-slate-400 text-xs">vs</span>
            <span>{match.away_team}</span>
          </div>
        </div>

        {/* Predictions Inputs */}
        {!isMatchStarted ? (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">{match.home_team}</label>
              <input
                type="number"
                value={homePred}
                onChange={(e) => setHomePred(e.target.value)}
                disabled={loading}
                min="0"
                max="99"
                className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-center text-sm focus:outline-none focus:border-emerald-500/50 disabled:opacity-50"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">{match.away_team}</label>
              <input
                type="number"
                value={awayPred}
                onChange={(e) => setAwayPred(e.target.value)}
                disabled={loading}
                min="0"
                max="99"
                className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-center text-sm focus:outline-none focus:border-emerald-500/50 disabled:opacity-50"
                placeholder="0"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Match Time and Countdown */}
      {!isMatchStarted && countdown && (
        <div className="text-xs mb-3">
          <div className={`flex items-center gap-1 ${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
            <Clock className="w-3 h-3" />
            <span>
              Prazo para palpitar: <strong>{countdown}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Match Status or Saved Prediction or Form */}
      {isMatchStarted ? (
        <div className="bg-white/5 rounded-lg p-2 text-center text-xs">
          {hasRealScore ? (
            <div className="text-white mb-1">
              <div className="text-sm font-bold">
                {match.home_score} <span className="text-slate-400">-</span> {match.away_score}
              </div>
              <div className="text-xs text-slate-400">Placar final</div>
            </div>
          ) : null}
          {match.my_home_pred !== null && match.my_away_pred !== null && (
            <div className="text-slate-400">
              Palpite:{' '}
              <span className="text-emerald-400 font-semibold">
                {match.my_home_pred} - {match.my_away_pred}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {error && <div className="text-xs text-red-400 text-center">{error}</div>}
          <button
            onClick={handleSave}
            disabled={loading || isExpired}
            title={isExpired ? 'Prazo para palpitar expirado' : ''}
            className={`w-full px-2 py-1 text-white text-xs font-medium rounded transition-colors ${
              isExpired
                ? 'bg-slate-500 cursor-not-allowed opacity-50'
                : 'bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50'
            }`}>
            {isExpired ? 'Prazo expirado' : loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      )}
    </div>
  );
};
