<template>
  <div class="friend">
    <div class="info">
      <nuxt-link
        class="friend-avatar"
        :to="`/profile_${blockedUser.tag}`"
      >
        <WidgetsAvatar
          type="User"
          :name="blockedUser.username"
          :avatar-url="blockedUser.avatar"
        />
      </nuxt-link>
      <div class="username">
        {{ blockedUser.username }} #{{ blockedUser.tag }}
      </div>
    </div>
    <div class="tools">
      <button class="unblock">
        <SVGProfileMinus />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortUser } from '@/ts/shortUser';

defineProps<{
  blockedUser: ShortUser;
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

    button.unblock {
      width: 2rem;
      height: 2rem;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
