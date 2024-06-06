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
      <UIButton
        type="primary"
        font-type="h5"
        borderRadius="0.25rem"
        padding="0 1.25rem"
      >
        Добавить в друзья
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortUser } from '@/ts/shortUser';

defineProps<{
  user: ShortUser;
}>();
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
