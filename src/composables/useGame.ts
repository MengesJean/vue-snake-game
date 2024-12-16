import { ref, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { DIRECTIONS } from '../constants/game';
import type { Direction, Difficulty, BoardSize } from '../types/game';

interface GameState {
  boardSize: Ref<number>;
  snake: Ref<number[]>;
  direction: Ref<Direction>;
  food: Ref<number | null>;
  gameOver: Ref<boolean>;
  score: Ref<number>;
  selectedDifficulty: Ref<Difficulty | null>;
  selectedBoardSize: Ref<BoardSize | null>;
  gameStarted: Ref<boolean>;
  startGame: () => void;
  selectDifficulty: (difficulty: Difficulty) => void;
  selectBoardSize: (size: BoardSize) => void;
}

export function useGame(): GameState {
  const boardSize = ref<number>(20);
  const snake = ref<number[]>([]);
  const direction = ref<Direction>(DIRECTIONS.RIGHT);
  const food = ref<number | null>(null);
  const gameOver = ref<boolean>(false);
  const score = ref<number>(0);
  const gameInterval = ref<number | null>(null);
  const selectedDifficulty = ref<Difficulty | null>(null);
  const selectedBoardSize = ref<BoardSize | null>(null);
  const gameStarted = ref<boolean>(false);

  const getIndex = (x: number, y: number): number => y * boardSize.value + x;

  const getInitialSnakePosition = (size: number): number[] => {
    const middle = Math.floor(size / 2);
    return [
      getIndex(middle, middle),
      getIndex(middle - 1, middle),
      getIndex(middle - 2, middle),
    ];
  };

  const generateFood = (): void => {
    const totalCells = boardSize.value * boardSize.value;
    do {
      food.value = Math.floor(Math.random() * totalCells);
    } while (snake.value.includes(food.value));
  };

  const endGame = (): void => {
    gameOver.value = true;
    gameStarted.value = false;
    if (gameInterval.value !== null) {
      clearInterval(gameInterval.value);
      gameInterval.value = null;
    }
  };

  const gameLoop = (): void => {
    const head = snake.value[0];
    const row = Math.floor(head / boardSize.value);
    const col = head % boardSize.value;
    
    const newRow = row + direction.value.y;
    const newCol = col + direction.value.x;
    
    if (
      newRow < 0 ||
      newRow >= boardSize.value ||
      newCol < 0 ||
      newCol >= boardSize.value ||
      snake.value.includes(getIndex(newCol, newRow))
    ) {
      endGame();
      return;
    }
    
    const newHead = getIndex(newCol, newRow);
    snake.value.unshift(newHead);
    
    if (newHead === food.value && selectedDifficulty.value) {
      score.value += Math.round(10 * selectedDifficulty.value.scoreMultiplier);
      generateFood();
    } else {
      snake.value.pop();
    }
  };

  const startGame = (): void => {
    if (!selectedDifficulty.value || !selectedBoardSize.value) return;
    
    gameStarted.value = true;
    snake.value = getInitialSnakePosition(boardSize.value);
    direction.value = DIRECTIONS.RIGHT;
    gameOver.value = false;
    score.value = 0;
    generateFood();
    
    if (gameInterval.value !== null) {
      clearInterval(gameInterval.value);
    }
    
    gameInterval.value = window.setInterval(
      gameLoop, 
      selectedDifficulty.value.speed
    );
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    const keyMap: { [key: string]: () => void } = {
      ArrowUp: () => {
        if (direction.value !== DIRECTIONS.DOWN) {
          direction.value = DIRECTIONS.UP;
        }
      },
      ArrowDown: () => {
        if (direction.value !== DIRECTIONS.UP) {
          direction.value = DIRECTIONS.DOWN;
        }
      },
      ArrowLeft: () => {
        if (direction.value !== DIRECTIONS.RIGHT) {
          direction.value = DIRECTIONS.LEFT;
        }
      },
      ArrowRight: () => {
        if (direction.value !== DIRECTIONS.LEFT) {
          direction.value = DIRECTIONS.RIGHT;
        }
      },
    };
    
    const handler = keyMap[event.key];
    if (handler) {
      handler();
    }
  };

  const selectDifficulty = (difficulty: Difficulty): void => {
    selectedDifficulty.value = difficulty;
  };

  const selectBoardSize = (size: BoardSize): void => {
    selectedBoardSize.value = size;
    boardSize.value = size.size;
  };

  // Setup event listeners
  window.addEventListener('keydown', handleKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
    if (gameInterval.value !== null) {
      clearInterval(gameInterval.value);
    }
  });

  return {
    boardSize,
    snake,
    direction,
    food,
    gameOver,
    score,
    selectedDifficulty,
    selectedBoardSize,
    gameStarted,
    startGame,
    selectDifficulty,
    selectBoardSize
  };
} 