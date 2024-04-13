<template>
  <button
    :class="['tab h5', active && 'active']"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  active?: boolean;
}>();
defineEmits(['click']);
</script>

<style lang="scss" scoped>
button.tab {
  border: none;
  border-bottom: 2px solid;
  border-bottom-color: transparent;
  padding: 0rem 1.25rem;
  color: $text-white;

  background: none;

  cursor: pointer;
  transition: all 3s ease;

  &.active {
    border-color: $text-white;
    border-bottom-color: $text-white;
  }
}
</style>
