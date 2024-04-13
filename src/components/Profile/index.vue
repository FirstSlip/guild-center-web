<template>
  <div class="profile">
    <ProfileHeader :currentTab="path" />
  </div>
</template>

<script lang="ts" setup>
const path = useRoute().path;
console.log(path);
</script>

<style lang="scss" scoped>
.profile {
  margin: 0 auto;
  max-width: 53.12rem;
}
</style>
