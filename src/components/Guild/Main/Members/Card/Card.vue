<template>
  <div class="member">
    <div class="member-avatar">
      <WidgetsAvatar :avatar-url="avatarUrl" :name="name" />
    </div>
    <p class="p3">
      <span>{{ name }}</span>
      <span class="p4">{{ role }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  role: string;
  avatarUrl?: string;
}>();
</script>

<style lang="scss" scoped>
.member {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  p.p3 {
    display: flex;
    flex-direction: column;
  }
}
</style>
