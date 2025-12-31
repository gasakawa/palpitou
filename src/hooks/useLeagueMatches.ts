import { useQuery } from '@tanstack/react-query';
import { fetchLeagueMatches } from '../lib/rpc/leagues';

export const useLeagueMatches = (leagueId: string, round?: string) => {
  return useQuery({
    queryKey: ['leagueMatches', leagueId, round],
    queryFn: () => fetchLeagueMatches(leagueId, round),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!leagueId,
  });
};
