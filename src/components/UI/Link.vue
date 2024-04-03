<template>
  <nuxt-link
    :to="to"
    :class="['link', linkType, inheritFont && 'inherited-font']"
    :style="{ padding: padding }"
  >
    <slot></slot>
  </nuxt-link>
</template>
<script setup lang="ts">
type LinkVariant = 'primary' | 'secondary';

const props = defineProps<{
  to: string;
  padding?: string;
  type?: LinkVariant;
  uppercase?: boolean;
  disabled?: boolean;
  fill?: boolean;
  inheritFont?: boolean;
}>();

const linkType = computed(
  (): LinkVariant => props.type || 'primary'
);
</script>
<style lang="scss" scoped>
a.link {
  font-size: 1.25rem;
  line-height: 155%;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  transition: all 0.2s ease;

  &.inherited-font {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

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
}
</style>
