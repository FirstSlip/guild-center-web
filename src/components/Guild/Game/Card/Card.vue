<template>
  <div
    :class="['game-card', selected && 'selected']"
    @click="$emit('click')"
  >
    <img
      :src="`/img/games/${gameName.replaceAll(':', '').replaceAll(' ', '_')}.png`"
      :alt="gameName"
    />
    <p class="h5">{{ gameName }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  gameName: string;
  selected: boolean;
}>();
defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style lang="scss" scoped>
.game-card {
  width: 100%;
  padding: calc(1rem + 3px) calc(0.5rem + 3px);

  display: flex;
  flex-direction: column;

  border: 1px solid $white;
  border-radius: 0.75rem;

  cursor: pointer;
  user-select: none;

  * {
    flex-shrink: 0;
  }

  img {
    margin: 0 auto 1rem;
    /* aspect-ratio: 1 / 1; */
  }

  p.h5 {
    text-align: center;
  }

  &:hover {
    background: #415167;
  }

  &.selected {
    padding: 1rem 0.5rem;
    border: 4px solid $main;
    box-shadow: 0 0 6px 0 #07c6bf;
  }
}
</style>
