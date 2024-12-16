export interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: string;
  boardSize: string;
  date: string;
}

export interface LeaderboardState {
  entries: LeaderboardEntry[];
  isOpen: boolean;
} 