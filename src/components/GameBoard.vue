<template>
  <div
    class="grid gap-0.5 bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 justify-center items-center"
    :style="{
      gridTemplateColumns: `repeat(${boardSize}, 20px)`
    }"
  >
    <div
      v-for="(cell, index) in cells"
      :key="index"
      :class="{
        'cell': true,
        'snake': isSnake(index),
        'food': isFood(index),
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  boardSize: number;
  snake: number[];
  food: number;
}

const props = defineProps<Props>();

const cells = computed(() => Array(props.boardSize * props.boardSize).fill(null));

const isSnake = (index: number): boolean => props.snake.includes(index);
const isFood = (index: number): boolean => props.food === index;
</script> 