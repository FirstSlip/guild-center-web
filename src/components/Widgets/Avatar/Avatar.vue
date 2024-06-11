<template>
  <img
    v-if="avatarUrl"
    :src="avatarUrl"
    :alt="name"
    class="avatar img"
  />
  <div
    v-else
    class="avatar icon"
    :style="`background-color: ${avatarColor.bg}`"
  >
    <SVGUser
      v-if="avatarType === 'User'"
      :stroke="avatarColor.stroke"
    />
    <SVGCastle
      v-else-if="avatarType === 'Guild'"
      :stroke="avatarColor.stroke"
    />
    <SVGChat v-else :stroke="avatarColor.stroke" />
  </div>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';

const props = defineProps<{
  type?: 'User' | 'Guild' | 'Chat';
  avatarUrl?: string;
  name: string;
}>();

const avatarType = computed(() => props.type || 'User');

const avatarColor = computed(() =>
  generateAvatarColor(props.name)
);
</script>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  height: 100%;

  border-radius: 100%;

  overflow: hidden;

  &.icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10%;
  }
}
</style>
