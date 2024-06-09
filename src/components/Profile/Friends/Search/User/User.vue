<template>
  <div class="friend">
    <div class="info">
      <nuxt-link
        class="friend-avatar"
        :to="`/profile_${user.tag}`"
      >
        <WidgetsAvatar
          type="User"
          :name="user.username"
          :avatar-url="user.avatar"
        />
      </nuxt-link>
      <div class="username">
        {{ user.username }} #{{ user.tag }}
      </div>
    </div>
    <div class="tools">
      <span v-if="alreadyFriend" class="already-friend">
        В друзьях
      </span>
      <span v-else-if="user.tag === myTag" class="sent">
        Ваш профиль
      </span>
      <span v-else-if="alreadySent" class="sent">
        Отправлено
      </span>
      <UIButton
        v-else
        type="primary"
        font-type="h5"
        borderRadius="0.25rem"
        padding="0 1.25rem"
        @click="addFriend"
      >
        Добавить в друзья
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FriendRequest } from '@/ts/FriendRequest';
import type { ShortUser } from '@/ts/ShortUser';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import type { Socket } from 'socket.io-client';

const props = defineProps<{
  user: ShortUser;
  myFriends: ShortUser[];
  requests: FriendRequest[];
  myTag: string;
}>();
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null =
  null;

const alreadyFriend = computed(() => {
  return props.myFriends.some((friend) => {
    return friend.tag === props.user.tag;
  });
});

const alreadySent = computed(() => {
  return props.requests.some((request) => {
    return request.recipient.tag === props.user.tag;
  });
});

onMounted(() => {
  socket = useSocket().socket.value;
});

const addFriend = () => {
  if (socket) {
    socket.emit('Friends', {
      event: 'sendFriendRequest',
      recipientTag: props.user.tag
    });
  }
};
</script>

<style lang="scss" scoped>
.friend {
  width: 100%;
  padding: 0.5rem 0rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  .info {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    .friend-avatar {
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }

    .username {
      font-weight: 700;
      font-size: 1rem;
      line-height: 155%;
    }
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
      color: $main;
    }

    a.chat {
      width: 2rem;
      height: 2rem;
    }

    button.more-options {
      width: 2rem;
      height: 2rem;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
