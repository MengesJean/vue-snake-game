<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md text-center"
    >
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Game Over!
      </h2>
      <p class="mb-6 text-xl text-gray-700 dark:text-gray-300">
        Your Score: {{ score }}
      </p>
      <div class="mb-6 text-left">
        <label
          for="playerName"
          class="block mb-2 font-medium text-gray-700 dark:text-gray-300"
        >
          Enter your name:
        </label>
        <input
          id="playerName"
          v-model="playerName"
          type="text"
          placeholder="Your name"
          @keyup.enter="submit"
          class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <button
        class="game-button"
        @click="submit"
        :disabled="!playerName.trim()"
      >
        Submit Score
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  show: boolean;
  score: number;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "submit", name: string): void;
}>();

const playerName = ref("");

const submit = () => {
  if (playerName.value.trim()) {
    emit("submit", playerName.value.trim());
    playerName.value = "";
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h2 {
  color: var(--text-primary);
  margin-bottom: 16px;
}

.score-text {
  color: var(--text-primary);
  font-size: 20px;
  margin-bottom: 24px;
}

.input-group {
  margin-bottom: 24px;
  text-align: left;
}

label {
  display: block;
  color: var(--text-primary);
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--text-secondary);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 16px;
}

.submit-button {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: var(--button-hover);
}

.submit-button:disabled {
  background: var(--button-disabled);
  cursor: not-allowed;
}
</style>
