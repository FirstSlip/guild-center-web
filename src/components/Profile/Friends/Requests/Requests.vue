<template>
  <div class="friends-requests">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <div class="requests-count">
        <div class="outcoming">
          <span>Исходящие</span>
          <span class="number">
            {{
              requests.filter(
                ({ requestType }) => requestType === 'outcoming'
              ).length
            }}
          </span>
        </div>
        <div class="incoming">
          <span>Входящие</span>
          <span class="number">
            {{
              requests.filter(
                ({ requestType }) => requestType === 'incoming'
              ).length
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="list">
      <ProfileFriendsRequestsFriend
        v-for="request in filteredRequests"
        :key="request.tag"
        :request="request"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { ShortUser } from '@/ts/shortUser';

const props = defineProps<{
  requests: (ShortUser & {
    requestType: 'outcoming' | 'incoming';
  })[];
}>();

const search = ref('');

const sortedRequests = computed(() => {
  return [...props.requests].reverse().sort((a, b) => {
    if (a.requestType === 'outcoming') {
      return -1;
    }
    if (b.requestType === 'outcoming') {
      return 1;
    }
    return 0;
  });
});

const filteredRequests = computed(() => {
  return filterUsersWithSearch(
    sortedRequests.value,
    search.value
  );
});
</script>

<style lang="scss" scoped>
.friends-requests {
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

    .requests-count {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .outcoming {
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

      .incoming {
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
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
