<template>
  <div class="textarea-wrapper">
    <textarea
      :class="['textarea', font]"
      name=""
      id=""
      :cols="colsComputed"
      :rows="rowsComputed"
      :placeholder="placeholder"
      v-model="model"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import type { FontType } from '@/ts/FontType';

const props = defineProps<{
  cols?: number;
  rows?: number;
  fontType?: FontType;
  name?: string;
  id?: string;
  placeholder?: string;
}>();
const font = computed((): FontType => props.fontType || 'p2');
const colsComputed = computed(() => props.cols || 30);
const rowsComputed = computed(() => props.rows || 7);

const model = defineModel<string>();
</script>

<style lang="scss" scoped>
.textarea-wrapper {
  width: 100%;
  padding: 1rem;
  background-color: $gray;

  border-radius: 0.25rem;

  .textarea {
    width: 100%;
    height: 100%;

    background-color: transparent;
    border: none;

    resize: none;

    overscroll-behavior: contain;

    &::placeholder {
      color: #c3c3c3;
    }

    &:focus-visible {
      outline: none;
    }

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }
  }
}
</style>
