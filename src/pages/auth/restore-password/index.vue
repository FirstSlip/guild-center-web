<template>
  <CustomComponent v-model="value" />
</template>

<script lang="ts" setup>
const value = defineModel<string>();
</script>

<style></style>
