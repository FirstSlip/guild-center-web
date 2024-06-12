<template>
  <button
    class="checkbox-wrapper"
    type="button"
    @click="model = !model"
  >
    <div class="checkbox">
      <transition name="check">
        <SVGCheck v-if="model" />
      </transition>
    </div>
    <div class="after-text" v-if="$slots['after-text']">
      <slot name="after-text"></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
defineSlots<{
  ['after-text']: [];
}>();

const model = defineModel<boolean>({ default: false });
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  background: none;
  border: none;

  cursor: pointer;
  user-select: none;

  .checkbox {
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 0.5rem;
    border: 2px solid $main;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.check-enter-active,
.check-leave-active {
  transition: 0.15s ease;
}
.check-enter-from,
.check-leave-to {
  opacity: 0;
}
</style>
