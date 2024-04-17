<template>
  <div class="friends">
    <h2 class="h4">
      <span>Друзья</span>
      <span class="h5">{{ friends.length }}</span>
    </h2>
    <ProfileSidebarFriendsCard
      v-for="(friend, index) in friends"
      :key="index"
      :name="friend.name"
      :avatar-url="friend.avatarUrl"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  friends: {
    name: string;
    avatarUrl?: string;
  }[];
}>();
</script>

<style lang="scss" scoped>
.friends {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  h2.h4 {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
