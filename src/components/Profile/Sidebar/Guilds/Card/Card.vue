<template>
  <nuxt-link class="guild" :to="`/guild/${guildId}`">
    <div class="guild-avatar">
      <WidgetsAvatar
        :name="name"
        :avatar-url="avatar"
        type="Guild"
      />
    </div>
    <p class="p3">
      {{ name }}
    </p>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  guildId: string;
  avatar?: string;
}>();
</script>

<style lang="scss" scoped>
a.guild {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  text-decoration: none;

  .guild-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }
}
</style>
