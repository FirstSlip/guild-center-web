<template>
  <div>
    <ProfileGuildsCreate />
  </div>
</template>

<script lang="ts" setup>
import { useMatchMedia } from 'vue-composable';

console.log(useMatchMedia('(min-width: 1024px)').matches.value);
</script>

<style></style>
