<template>
  <section class="sidebar">
    <ProfileSidebarFriends :friends="friends" />
    <div class="separator"></div>
    <ProfileSidebarGuilds :guilds="guilds" />
  </section>
</template>

<script lang="ts" setup>
const friends: { name: string; avatarUrl?: string }[] = [
  { name: 'user1' },
  { name: 'user2' },
  {
    name: 'Алексей',
    avatarUrl:
      'https://eso-hub.com/storage/uploads/user-avatars/PqUQC5gqHKXHX3jOIPhq1PAM8d7QIDwoEdT5j1KI.png'
  }
];
const guilds = [{ name: 'guild1' }, { name: 'guild2' }];
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
