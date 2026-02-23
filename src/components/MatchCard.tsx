import React, { useState, useEffect } from 'react';
import { Match } from '../lib/rpc/leagues';
import { Clock } from 'lucide-react';
import { MatchPredictionsPanel } from './MatchPredictionsPanel';

interface MatchCardProps {
  match: Match;
  onSavePrediction: (homePred: number, awayPred: number) => Promise<void>;
  onPredictionUpdate?: (matchId: string, homePred: number, awayPred: number) => void;
  leagueId: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSavePrediction, onPredictionUpdate, leagueId }) => {
  const [homePred, setHomePred] = useState<string>(match.my_home_pred?.toString() || '');
  const [awayPred, setAwayPred] = useState<string>(match.my_away_pred?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');

  const isMatchStarted = (match.starts_at && new Date(match.starts_at) <= new Date()) || match.status === 'finished';
  const isMatchFinished = match.status === 'finished';
  const hasRealScore = isMatchFinished && match.home_score !== null && match.away_score !== null;

  // Countdown timer
  useEffect(() => {
    if (isMatchStarted || !match.starts_at) return;

    const updateCountdown = () => {
      const now = new Date();
      const matchStart = new Date(match.starts_at);
      const diff = matchStart.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Prazo encerrado');
        return;
      }

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

  const getButtonTitle = (): string => {
    if (isMatchFinished) return 'Jogo finalizado';
    if (isMatchStarted) return 'Jogo iniciado';
    return '';
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
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col items-center flex-1">
              {match.home_team_image_url && (
                <img src={match.home_team_image_url} alt={match.home_team} className="w-8 h-8 mb-1 object-contain" />
              )}
              <span className="text-xs text-center">{match.home_team}</span>
            </div>
            <span className="text-slate-400 text-xs">vs</span>
            <div className="flex flex-col items-center flex-1">
              {match.away_team_image_url && (
                <img src={match.away_team_image_url} alt={match.away_team} className="w-8 h-8 mb-1 object-contain" />
              )}
              <span className="text-xs text-center">{match.away_team}</span>
            </div>
          </div>
        </div>
        <div className="flex text-xs items-center justify-center pb-3">{match.venue_name}</div>

        {/* Predictions Inputs */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <input
              type="number"
              value={homePred}
              onChange={(e) => setHomePred(e.target.value)}
              disabled={loading || isMatchStarted}
              min="0"
              max="99"
              className={`w-full px-2 py-1 rounded bg-white/5 border text-white text-center text-sm focus:outline-none ${
                isMatchStarted
                  ? 'border-slate-600 text-slate-400 cursor-not-allowed'
                  : 'border-white/10 focus:border-emerald-500/50 disabled:opacity-50'
              }`}
              placeholder="0"
            />
          </div>
          <div>
            <input
              type="number"
              value={awayPred}
              onChange={(e) => setAwayPred(e.target.value)}
              disabled={loading || isMatchStarted}
              min="0"
              max="99"
              className={`w-full px-2 py-1 rounded bg-white/5 border text-white text-center text-sm focus:outline-none ${
                isMatchStarted
                  ? 'border-slate-600 text-slate-400 cursor-not-allowed'
                  : 'border-white/10 focus:border-emerald-500/50 disabled:opacity-50'
              }`}
              placeholder="0"
            />
          </div>
        </div>

        {/* Match Start DateTime */}
        <div className="text-xs text-center text-slate-400 mb-2">
          {match.starts_at ? formatDate(match.starts_at) : 'Sem data definida'}
        </div>

        {/* Saved Prediction */}
        {match.my_home_pred !== null && match.my_away_pred !== null && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 mb-2">
            <div className="text-xs text-emerald-400 font-medium text-center mb-1">Seu palpite</div>
            <div className="text-white font-semibold text-center text-sm">
              {match.my_home_pred} <span className="text-slate-400">-</span> {match.my_away_pred}
            </div>
          </div>
        )}

        {/* No Prediction Message */}
        {!isMatchStarted && match.my_home_pred === null && match.my_away_pred === null && (
          <div className="text-xs text-center text-emerald-600 italic mt-2 mb-2">Jogo sem palpite informado</div>
        )}
        {/* No Prediction and match already started */}
        {isMatchStarted && match.my_home_pred === null && match.my_away_pred === null && (
          <div className="text-xs text-center text-emerald-600 italic mt-2 mb-2">
            Que pena, a prazo de palpitar acabou!
          </div>
        )}
      </div>

      {/* Match Time and Countdown */}
      {!isMatchStarted && match.starts_at && countdown && (
        <div className="text-xs mb-3">
          <div className="flex items-center gap-1 text-emerald-400">
            <Clock className="w-3 h-3" />
            <span>
              Prazo para palpitar: <strong>{countdown}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Match Result */}
      {isMatchStarted && hasRealScore && (
        <div className="bg-white/5 rounded-lg p-2 text-center text-xs mb-3">
          <div className="text-white">
            <div className="text-sm font-bold">
              {match.home_score} <span className="text-slate-400">-</span> {match.away_score}
            </div>
            <div className="text-xs text-slate-400">Placar final</div>
          </div>
        </div>
      )}

      {/* Save Button and Error Messages */}
      <div className="space-y-2">
        {error && <div className="text-xs text-red-400 text-center">{error}</div>}
        <button
          onClick={handleSave}
          disabled={loading || isMatchStarted}
          title={getButtonTitle()}
          className={`w-full px-2 py-1 text-white text-xs font-medium rounded transition-colors ${
            isMatchStarted
              ? 'bg-slate-500 cursor-not-allowed opacity-50'
              : 'bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50'
          }`}>
          {isMatchFinished ? 'Jogo finalizado' : isMatchStarted ? 'Jogo iniciado' : loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
      <div className="mt-4">
        <MatchPredictionsPanel leagueId={leagueId} matchId={match.match_id} startsAt={match.starts_at} />
      </div>
    </div>
  );
};
