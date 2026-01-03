import { useQuery } from '@tanstack/react-query';
import { fetchMatchPredictions } from '../lib/rpc/leagues';
import type { MatchPrediction } from '../types/types';

export const useMatchPredictions = (leagueId: string, matchId: string, enabled: boolean) => {
  return useQuery<MatchPrediction[]>({
    queryKey: ['matchPredictions', leagueId, matchId],
    queryFn: () => fetchMatchPredictions(leagueId, matchId),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    enabled: enabled && Boolean(leagueId) && Boolean(matchId),
  });
};
