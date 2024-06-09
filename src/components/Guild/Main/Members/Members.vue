<template>
  <section class="sidebar">
    <div class="members">
      <h2 class="h4">
        <span>Участники</span>
        <span class="h5">{{ computedMembers.length }}</span>
      </h2>
      <!-- <p class="p4">Администратор -</p>
      <GuildMainMembersCard
        v-for="(admin, index) in membersGroupedByRole.admins"
        :key="index"
        :name="admin.user.username"
        :avatar-url="admin.user.avatar"
        role="Администратор"
      />
      <div class="separator"></div>
      <p class="p4">Рекрут -</p>
      <GuildMainMembersCard
        v-for="(
          recrut, index
        ) in membersGroupedByRole.defaultMembers"
        :key="index"
        :name="recrut.user.username"
        :avatar-url="recrut.user.avatar"
        role="Рекрут"
      /> -->
      <div
        class="member-block"
        v-for="(role, index) in Object.keys(
          membersGroupedByRole
        )"
        :key="index"
      >
        <p class="p4">
          {{
            Role[
              role.substring(
                0,
                role.length - 1
              ) as keyof typeof Role
            ]
          }}
          -
          {{
            membersGroupedByRole[
              role as keyof typeof membersGroupedByRole
            ].length
          }}
        </p>
        <GuildMainMembersCard
          v-for="(member, index) in membersGroupedByRole[
            role as keyof typeof membersGroupedByRole
          ]"
          :key="index"
          :name="member.user.username"
          :avatar-url="member.user.avatar"
          :role="
            Role[
              role.substring(
                0,
                role.length - 1
              ) as keyof typeof Role
            ]
          "
        />
        <div
          class="separator"
          v-if="index < Object.keys(Role).length - 1"
        ></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';

const props = defineProps<{
  members: GuildMember[];
}>();

console.log('members', props.members);

const computedMembers = computed(() => props.members || []);

/* const members: {
  name: string;
  avatarUrl?: string;
  role: string;
}[] = [
  { name: 'Stepan00', role: 'Администратор' },
  { name: 'BelieveMePls', role: 'Администратор' },
  {
    name: 'Алексей',
    avatarUrl:
      'https://eso-hub.com/storage/uploads/user-avatars/PqUQC5gqHKXHX3jOIPhq1PAM8d7QIDwoEdT5j1KI.png',
    role: 'Рекрут'
  },
  { name: 'GITGUD', role: 'Рекрут' }
]; */

enum Role {
  admin = 'Администратор',
  moderator = 'Модератор',
  defaultMember = 'Участник'
}

const membersGroupedByRole = computed(() => {
  const members = computedMembers.value;
  const admins = members.filter(
    (member) => member.role === 'admin'
  );
  const moderators = members.filter(
    (member) => member.role === 'moderator'
  );
  const defaultMembers = members.filter(
    (member) => member.role === 'member'
  );

  return {
    admins,
    moderators,
    defaultMembers
  };
});
</script>

<style lang="scss" scoped>
section.sidebar {
  border-radius: 1rem;
  padding: 1rem 2.625rem;

  background: $background-light-purple;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .members {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    h2.h4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      span.h5 {
        color: $main;
      }
    }

    .member-block {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;

      p.p4 {
        color: $text-white-60;
      }
    }
  }

  .separator {
    width: 100%;
    height: 6px;
    background-color: $white;
    border-radius: 1rem;
    margin: 0.625rem 0;
  }
}
</style>
