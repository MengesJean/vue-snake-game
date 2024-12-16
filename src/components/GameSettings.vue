<template>
  <div class="space-y-6">
    <div class="text-center">
      <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Select Board Size:
      </h3>
      <div class="flex justify-center gap-3">
        <button
          v-for="size in BOARD_SIZES"
          :key="size.name"
          @click="$emit('select-board-size', size)"
          :class="[
            'game-button min-w-[100px]',
            { 'bg-orange-500': selectedBoardSize?.name === size.name },
          ]"
        >
          {{ size.name }}
        </button>
      </div>
    </div>

    <div class="text-center">
      <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Select Difficulty:
      </h3>
      <div class="flex justify-center gap-3">
        <button
          v-for="diff in DIFFICULTIES"
          :key="diff.name"
          @click="$emit('select-difficulty', diff)"
          :class="[
            'game-button min-w-[100px]',
            { 'bg-orange-500': selectedDifficulty?.name === diff.name },
          ]"
        >
          {{ diff.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DIFFICULTIES, BOARD_SIZES } from "../constants/game";
import type { BoardSize, Difficulty } from "../types/game";

interface Props {
  selectedBoardSize: BoardSize | null;
  selectedDifficulty: Difficulty | null;
}

defineProps<Props>();
defineEmits<{
  (e: "select-board-size", size: BoardSize): void;
  (e: "select-difficulty", difficulty: Difficulty): void;
}>();
</script>
