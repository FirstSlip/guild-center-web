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
              requestWithType.filter(
                ({ requestType }) => requestType === 'outcoming'
              ).length
            }}
          </span>
        </div>
        <div class="incoming">
          <span>Входящие</span>
          <span class="number">
            {{
              requestWithType.filter(
                ({ requestType }) => requestType === 'incoming'
              ).length
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="list">
      <ProfileFriendsRequestsUser
        v-for="request in filteredRequests"
        :key="request.tag"
        :request="request"
        @accepted="$emit('accepted', request.code)"
        @declined="$emit('declined', request.code)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { FriendRequest } from '@/ts/FriendRequest';
import type { ShortUser } from '@/ts/ShortUser';

type Request = ShortUser & {
  code: string;
  requestType: 'outcoming' | 'incoming';
};

const props = defineProps<{
  requests: FriendRequest[];
  myTag: string;
}>();

defineEmits<{
  (e: 'accepted', code: string): void;
  (e: 'declined', code: string): void;
}>();

const requestWithType: ComputedRef<Request[]> = computed(() =>
  props.requests.map((request): Request => {
    if (request.sender.tag === props.myTag) {
      return {
        tag: request.recipient.tag,
        username: request.recipient.username,
        avatar: request.recipient.avatar,
        code: request.code,
        requestType: 'outcoming'
      };
    } else {
      return {
        tag: request.sender.tag,
        username: request.sender.username,
        avatar: request.sender.avatar,
        code: request.code,
        requestType: 'incoming'
      };
    }
  })
);

const search = ref('');

const sortedRequests = computed(() => {
  return [...requestWithType.value].reverse().sort((a, b) => {
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
  return filterUsersWithSearch<{
    code: string;
    requestType: 'outcoming' | 'incoming';
  }>(sortedRequests.value, search.value);
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
