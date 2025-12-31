import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

interface LeagueListItem {
  id: string;
  name: string;
  join_code: string;
  championship_id: string;
  created_at: string;
}

const fetchLeaguesList = async (): Promise<LeagueListItem[]> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error('User not authenticated');

  const { data, error } = await supabase.from('league_members').select('league_id').eq('user_id', user.id);

  if (error) throw error;

  if (!data || data.length === 0) return [];

  const leagueIds = data.map((lm) => lm.league_id);

  const { data: leagues, error: leaguesError } = await supabase
    .from('leagues')
    .select('id, name, join_code, championship_id, created_at')
    .in('id', leagueIds)
    .order('created_at', { ascending: false });

  if (leaguesError) throw leaguesError;
  return leagues || [];
};

export const useLeaguesList = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeaguesList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};
