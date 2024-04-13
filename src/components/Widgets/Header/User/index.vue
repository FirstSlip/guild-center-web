<template>
  <div class="user">
    <button class="info" @click="profileClick">
      <div class="avatar">
        <WidgetsAvatar :user="user" />
      </div>
      <div class="username">
        <span>{{ user.name }}</span>
        <br />
        <span>{{ user.tag }}</span>
      </div>
    </button>
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

const props = defineProps<{
  user: User;
}>();
defineEmits(['sign-out']);

const profileClick = () => {
  useRouter().push('/profile');
};

const signOutHover = ref(false);
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  gap: 1.625rem;
  align-items: center;

  .avatar {
    width: 3.12rem;
    height: 3.12rem;
  }

  .username {
    font-weight: 700;
    font-size: 1.25rem;
    color: #fff;

    span {
      color: #fff;
    }
  }

  button.info {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    border: none;
    background: none;
    cursor: pointer;
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
