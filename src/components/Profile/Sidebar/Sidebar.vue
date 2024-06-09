<template>
  <section class="sidebar">
    <ProfileSidebarFriends
      :friends="friends"
      :is-my-profile="isMyProfile"
    />
    <div class="separator"></div>
    <ProfileSidebarGuilds
      :guilds="guilds"
      :is-my-profile="isMyProfile"
    />
  </section>
</template>

<script lang="ts" setup>
import type { ShortGuild } from '@/ts/ShortGuild';
import type { ShortUser } from '@/ts/shortUser';

defineProps<{
  friends: ShortUser[];
  guilds: ShortGuild[];
  isMyProfile?: boolean;
}>();
</script>

<style lang="scss" scoped>
section.sidebar {
  border-radius: 1rem;
  padding: 1rem 2.625rem;

  background: $background-light-purple;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .separator {
    width: 100%;
    height: 6px;
    background-color: $white;
    border-radius: 1rem;
  }
}
</style>
