<template>
  <div class="friend">
    <div class="friend-avatar">
      <WidgetsAvatar :avatar-url="avatarUrl" :name="name" />
    </div>
    <p class="p3">
      {{ name }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  avatarUrl?: string;
}>();
</script>

<style lang="scss" scoped>
.friend {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }
}
</style>
