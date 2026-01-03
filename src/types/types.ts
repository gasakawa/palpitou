// Types and interfaces for LeagueDetail components

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

export interface MatchPrediction {
  user_id: string;
  display_name: string;
  home_pred: number;
  away_pred: number;
  updated_at: string | null;
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

export interface LeagueRankingItem {
  rank_position: number;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  points: number;
  exact_hits: number;
  winner_hits: number;
  games_count: number;
  is_me: boolean;
}

export interface MyPointsBreakdown {
  type: string;
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

export interface PlayerPointsDetail {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  match_id: string;
  starts_at: string;
  round: string;
  home_team: string;
  home_team_image_url: string | null;
  away_team: string;
  away_team_image_url: string | null;
  home_score: number;
  away_score: number;
  home_pred: number;
  away_pred: number;
  exact_points: number;
  winner_points: number;
  diff_bonus_points: number;
  total_points: number;
}

// Component Props interfaces
export interface GamePointsCardProps {
  game: MyPointsGameDetail;
  index: number;
}

export interface TransparencyGameCardProps {
  game: PlayerPointsDetail;
}

export interface PlayerMatchPointsListProps {
  displayedGames: PlayerPointsDetail[];
  totalGames: number;
  hasMore: boolean;
  onLoadMore: () => void;
}

export interface RankingTableProps {
  ranking: LeagueRankingItem[];
  onPlayerClick: (userId: string) => void;
}

export interface MyPointsMatchCardProps {
  game: MyPointsGameDetail;
  index: number;
}

export type TabType = 'ranking' | 'points';
