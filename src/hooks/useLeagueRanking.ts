import { useQuery } from '@tanstack/react-query';
import { fetchLeagueRanking, LeagueRankingItem } from '../lib/rpc/leagues';

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
