<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-4xl max-h-[80vh] relative">
      <button 
        class="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        @click="$emit('close')"
      >
        ×
      </button>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Leaderboard</h2>
      <div class="overflow-auto max-h-[calc(80vh-120px)]">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Rank</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Name</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Score</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Difficulty</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Board Size</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(entry, index) in sortedEntries" 
              :key="index"
              class="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ entry.name }}</td>
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ entry.score }}</td>
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ entry.difficulty }}</td>
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ entry.boardSize }}</td>
              <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ new Date(entry.date).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LeaderboardEntry } from '../types/leaderboard';

interface Props {
  entries: LeaderboardEntry[];
  isOpen: boolean;
}

const props = defineProps<Props>();

const sortedEntries = computed(() => {
  return [...props.entries].sort((a, b) => b.score - a.score);
});

defineEmits<{
  (e: 'close'): void;
}>();
</script> 