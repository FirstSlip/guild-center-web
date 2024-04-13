<template>
  <svg
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5 5L5.5 5C4.83696 5 4.20107 5.26339 3.73223 5.73223C3.26339 6.20107 3 6.83696 3 7.5L3 22.5C3 23.163 3.26339 23.7989 3.73223 24.2678C4.20107 24.7366 4.83696 25 5.5 25H15.5"
      :stroke="stroke"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23 20L28 15L23 10"
      :stroke="stroke"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28 15L11.75 15"
      :stroke="stroke"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  color?: string;
  hoverColor?: string;
  hover?: boolean;
}>();

const isHovered = computed(() => props.hover || false);
const color = computed(() => props.color || '#66FCF1');
const hoverColor = computed(
  () => props.hoverColor || color.value
);
const stroke = computed(() =>
  isHovered.value ? hoverColor.value : color.value
);
</script>

<style lang="scss" scoped>
svg {
  transition: all 0.2s ease;

  * {
    transition: all 0.2s ease;
  }
}
</style>
