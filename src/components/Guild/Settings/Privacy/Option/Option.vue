<template>
  <div class="option">
    <div class="title">
      <span class="h5">
        <slot name="title"></slot>
      </span>
      <UISelect
        :titles="options"
        v-model="selected"
        v-model:opened="opened"
        @click="$emit('select-click')"
      />
    </div>
    <div class="description">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  options: string[];
}>();
defineEmits<{
  (e: 'select-click'): void;
}>();
defineSlots<{
  ['title']: [];
  ['description']: [];
}>();
const selected = defineModel<number>();
const opened = defineModel<boolean>('opened', {
  default: false
});
</script>

<style lang="scss" scoped>
.option {
  width: 100%;
  border-bottom: 1px solid #b8b8b8;

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem;

    span.h5 {
      color: $main;
    }
  }

  .description {
    margin-top: 0.5rem;
    padding: 0.5rem;

    &:empty {
      display: none;
    }
  }
}
</style>
