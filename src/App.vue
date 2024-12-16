<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
    <button 
      class="fixed top-5 right-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-hover transition-all duration-200 hover:scale-110"
      @click="toggleDarkMode"
    >
      {{ isDark ? '🌞' : '🌙' }}
    </button>

    <div class="flex justify-between items-center mb-6">
      <div class="text-2xl font-semibold text-gray-900 dark:text-white">Score: {{ score }}</div>
      <button 
        class="game-button"
        @click="showLeaderboard = true"
      >
        📊 Leaderboard
      </button>
    </div>
    
    <GameBoard
      :board-size="boardSize"
      :snake="snake"
      :food="food ?? 0"
      class="mb-6"
    />
    
    <div v-if="gameOver" class="text-3xl font-bold text-food text-center mt-6">Game Over!</div>
    
    <GameSettings
      v-if="!gameStarted"
      :selected-board-size="selectedBoardSize"
      :selected-difficulty="selectedDifficulty"
      @select-board-size="selectBoardSize"
      @select-difficulty="selectDifficulty"
      class="mt-6"
    />

    <button 
      class="game-button w-40 mx-auto mt-6 block"
      @click="startGame" 
      :disabled="!selectedDifficulty || !selectedBoardSize"
    >
      {{ gameOver ? 'Play Again' : 'Start Game' }}
    </button>

    <NameInputModal
      :show="showNameInput"
      :score="score"
      @submit="handleScoreSubmit"
    />

    <Leaderboard
      :entries="leaderboardEntries"
      :is-open="showLeaderboard"
      @close="showLeaderboard = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import GameBoard from './components/GameBoard.vue';
import GameSettings from './components/GameSettings.vue';
import NameInputModal from './components/NameInputModal.vue';
import Leaderboard from './components/Leaderboard.vue';
import { useGame } from './composables/useGame';
import { useDarkMode } from './composables/useDarkMode';
import { saveLeaderboardEntry, getLeaderboard} from './utils/leaderboard';
import type { LeaderboardEntry } from './types/leaderboard';

const {
  boardSize,
  snake,
  food,
  gameOver,
  score,
  selectedDifficulty,
  selectedBoardSize,
  gameStarted,
  startGame,
  selectDifficulty,
  selectBoardSize
} = useGame();

const { isDark, toggleDarkMode } = useDarkMode();

const showNameInput = ref(false);
const showLeaderboard = ref(false);
const leaderboardEntries = ref<LeaderboardEntry[]>([]);

onMounted(async () => {
  leaderboardEntries.value = getLeaderboard();
  try {
    const response = await fetch('/api/leaderboard');
    if (response.ok) {
      const data = await response.json();
      leaderboardEntries.value = data;
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
});

watch(gameOver, (newValue) => {
  if (newValue && score.value > 0) {
    showNameInput.value = true;
  }
});

const handleScoreSubmit = async (name: string) => {
  const entry: LeaderboardEntry = {
    name,
    score: score.value,
    difficulty: selectedDifficulty.value?.name || 'Unknown',
    boardSize: selectedBoardSize.value?.name || 'Unknown',
    date: new Date().toISOString()
  };

  await saveLeaderboardEntry(entry);
  leaderboardEntries.value.push(entry);
  showNameInput.value = false;
};
</script>