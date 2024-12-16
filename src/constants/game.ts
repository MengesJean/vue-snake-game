import type { Difficulty, BoardSize, DirectionMap } from '../types/game';

export const DIRECTIONS: DirectionMap = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;

export const DIFFICULTIES: Difficulty[] = [
  { name: 'Easy', speed: 200, scoreMultiplier: 1 },
  { name: 'Medium', speed: 150, scoreMultiplier: 1.5 },
  { name: 'Hard', speed: 100, scoreMultiplier: 2 },
  { name: 'Expert', speed: 70, scoreMultiplier: 3 }
] as const;

export const BOARD_SIZES: BoardSize[] = [
  { name: 'Small', size: 10 },
  { name: 'Medium', size: 20 },
  { name: 'Large', size: 25 }
] as const; 