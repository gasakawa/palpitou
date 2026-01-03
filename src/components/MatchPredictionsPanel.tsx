import React, { useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { AccordionItem } from './ui/Accordion';
import { useMatchPredictions } from '../hooks/useMatchPredictions';

interface MatchPredictionsPanelProps {
  leagueId: string;
  matchId: string;
  startsAt: string;
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const MatchPredictionsPanel: React.FC<MatchPredictionsPanelProps> = ({ leagueId, matchId, startsAt }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const matchStartTimestamp = useMemo(() => new Date(startsAt).getTime(), [startsAt]);
  const hasMatchStarted = matchStartTimestamp > 0 && matchStartTimestamp <= Date.now();

  const { data: predictions, isLoading, error, refetch } = useMatchPredictions(leagueId, matchId, hasMatchStarted);

  if (!hasMatchStarted) {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
        Os palpites dos outros jogadores estarão disponíveis quando o jogo iniciar.
      </div>
    );
  }

  const visiblePredictions = predictions || [];

  return (
    <div className="mt-4 px-2 rounded-2xl border border-white/10 bg-white/5">
      <AccordionItem title="Palpites dos outros jogadores" isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
        <div className="space-y-4 text-white text-sm">
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3].map((index) => (
                <div key={index} className="h-10 w-full rounded-lg bg-white/10 animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="space-y-2 text-sm text-white">
              <p className="text-red-400">Não foi possível carregar os palpites.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="text-emerald-400 text-xs font-semibold underline">
                Tentar novamente
              </button>
            </div>
          )}

          {!isLoading && !error && visiblePredictions.length === 0 && (
            <p className="text-slate-400 text-xs">Nenhum palpite registrado ainda.</p>
          )}

          {!isLoading && !error && visiblePredictions.length > 0 && (
            <div className="space-y-3">
              {visiblePredictions.map((prediction) => (
                <div key={prediction.user_id} className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-[0.9rem]">{prediction.display_name}</span>
                      {prediction.user_id === user?.id && (
                        <span className="rounded-full border border-emerald-500/60 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.2em] text-emerald-300">
                          Você
                        </span>
                      )}
                    </div>
                    {prediction.updated_at && (
                      <p className="text-[10px] text-slate-400">
                        Atualizado em {formatTimestamp(prediction.updated_at)}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white mr-2">
                    <span>{prediction.home_pred}</span>
                    <span className="text-slate-400 px-1">x</span>
                    <span>{prediction.away_pred}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AccordionItem>
    </div>
  );
};
