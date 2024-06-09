<template>
  <div class="user">
    <div class="links">
      <nuxt-link :to="`/profile_${profile.tag}/friends`">
        <SVGFriends />
        <div class="notification" v-if="haveRequests" />
      </nuxt-link>
      <nuxt-link to="/chat">
        <SVGChat />
      </nuxt-link>
      <nuxt-link :to="`/profile_${profile.tag}/guilds`">
        <SVGCastle stroke="#66FCF1" />
      </nuxt-link>
    </div>
    <div class="profile">
      <nuxt-link :to="`/profile_${profile.tag}`" class="info">
        <div class="user-avatar">
          <WidgetsAvatar
            :name="profile.username"
            :avatarUrl="profile.avatar"
          />
        </div>
        <div class="username">
          <span>{{ profile.username }}</span>
          <br />
          <span>#{{ profile.tag }}</span>
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
  </div>
</template>

<script lang="ts" setup>
import type { UserMe } from '@/ts/UserMe';

const props = defineProps<{
  profile: UserMe;
}>();
defineEmits(['sign-out']);

const signOutHover = ref(false);

const haveRequests = computed(() => {
  return props.profile.friendRequests.some(
    (request) => request.recipient.tag === props.profile.tag
  );
});
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  display: flex;
  gap: 1.625rem;
  align-items: center;

  @media (max-width: $adaptive-breakpoint-normal) {
    gap: 0.5rem;
  }

  .links {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: $adaptive-breakpoint-normal) {
      gap: 0.5rem;
    }

    a {
      position: relative;
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

      .notification {
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: 0;
        right: 0;
        background-color: $red;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }

  .profile {
    display: flex;
    gap: 1.625rem;
    align-items: center;

    @media (max-width: $adaptive-breakpoint-normal) {
      gap: 0.25rem;
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

      min-width: 5.5rem;
      max-width: 5.5rem;

      overflow: hidden;
      text-overflow: ellipsis;

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
}
</style>
