import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteLeagueMember, fetchLeagueMembers } from '../lib/rpc/leagues';
import type { LeagueMember } from '../types/types';

export const useLeagueMembers = (leagueId?: string) => {
  return useQuery<LeagueMember[]>({
    queryKey: ['league', leagueId, 'members'],
    queryFn: async () => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }
      return fetchLeagueMembers(leagueId);
    },
    enabled: !!leagueId,
    staleTime: 30_000,
  });
};

export const useDeleteLeagueMember = (leagueId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (memberId: string) => {
      if (!leagueId) {
        throw new Error('League ID is required');
      }
      await deleteLeagueMember(leagueId, memberId);
    },
    onSuccess: () => {
      if (!leagueId) return;
      queryClient.invalidateQueries({ queryKey: ['league', leagueId, 'members'] });
    },
  });
};
