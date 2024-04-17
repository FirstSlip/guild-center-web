<template>
  <div class="profile-integrations">
    <section class="main"></section>
    <ProfileSidebar />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'profile' });
</script>

<style lang="scss" scoped>
.profile-integrations {
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: calc(67% - 1rem) 33%;
  gap: 1rem;
}
</style>
