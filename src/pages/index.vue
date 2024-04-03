<template>
  <div>
    {{ getData('123') }}
  </div>
</template>
<script setup lang="ts">
const getData = (a: string): string => {
  return a;
};
</script>
<style></style>
