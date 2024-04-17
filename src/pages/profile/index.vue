<template>
  <div class="profile">
    <ProfileComments />
    <ProfileSidebar />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'profile' });
</script>

<style lang="scss" scoped>
.profile {
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: calc(67% - 1rem) 33%;
  gap: 1rem;
}
</style>
