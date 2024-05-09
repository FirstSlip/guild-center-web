<template>
  <div
    :class="['select', otherOptionsOpened && 'active']"
    @click.stop="$emit('click')"
  >
    <button
      :class="['button', font]"
      @click="otherOptionsOpened = !otherOptionsOpened"
    >
      <span>{{ titles[selected || 0] }}</span>
      <SVGDownArrow />
    </button>
    <div class="other-options" v-if="otherOptionsOpened">
      <button
        v-for="title in titlesWithoutSelected"
        :key="title"
        :class="['option', font]"
        @click="select(title)"
      >
        {{ title }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FontType } from '@/ts/FontType';

const props = defineProps<{
  titles: string[];
  fontType?: FontType;
}>();
const emit = defineEmits<{
  (e: 'change', index: number): void;
  (e: 'click'): void;
}>();
const selected = defineModel<number>();

const font = computed((): FontType => props.fontType || 'h5');

const otherOptionsOpened = defineModel<boolean>('opened', {
  default: false
});

const titlesWithoutSelected = computed(() =>
  props.titles.filter((title, index) => index !== selected.value)
);

const select = (title: string) => {
  selected.value = props.titles.indexOf(title);
  otherOptionsOpened.value = false;
  emit('change', selected.value);
};
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  width: fit-content;
  background: none;
  border-radius: 0.25rem;

  button.button {
    background: none;
    padding: 0.5rem;
    border: 1px solid transparent;

    cursor: pointer;

    color: $selectColor;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: $selectHoverColor;
    }
  }

  &.active {
    button.button {
      background-color: $light-purple;
      border: 1px solid $line-light;
      border-bottom: 1px solid transparent;
      border-radius: 0.25rem 0.25rem 0 0;

      color: $selectOpenedColor;
    }
  }

  .other-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;

    background-color: $light-purple;
    border: 1px solid $line-light;
    border-top: none;
    border-radius: 0 0 0.25rem 0.25rem;

    z-index: 1;

    button.option {
      width: 100%;
      padding: 0.5rem;
      background: transparent;

      color: $white;
      text-align: left;

      border-radius: 0.25rem;
      border: none;

      cursor: pointer;

      &:hover {
        background-color: $selectHoverBg;
      }

      &:active {
        color: $selectActiveColor;
        background-color: $selectActiveBg;
      }
    }
  }
}
</style>
