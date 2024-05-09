<template>
  <div class="card">
    <img :src="`/img/GameType${gameType}.png`" alt="" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  gameType: 'PVP' | 'PVE';
}>();
</script>

<style lang="scss" scoped>
.card {
  width: 40rem;

  border: 1px solid white;
  border-radius: 0.25rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 20rem;

    object-fit: cover;
  }
}
</style>
