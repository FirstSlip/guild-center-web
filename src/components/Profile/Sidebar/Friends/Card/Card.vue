<template>
  <nuxt-link class="friend" :to="`/profile_${tag}`">
    <div class="friend-avatar">
      <WidgetsAvatar :avatar-url="avatarUrl" :name="name" />
    </div>
    <p class="p3">
      {{ name }}
    </p>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  avatarUrl?: string;
  tag: string;
}>();
</script>

<style lang="scss" scoped>
a.friend {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  text-decoration: none;

  .friend-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }
}
</style>
