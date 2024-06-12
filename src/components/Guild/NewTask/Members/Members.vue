<template>
  <section class="members-tab">
    <div class="search">
      <div class="search-input">
        <UIInputSecondary placeholder="Поиск" v-model="search" />
      </div>
      <UISelect
        :titles="roleTitles"
        type="secondary"
        v-model="selectedRole"
      />
      <div class="members-count">
        <span>Участники</span>
        <span class="number">{{}}</span>
      </div>
    </div>
    <div class="select-all">
      <SVGFriends />
      <p class="h5">Выбрать всех</p>
      <UIRadio class="radio" v-model="isAllSelected" />
    </div>
    <div class="users">
      <div class="list">
        <GuildNewTaskMembersMember
          v-for="(member, index) in members"
          :key="member.user.tag"
          :member="member"
          v-model="membersSelectedArray[index]"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';

const props = defineProps<{
  members: GuildMember[];
}>();

const membersSelectedArray = defineModel<boolean[]>({
  default: []
});
const isAllSelected = ref(false);

watch(isAllSelected, () => {
  console.log(123);
  membersSelectedArray.value = membersSelectedArray.value.map(
    () => isAllSelected.value
  );
});

const roleTitles = [
  'Все роли',
  'Администратор',
  'Модератор',
  'Участник'
];
const selectedRole = ref(0);
const search = ref('');
</script>

<style lang="scss" scoped>
section.members-tab {
  .search {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    .search-input {
      width: 18.75rem;
    }

    .members-count {
      margin-left: auto;
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

  .select-all {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.675rem 0;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    svg {
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }

    .radio {
      margin-left: auto;
    }
  }

  .users {
    height: 50dvh;
    overflow-y: auto;

    .list {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
