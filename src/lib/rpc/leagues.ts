import { supabase } from '../supabaseClient';

export interface Match {
  match_id: string;
  round: string;
  starts_at: string;
  home_team_id: string;
  home_team: string;
  home_team_image_url: string | null;
  away_team_id: string;
  away_team: string;
  away_team_image_url: string | null;
  home_score: number | null;
  away_score: number | null;
  status: string;
  my_home_pred: number | null;
  my_away_pred: number | null;
  my_prediction_updated_at: string | null;
  venue_name: string | null;
}

export interface LeagueDetails {
  league_id: string;
  league_name: string;
  championship_name: string;
  join_code: string;
  role: string;
  created_at: string;
  member_count?: number;
}

export interface JoinLeagueResponse {
  league_id: string;
  league_name: string;
}

export interface LeagueRankingItem {
  position: number;
  user_id: string;
  user_name: string;
  points: number;
  is_me: boolean;
}

export interface MyPointsBreakdown {
  type: string; // 'exact' | 'winner_draw' | 'bonus_diff' etc.
  points: number;
}

export interface MyPointsGameDetail {
  match_id: string;
  round?: string;
  round_number?: number;
  starts_at: string;
  home_team: string;
  away_team: string;
  home_team_image_url?: string | null;
  away_team_image_url?: string | null;
  my_home_pred: number;
  my_away_pred: number;
  home_score: number | null;
  away_score: number | null;
  status: string;
  total_points: number;
  breakdown?: MyPointsBreakdown[];
}

export const fetchLeagueMatches = async (leagueId: string, round?: string): Promise<Match[]> => {
  try {
    const { data, error } = await supabase.rpc('list_league_matches_rpc', {
      p_league_id: leagueId,
      p_round: round || null,
    });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching league matches:', err);
    throw err;
  }
};

export const upsertPrediction = async (
  leagueId: string,
  matchId: string,
  homePred: number,
  awayPred: number,
): Promise<void> => {
  try {
    const { error } = await supabase.rpc('upsert_prediction_rpc', {
      p_league_id: leagueId,
      p_match_id: matchId,
      p_home_pred: homePred,
      p_away_pred: awayPred,
    });

    if (error) throw error;
  } catch (err) {
    console.error('Error upserting prediction:', err);
    throw err;
  }
};

export const extractRounds = (matches: Match[]): string[] => {
  const rounds = Array.from(new Set(matches.map((m) => m.round))).sort((a, b) => {
    const aNum = parseInt(a, 10);
    const bNum = parseInt(b, 10);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return a.localeCompare(b);
  });
  return rounds;
};

export const selectDefaultRound = (matches: Match[], rounds: string[]): string => {
  const now = new Date();

  for (const round of rounds) {
    const roundMatches = matches.filter((m) => m.round === round);
    const hasNotStarted = roundMatches.some((m) => new Date(m.starts_at) > now && m.status !== 'finished');

    if (hasNotStarted) {
      return round;
    }
  }

  return rounds[rounds.length - 1] || '';
};

export const fetchLeagueDetails = async (leagueId: string): Promise<LeagueDetails> => {
  try {
    const { data, error } = await supabase.rpc('get_league_details_rpc', {
      p_league_id: leagueId,
    });

    if (error) throw error;
    return data && data.length > 0 ? (data[0] as LeagueDetails) : null;
  } catch (err) {
    console.error('Error fetching league details:', err);
    throw err;
  }
};

export const joinLeagueByCode = async (code: string): Promise<JoinLeagueResponse[]> => {
  try {
    const { data, error } = await supabase.rpc('join_league_by_code_rpc', {
      code,
    });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error joining league by code:', err);
    throw err;
  }
};

export const fetchLeagueRanking = async (leagueId: string): Promise<LeagueRankingItem[]> => {
  try {
    const { data, error } = await supabase.rpc('league_ranking_with_position_rpc', {
      p_league_id: leagueId,
    });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching league ranking:', err);
    throw err;
  }
};

export const fetchLeagueMyPointsDetails = async (leagueId: string): Promise<MyPointsGameDetail[]> => {
  try {
    const { data, error } = await supabase.rpc('league_my_points_details_rpc', {
      p_league_id: leagueId,
    });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching my points details:', err);
    throw err;
  }
};
