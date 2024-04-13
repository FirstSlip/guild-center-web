<template>
  <button
    @click="$emit('click')"
    :class="[
      'button',
      buttonType,
      transparent && 'transparent',
      small && 'small',
      fill && 'fill'
    ]"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'back';

const props = defineProps<{
  type?: ButtonVariant;
  transparent?: boolean;
  small?: boolean;
  fill?: boolean;
}>();
defineEmits(['click']);

const buttonType = computed(
  (): ButtonVariant => props.type || 'primary'
);
</script>
<style lang="scss" scoped>
button.button {
  width: fit-content;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.62rem;
  background-color: #494949;

  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;

  cursor: pointer;

  transition: all 0.3s ease;

  &.fill {
    width: 100%;
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
}
</style>
