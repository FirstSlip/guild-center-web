<template>
  <button
    :class="['tab', active && 'active']"
    @click="$emit('click')"
  >
    <p class="h5">
      <slot></slot>
    </p>
    <div class="underline"></div>
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
  padding: 0rem 1.25rem;
  color: $text-white;

  background: none;

  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover:not(.active) {
    .underline {
      width: 10%;
    }
  }

  &.active {
    /* border-color: $text-white;
    border-bottom-color: $text-white; */

    .underline {
      width: 100%;
    }
  }

  .underline {
    content: '';
    width: 0;
    height: 2px;

    margin: 0 auto;
    background-color: $white;

    transition: all 0.3s ease;
  }
}
</style>
