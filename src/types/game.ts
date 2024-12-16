export interface Direction {
  x: number;
  y: number;
}

export interface Difficulty {
  name: string;
  speed: number;
  scoreMultiplier: number;
}

export interface BoardSize {
  name: string;
  size: number;
}

export type DirectionMap = {
  [key: string]: Direction;
}; 