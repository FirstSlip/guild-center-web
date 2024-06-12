<template>
  <button
    @click="$emit('click')"
    :class="[
      'button',
      font,
      buttonType,
      transparent && 'transparent',
      fill && 'fill',
      disabled && 'disabled'
    ]"
    :style="[
      padding && { padding: padding },
      borderRadius && { borderRadius: borderRadius }
    ]"
    :disabled="disabled || false"
    :type="htmlType"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import type { FontType } from '@/ts/FontType';

type ButtonVariant = 'primary' | 'secondary' | 'back' | 'blank';

const props = defineProps<{
  type?: ButtonVariant;
  transparent?: boolean;
  fill?: boolean;
  padding?: string;
  fontType?: FontType;
  borderRadius?: string;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}>();
defineEmits(['click']);

const font = computed((): FontType => props.fontType || 'h4');

const buttonType = computed(
  (): ButtonVariant => props.type || 'primary'
);
</script>
<style lang="scss" scoped>
button.button {
  width: fit-content;
  padding: 0.25rem 2.5rem;
  border: none;
  border-radius: 0.62rem;
  background-color: $main;

  text-align: center;
  color: $white;

  cursor: pointer;

  transition: all 0.3s ease;

  &.fill {
    width: 100%;
    padding: 0.25rem 0.5rem;
  }

  &.disabled {
    background: $light-gray !important;
    color: $text-white !important;

    cursor: not-allowed !important;
  }

  &.primary {
    background-color: $buttonPrimaryBg;
    color: $buttonPrimaryColor;
    border-color: $buttonPrimaryStroke;

    &:hover {
      background-color: $buttonPrimaryHoverBg;
      color: $buttonPrimaryHoverColor;
      border-color: $buttonPrimaryHoverStroke;
    }

    &:active {
      background-color: $buttonPrimaryActiveBg;
      color: $buttonPrimaryActiveColor;
      border-color: $buttonPrimaryActiveStroke;
    }

    &.transparent {
      border: 1px solid;

      background-color: $buttonPrimaryTransparentBg;
      color: $buttonPrimaryTransparentColor;
      border-color: $buttonPrimaryTransparentStroke;

      &:hover {
        background-color: $buttonPrimaryTransparentHoverBg;
        color: $buttonPrimaryTransparentHoverColor;
        border-color: $buttonPrimaryTransparentHoverStroke;
      }

      &:active {
        background-color: $buttonPrimaryTransparentActiveBg;
        color: $buttonPrimaryTransparentActiveColor;
        border-color: $buttonPrimaryTransparentActiveStroke;
      }
    }
  }
  &.secondary {
    background-color: $buttonSecondaryBg;
    color: $buttonSecondaryColor;

    &:hover {
      background-color: $buttonSecondaryHoverBg;
      color: $buttonSecondaryHoverColor;
    }

    &:active {
      background-color: $buttonSecondaryActiveBg;
      color: $buttonSecondaryActiveColor;
      border-color: $buttonSecondaryActiveStroke;
    }

    &.transparent {
      border: 1px solid;

      background-color: $buttonSecondaryTransparentBg;
      color: $buttonSecondaryTransparentColor;
      border-color: $buttonSecondaryTransparentStroke;

      &:hover {
        background-color: $buttonSecondaryTransparentHoverBg;
        color: $buttonSecondaryTransparentHoverColor;
        border-color: $buttonSecondaryTransparentHoverStroke;
      }

      &:active {
        background-color: $buttonSecondaryTransparentActiveBg;
        color: $buttonSecondaryTransparentActiveColor;
        border-color: $buttonSecondaryTransparentActiveStroke;
      }
    }
  }

  &.back {
    border: 1px solid;

    background-color: $buttonBackBg;
    color: $buttonBackColor;
    border-color: $buttonBackStroke;

    &:hover {
      background-color: $buttonBackHoverBg;
      color: $buttonBackHoverColor;
      border-color: $buttonBackHoverStroke;
    }

    &:active {
      background-color: $buttonBackActiveBg;
      color: $buttonBackActiveColor;
      border-color: $buttonBackActiveStroke;
    }
  }

  &.blank {
    border: none;

    background-color: $buttonBlankBg;
    color: $buttonBlankColor;
    border-color: $buttonBlankStroke;

    &:hover {
      background-color: $buttonBlankHoverBg;
      color: $buttonBlankHoverColor;
      border-color: $buttonBlankHoverStroke;
    }

    &:active {
      background-color: $buttonBlankActiveBg;
      color: $buttonBlankActiveColor;
      border-color: $buttonBlankActiveStroke;
    }
  }
}
</style>
