import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

interface LeagueListItem {
  league_id: string;
  league_name: string;
  join_code: string;
  championship_name: string;
  role: string;
  created_at: string;
}

const fetchLeaguesList = async (): Promise<LeagueListItem[]> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error('User not authenticated');

  const { data, error } = await supabase.from('league_members').select('league_id, role').eq('user_id', user.id);

  if (error) throw error;

  if (!data || data.length === 0) return [];

  const leagueIds = data.map((lm) => lm.league_id);

  const { data: leagues, error: leaguesError } = await supabase
    .from('leagues')
    .select('id, name, join_code, championship_id, created_at')
    .in('id', leagueIds)
    .order('created_at', { ascending: false });

  if (leaguesError) throw leaguesError;
  const { data: championships, error: championshipsError } = await supabase.from('championships').select('id, name');

  if (championshipsError) throw championshipsError;

  const championshipMap = new Map<string, string>(
    (championships || []).map((championship) => [championship.id, championship.name]),
  );

  const roleMap = new Map<string, string>(data.map((membership) => [membership.league_id, membership.role]));

  return (leagues || []).map((league) => ({
    league_id: league.id,
    league_name: league.name,
    join_code: league.join_code,
    championship_name: championshipMap.get(league.championship_id) ?? 'Campeonato',
    role: roleMap.get(league.id) ?? 'Participante',
    created_at: league.created_at,
  }));
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
