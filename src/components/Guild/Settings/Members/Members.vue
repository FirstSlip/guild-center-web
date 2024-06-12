<template>
  <div class="settings">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <div class="members-count">
        <span>Участники</span>
        <span class="number">{{ members.length }}</span>
      </div>
    </div>
    <div class="all-members">
      <div class="list">
        <GuildSettingsMembersMember
          v-for="member in filteredMembers"
          :key="member.user.tag"
          :member="member"
          @update-member="updatedMember"
          @delete-member="deletedMember"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterUsersWithSearch } from '@/common/func/filterUsersWithSearch';
import type { GuildMember } from '@/ts/GuildMember';

const props = defineProps<{
  members: GuildMember[];
}>();

const emit = defineEmits<{
  (e: 'update-member', memberTag: string, role: string): void;
  (e: 'delete-member', memberTag: string): void;
}>();

const filteredMembers = computed(() => {
  const filteredUsers = filterUsersWithSearch(
    props.members.map((member) => member.user),
    search.value
  );
  const members: GuildMember[] = filteredUsers.map((user) => {
    const role =
      props.members.find(
        (member) => member.user.tag === user.tag
      )?.role || 'member';
    return {
      user,
      role
    };
  });

  return members;
});

const updatedMember = (memberTag: string, role: string) => {
  emit('update-member', memberTag, role);
};

const deletedMember = (memberTag: string) => {
  emit('delete-member', memberTag);
};

const search = ref('');
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;

  .search {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 0;
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    .search-input {
      width: 18.75rem;
    }

    .members-count {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      font-weight: 700;
      font-size: 1.5rem;
      line-height: 150%;

      span.number {
        color: $main;
      }
    }
  }

  .all-members {
    height: 50dvh;
    max-height: 50dvh;

    overflow-y: auto;

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
