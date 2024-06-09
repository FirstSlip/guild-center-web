<template>
  <div class="friends-blocked">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <div class="blocked-count">
        <span>Заблокированные</span>
        <span class="number">{{ blockedUsers.length }}</span>
      </div>
    </div>
    <div class="list">
      <ProfileFriendsBlockedUser
        v-for="user in filteredUsers"
        :key="user.tag"
        :blocked-user="user"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { ShortUser } from '@/ts/ShortUser';

const props = defineProps<{
  blockedUsers: ShortUser[];
}>();

const search = ref('');

const filteredUsers = computed(() => {
  return filterUsersWithSearch(props.blockedUsers, search.value);
});
</script>

<style lang="scss" scoped>
.friends-blocked {
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

    .blocked-count {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      font-weight: 700;
      font-size: 1.5rem;
      line-height: 150%;

      span.number {
        color: $red;
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
