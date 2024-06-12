<template>
  <section class="chat-create">
    <div class="header">
      <div class="info">
        <h2 class="h4">Название обсуждения</h2>
        <UIInputSecondary
          fill
          placeholder="Придумайте название для обсуждения"
          v-model="name"
        />
      </div>
    </div>
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
        <GuildNewChatMember
          v-for="(member, index) in members"
          :key="member.user.tag"
          :member="member"
          v-model="membersSelectedArray[index]"
        />
      </div>
    </div>
    <div class="buttons">
      <UIButton
        type="primary"
        fontType="h5"
        :disabled="
          name === '' || membersSelectedArray.length === 0
        "
      >
        Сохранить
      </UIButton>
      <UIButton
        type="blank"
        fontType="h5"
        html-type="button"
        @click="$emit('close')"
      >
        Отмена
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';

defineProps<{
  members: GuildMember[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const name = defineModel<string>('name', {
  default: ''
});

const roleTitles = [
  'Все роли',
  'Администратор',
  'Модератор',
  'Участник'
];
const selectedRole = ref(0);

const search = ref('');

const isAllSelected = ref(false);

const membersSelectedArray = defineModel<boolean[]>('selected', {
  default: []
});

watch(isAllSelected, () => {
  membersSelectedArray.value = membersSelectedArray.value.map(
    () => isAllSelected.value
  );
});
</script>

<style lang="scss" scoped>
.chat-create {
  .header {
    display: flex;
    padding: 1.25rem 0;
    border-bottom: 1px solid $white;

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;

      h2 {
        margin-bottom: 0.5rem;
      }
    }
  }
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

  .buttons {
    width: 100%;
    margin-top: 2.5rem;

    display: flex;
    justify-content: flex-end;

    gap: 0.5rem;
  }
}
</style>
