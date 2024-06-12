<template>
  <div class="member">
    <div class="member-avatar">
      <WidgetsAvatar
        :avatar-url="user.avatar"
        :name="user.username"
      />
    </div>
    <p class="h5">{{ user.username }} #{{ user.tag }}</p>
    <div class="tools">
      <button class="accept">
        <SVGCheck />
      </button>
      <button class="deny">
        <SVGCross color="#F04451" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortUser } from '@/ts/ShortUser';

defineProps<{
  user: ShortUser;
}>();
</script>

<style lang="scss" scoped>
.member {
  padding: 0.625rem 0;

  display: flex;
  align-items: center;
  gap: 1.25rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  .member-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .tools {
    margin-left: auto;

    button {
      width: 2rem;
      height: 2rem;
      min-width: 2rem;
      min-height: 2rem;

      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
