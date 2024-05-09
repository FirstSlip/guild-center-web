<template>
  <div class="user">
    <div class="links">
      <nuxt-link to="/profile/friends">
        <SVGFriends />
      </nuxt-link>
      <nuxt-link to="/chat">
        <SVGChat />
      </nuxt-link>
      <nuxt-link to="/profile/guilds">
        <SVGCastle stroke="#66FCF1" />
      </nuxt-link>
    </div>
    <nuxt-link to="/profile" class="info">
      <div class="user-avatar">
        <WidgetsAvatar
          :name="user.name"
          :avatarUrl="user.avatar"
        />
      </div>
      <div class="username">
        <span>{{ user.name }}</span>
        <br />
        <span>{{ user.tag }}</span>
      </div>
    </nuxt-link>
    <button
      class="sign-out"
      @mouseover="signOutHover = true"
      @mouseleave="signOutHover = false"
      @click="$emit('sign-out')"
    >
      <SVGSignOut hoverColor="red" :hover="signOutHover" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@/ts/User';

defineProps<{
  user: User;
}>();
defineEmits(['sign-out']);

const signOutHover = ref(false);
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  display: flex;
  gap: 1.625rem;
  align-items: center;

  .links {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a {
      height: max(80%, 2rem);
      aspect-ratio: 1 / 1;

      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        max-width: 2rem;
        max-height: 2rem;
      }
    }
  }

  .user-avatar {
    width: 3.125rem;
    height: 3.125rem;
  }

  .username {
    font-weight: 700;
    font-size: 1.25rem;
    color: #fff;

    text-align: left;

    span {
      color: #fff;
    }
  }

  a.info {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    border: none;
    background: none;
    cursor: pointer;

    text-decoration: none;
  }

  button.sign-out {
    width: 3.125rem;
    height: 3.125rem;

    border: none;
    background: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
