<template>
  <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
  <div
    v-else
    class="user-avatar"
    :style="`background-color: ${avatarColor}`"
  >
    <SVGUser />
  </div>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';
import type { User } from '@/ts/User';

const props = defineProps<{
  user: User;
}>();

const avatarColor = computed(() =>
  generateAvatarColor(props.user.name)
);
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 100%;
  height: 100%;

  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
