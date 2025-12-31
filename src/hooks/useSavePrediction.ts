import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertPrediction } from '../lib/rpc/leagues';

export const useSavePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leagueId,
      matchId,
      homePred,
      awayPred,
    }: {
      leagueId: string;
      matchId: string;
      homePred: number;
      awayPred: number;
    }) => upsertPrediction(leagueId, matchId, homePred, awayPred),

    onSuccess: (_, { leagueId }) => {
      // Invalidate all match queries for this league to sync UI
      queryClient.invalidateQueries({
        queryKey: ['leagueMatches', leagueId],
      });

      // Also invalidate ranking and my points since they depend on predictions
      queryClient.invalidateQueries({
        queryKey: ['league', leagueId, 'ranking'],
      });
      queryClient.invalidateQueries({
        queryKey: ['league', leagueId, 'my_points_details'],
      });
    },
  });
};
