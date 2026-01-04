import { useQuery } from '@tanstack/react-query';
import { fetchLeaguePoints, fetchLeagueRanking } from '../lib/rpc/leagues';
import type { LeagueRankingItem } from '../types/types';

export const useLeagueRanking = (leagueId: string | undefined) => {
  return useQuery({
    queryKey: ['league', leagueId, 'ranking'],
    queryFn: async (): Promise<LeagueRankingItem[]> => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }
      return fetchLeagueRanking(leagueId);
    },
    staleTime: 30_000, // 30 seconds
    enabled: !!leagueId, // Only run query if leagueId exists
  });
};

export const useLeaguePointsExistence = (leagueId: string | undefined) => {
  return useQuery({
    queryKey: ['league', leagueId, 'pointsExistence'],
    queryFn: async (): Promise<boolean> => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }

      return fetchLeaguePoints(leagueId);
    },
  });
};
