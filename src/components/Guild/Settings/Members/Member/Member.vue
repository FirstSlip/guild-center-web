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
    <UISelect
      :titles="roleTitles"
      v-model="role"
      type="secondary"
    />
    <button
      class="delete"
      @click="emit('delete-member', member.user.tag)"
    >
      <SVGTrash />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';
import type { Role } from '@/ts/Role';

const props = defineProps<{
  member: GuildMember;
}>();

const emit = defineEmits<{
  (e: 'update-member', memberTag: string, role: string): void;
  (e: 'delete-member', memberTag: string): void;
}>();

const roles: Role[] = ['admin', 'moderator', 'member'];
const roleTitles = ['Администратор', 'Модератор', 'Участник'];
const role = ref(roles.indexOf(props.member.role));

watch(role, () => {
  emit(
    'update-member',
    props.member.user.tag,
    roles[role.value]
  );
});
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

  button.delete {
    margin-left: auto;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;

    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
