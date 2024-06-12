<template>
  <div class="emoji-selector">
    <button
      v-for="(emoji, index) in emojisArray"
      :key="index"
      class="emoji h3"
      @click="$emit('select', emoji)"
    >
      {{ emoji }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { emojisArray } from '@/common/data/emojisArray';
defineEmits<{
  (e: 'select', emoji: string): void;
}>();
</script>

<style lang="scss" scoped>
.emoji-selector {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  background-color: $light-purple;
  border-radius: 0.5rem;

  button.emoji {
    background: none;
    border: none;
    cursor: pointer;

    user-select: none;
  }
}
</style>
