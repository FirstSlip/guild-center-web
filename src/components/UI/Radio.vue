<template>
  <button class="radio" @click="model = !model">
    <div
      v-if="$slots['before-text']"
      :class="['before-text', font]"
    >
      <slot name="before-text"></slot>
    </div>
    <div class="switch">
      <div :class="['switcher', model && 'active']"></div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { FontType } from '@/ts/FontType';

const props = defineProps<{
  fontType?: FontType;
}>();
defineSlots<{
  ['before-text']: [];
}>();
const model = defineModel<boolean>();

const font = computed((): FontType => props.fontType || 'p3');
</script>

<style lang="scss" scoped>
button.radio {
  display: flex;
  gap: 0.75rem;
  align-items: center;

  background: none;
  border: none;

  cursor: pointer;
  user-select: none;

  .switch {
    position: relative;
    width: 2rem;
    height: 1rem;
    padding: 1px;
    background-color: $light-gray;

    border-radius: 1.875rem;

    .switcher {
      position: absolute;
      top: 1px;
      left: 1px;
      height: calc(100% - 2px);
      aspect-ratio: 1 / 1;
      background-color: $white;
      border-radius: 100%;

      transition: all 0.3s ease;

      &.active {
        left: calc(2rem - 15px);
      }
    }
  }
}
</style>
