<template>
  <div class="new-task">
    <div class="tabs">
      <UITabGroup
        :tabs="tabs"
        tabsType="secondary"
        :activeTab="currentTab"
        @click="(index) => (currentTab = index)"
      />
      <UIButton font-type="h5" html-type="button">
        Удалить
      </UIButton>
    </div>
    <div class="main">
      <GuildNewTaskMainSection
        v-if="currentTab === 0"
        v-model:name="name"
        v-model:description="description"
        v-model:reward="reward"
      />
      <GuildNewTaskDate
        v-else-if="currentTab === 1"
        v-model:started="startedDate"
        v-model:ended="endedDate"
      />
      <GuildNewTaskMembers
        v-else-if="currentTab === 2"
        :members="members"
        v-model="membersSelectedArray"
      />
      <GuildNewTaskSubtasks
        v-else-if="currentTab === 3"
        v-model="subtasks"
      />
    </div>
    <div class="buttons">
      <UIButton
        type="primary"
        fontType="h5"
        :disabled="!wasChanged"
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
  </div>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';
import type { Mission } from '@/ts/Mission';

defineProps<{
  members: GuildMember[];
  guildId: string;
}>();
defineEmits<{
  (e: 'close'): void;
}>();
const tabs = ['Общий раздел', 'Дата', 'Участники', 'Чек-лист'];
const currentTab = ref(0);
const wasChanged = computed(() => {
  if (name.value) return true;
  return false;
});

const subtasks = defineModel<Mission[]>('subtasks', {
  default: {
    name: '',
    done: false
  }
});

const name = defineModel<string>('name', {
  default: ''
});
const description = defineModel<string>('description', {
  default: ''
});
const reward = defineModel<string>('reward', {
  default: ''
});

const startedDate = defineModel('started', {
  default: {
    date: '',
    time: ''
  }
});

const endedDate = defineModel('ended', {
  default: {
    date: '',
    time: ''
  }
});

const membersSelectedArray = defineModel<boolean[]>(
  'selectedMembers',
  {
    default: []
  }
);
</script>

<style lang="scss" scoped>
.new-task {
  .tabs {
    width: 100%;
    border-bottom: 1px solid $stroke-white;
    margin-bottom: 1rem;

    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    justify-content: space-between;

    button.button {
      margin-bottom: 0.375rem;
      background-color: #f04451;
      color: $text-white;

      &:hover {
        background-color: #f0445180;
      }
    }
  }

  .main {
    width: 100%;
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
