import type { LeaderboardEntry } from '../types/leaderboard';

const API_URL = 'http://localhost:3000/api';

export async function saveLeaderboardEntry(entry: LeaderboardEntry): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to save score');
    }
  } catch (error) {
    console.error('Error saving score:', error);
    throw new Error('Failed to save score');
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw new Error('Failed to fetch leaderboard');
  }
} 