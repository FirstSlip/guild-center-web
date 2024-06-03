<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.0208 34.6484V31.3932C33.0208 29.6666 32.3349 28.0106 31.114 26.7897C29.893 25.5687 28.2371 24.8828 26.5104 24.8828H13.4896C11.7629 24.8828 10.107 25.5687 8.88602 26.7897C7.66508 28.0106 6.97916 29.6666 6.97916 31.3932V34.6484"
      :stroke="strokeColor"
      stroke-width="3.25521"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 18.3724C23.5956 18.3724 26.5104 15.4576 26.5104 11.862C26.5104 8.26638 23.5956 5.35156 20 5.35156C16.4044 5.35156 13.4896 8.26638 13.4896 11.862C13.4896 15.4576 16.4044 18.3724 20 18.3724Z"
      :stroke="strokeColor"
      stroke-width="3.25521"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps<{
  stroke?: string;
}>();

const strokeColor = computed(() => props.stroke || '#800000');
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
