<template>
  <div class="settings">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <div class="members-count">
        <span>Заявки</span>
        <span class="number">{{ requests.length }}</span>
      </div>
    </div>
    <div class="all-members">
      <div class="list">
        <GuildSettingsRequestsUser
          v-for="user in filteredRequests"
          :key="user.tag"
          :user="user"
        />
        <GuildSettingsRequestsUser
          v-for="member in 18"
          :key="member"
          :user="{
            username: '123',
            avatar: '',
            tag: '31245'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { ShortUser } from '@/ts/ShortUser';

const props = defineProps<{
  requests: ShortUser[];
}>();

const filteredRequests = computed(() => {
  return filterUsersWithSearch(props.requests, search.value);
});

const search = ref('');
</script>

<style lang="scss" scoped>
.settings {
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

    .members-count {
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

  .all-members {
    height: 50dvh;
    max-height: 50dvh;

    overflow-y: auto;

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
