import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

interface Championship {
  id: string;
  name: string;
  created_at: string;
}

const fetchChampionships = async (): Promise<Championship[]> => {
  const { data, error } = await supabase
    .from('championships')
    .select('id, name, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const useChampionships = () => {
  return useQuery({
    queryKey: ['championships'],
    queryFn: fetchChampionships,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};
