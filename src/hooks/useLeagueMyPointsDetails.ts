import { useQuery } from '@tanstack/react-query';
import { fetchLeagueMyPointsDetails, MyPointsGameDetail } from '../lib/rpc/leagues';

export const useLeagueMyPointsDetails = (leagueId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['league', leagueId, 'my_points_details'],
    queryFn: async (): Promise<MyPointsGameDetail[]> => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }
      return fetchLeagueMyPointsDetails(leagueId);
    },
    staleTime: 30_000, // 30 seconds
    enabled: enabled && !!leagueId, // Only run query if enabled and leagueId exists
  });
};
