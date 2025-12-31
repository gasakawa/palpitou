import { useQuery } from '@tanstack/react-query';
import { fetchLeaguePlayersPointsDetails, PlayerPointsDetail } from '../lib/rpc/leagues';

export const useLeaguePlayersPointsDetails = (leagueId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['league', leagueId, 'players_points_details'],
    queryFn: async (): Promise<PlayerPointsDetail[]> => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }
      return fetchLeaguePlayersPointsDetails(leagueId);
    },
    staleTime: 60_000, // 60 seconds
    enabled: enabled && !!leagueId, // Only run query if enabled and leagueId exists
  });
};
