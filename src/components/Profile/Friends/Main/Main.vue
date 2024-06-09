<template>
  <div class="friends-main">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <div class="friends-count">
        <span>Друзей</span>
        <span class="number">{{ friends.length }}</span>
      </div>
    </div>
    <div class="list">
      <ProfileFriendsMainFriend
        v-for="friend in filteredFriends"
        :key="friend.tag"
        :friend="friend"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { ShortUser } from '@/ts/ShortUser';

const props = defineProps<{
  friends: ShortUser[];
}>();

const search = ref('');

const filteredFriends = computed(() => {
  return filterUsersWithSearch(props.friends, search.value);
});
</script>

<style lang="scss" scoped>
.friends-main {
  width: 100%;

  .search {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 0;
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    .search-input {
      width: 18.75rem;
    }

    .friends-count {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      font-weight: 700;
      font-size: 1.5rem;
      line-height: 150%;

      span.number {
        color: $main;
      }
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
