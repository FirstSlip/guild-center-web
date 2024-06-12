<template>
  <div class="member">
    <div class="member-avatar">
      <WidgetsAvatar
        :avatar-url="member.user.avatar"
        :name="member.user.username"
      />
    </div>
    <p class="h5">
      {{ member.user.username }} #{{ member.user.tag }}
    </p>
    <div class="tools">
      <UICheckbox v-model="model" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';

defineProps<{
  member: GuildMember;
}>();

const model = defineModel<boolean>({ default: false });
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
