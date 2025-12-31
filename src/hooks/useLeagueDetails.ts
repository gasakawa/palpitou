import { useQuery } from '@tanstack/react-query';
import { fetchLeagueDetails } from '../lib/rpc/leagues';

export const useLeagueDetails = (leagueId: string) => {
  return useQuery({
    queryKey: ['leagueDetails', leagueId],
    queryFn: () => fetchLeagueDetails(leagueId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};
