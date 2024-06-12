<template>
  <button
    :class="['tab', active && 'active', tabType]"
    type="button"
    @click="$emit('click')"
  >
    <p class="h5">
      <slot></slot>
    </p>
    <div class="underline"></div>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  active?: boolean;
  type?: 'primary' | 'secondary';
}>();
defineEmits(['click']);

const tabType = computed(() => props.type || 'primary');
</script>

<style lang="scss" scoped>
button.tab {
  border: none;
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
    .underline {
      width: 100%;
    }
  }

  &.primary {
    padding: 0rem 1.25rem;

    .underline {
      height: 2px;
    }
  }

  &.secondary {
    padding: 0rem 0;

    .underline {
      height: 6px;
    }

    p {
      padding: 0rem 1.25rem;
    }
  }

  .underline {
    content: '';
    width: 0;

    margin: 0 auto;
    background-color: $white;

    transition: all 0.3s ease;
  }
}
</style>
