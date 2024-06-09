<template>
  <div class="friend">
    <div class="info">
      <nuxt-link
        class="friend-avatar"
        :to="`/profile_${request.tag}`"
      >
        <WidgetsAvatar
          type="User"
          :name="request.username"
          :avatar-url="request.avatar"
        />
      </nuxt-link>
      <div class="username">
        <span class="name">
          {{ request.username }} #{{ request.tag }}
        </span>
        <span class="request-type">
          {{
            request.requestType === 'outcoming'
              ? 'исходящий запрос дружбы'
              : 'входящий запрос дружбы'
          }}
        </span>
      </div>
    </div>
    <div class="tools">
      <button
        v-if="request.requestType === 'incoming'"
        class="accept"
        @click="acceptRequest(request.code)"
      >
        <SVGCheck />
      </button>
      <button
        class="decline"
        @click="declineRequest(request.code)"
      >
        <SVGCross color="#F04451" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortUser } from '@/ts/ShortUser';

defineProps<{
  request: ShortUser & {
    requestType: 'outcoming' | 'incoming';
    code: string;
  };
}>();

const emit = defineEmits<{
  (e: 'accepted'): void;
  (e: 'declined'): void;
}>();

const acceptRequest = async (code: string) => {
  const response = await $api.user.friends.acceptRequest(code);
  if ('success' in response && response.success) {
    emit('accepted');
  }
};

const declineRequest = async (code: string) => {
  const response = await $api.user.friends.declineRequest(code);
  if ('success' in response && response.success) {
    emit('declined');
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
      display: flex;
      flex-direction: column;

      .name {
        font-weight: 700;
        font-size: 1rem;
        line-height: 155%;
      }

      .request-type {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 155%;
      }
    }
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    button {
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
