<template>
  <nuxt-link
    :to="to"
    :class="[
      'link',
      linkType,
      fontType && `has-font ${fontType}`
    ]"
    :style="padding && { padding: padding }"
  >
    <slot></slot>
  </nuxt-link>
</template>
<script setup lang="ts">
type LinkVariant = 'primary' | 'secondary';
type FontType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'custom-label'
  | 'inherited';

const props = defineProps<{
  to: string;
  padding?: string;
  type?: LinkVariant;
  uppercase?: boolean;
  disabled?: boolean;
  fill?: boolean;
  fontType?: FontType;
}>();

const linkType = computed(
  (): LinkVariant => props.type || 'primary'
);
</script>
<style lang="scss" scoped>
a.link {
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  transition: all 0.2s ease;

  &.primary {
    color: $linkPrimaryColor;

    &:hover {
      color: $linkPrimaryHoverColor;
      text-decoration: underline;
    }

    &:active {
      color: $linkPrimaryActiveColor;
      text-decoration: underline;
    }
  }

  &.secondary {
    color: $linkSecondaryColor;

    &:hover {
      color: $linkSecondaryHoverColor;
    }

    &:active {
      color: $linkSecondaryActiveColor;
    }
  }

  &.inherited {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
  }

  &:not(.has-font) {
    font-size: 1.25rem;
    line-height: 155%;
    font-weight: 400;
  }
}
</style>
