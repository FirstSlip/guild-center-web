<template>
  <div class="guild-page">
    <div class="main-section">
      <GuildMainHeader
        :current-tab="selectedTab"
        :guild="guild"
        :guild-id="id"
        :is-in-guild="isInGuild"
        @settings="goToSettings"
        @refresh="refreshData"
      />
      <GuildMainChats
        :chats="guild?.chats || []"
        @create-chat="isChatModalOpened = true"
        v-if="selectedTab === 'discussions'"
      />
      <GuildMainTasks
        v-else-if="selectedTab === 'tasks'"
        :tasks="guild?.tasks || []"
        @create-task="
          () => {
            isTaskModalOpened = true;
            taskModalType = 'create';
          }
        "
        @open-task="openTask"
      />
      <GuildMainRules
        v-else-if="selectedTab === 'rules'"
        :rules="
          guild?.rules
            ? guild.rules.length > 0
              ? guild.rules[0]
              : null
            : null
        "
        @create-rule="isRuleModalOpened = true"
        @edit-rule="
          (title, description) => {
            isRuleModalOpened = true;
            rule.title = title;
            rule.description = description;
          }
        "
      />
      <GuildMainDescription
        v-else
        :games="guild?.games || []"
        :trends="guild?.trends || []"
      />
    </div>
    <GuildMainMembers :members="guild?.members || []" />
  </div>
  <WidgetsModalWrapper
    v-if="isTaskModalOpened"
    @close="isTaskModalOpened = false"
    @submit="
      () => {
        if (taskModalType === 'create') {
          createTask();
        } else {
          updateTask();
        }
      }
    "
  >
    <template #title>Создать задачу</template>
    <template #icon>
      <SVGSword />
    </template>
    <template #body>
      <GuildNewTask
        :guild-id="id"
        :members="guild?.members || []"
        v-model:name="taskBody.name"
        v-model:description="taskBody.description"
        v-model:reward="taskBody.reward"
        v-model:started="startedDate"
        v-model:ended="endedDate"
        v-model:selectedMembers="selectedMembers"
        v-model:subtasks="taskBody.missions"
        @close="isTaskModalOpened = false"
      />
    </template>
  </WidgetsModalWrapper>
  <WidgetsModalWrapper
    v-if="isChatModalOpened"
    @close="isChatModalOpened = false"
    @submit="createChat"
  >
    <template #title>Обсуждение</template>
    <template #icon>
      <SVGChat stroke="#fff" />
    </template>
    <template #body>
      <GuildNewChat
        :members="guild?.members || []"
        v-model:selected="chat.selectedMembers"
        v-model:name="chat.name"
        @close="isChatModalOpened = false"
      />
    </template>
  </WidgetsModalWrapper>
  <WidgetsModalWrapper
    v-if="isRuleModalOpened"
    @close="isRuleModalOpened = false"
    @submit="createRule"
  >
    <template #title>Правила</template>
    <template #icon>
      <SVGHammer />
    </template>
    <template #body>
      <GuildNewRule
        v-model:title="rule.title"
        v-model:description="rule.description"
        @close="isRuleModalOpened = false"
      />
    </template>
  </WidgetsModalWrapper>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';
import type { Task } from '@/ts/Task';

const route = useRoute();
const id = computed(() => route.params.id);
const selectedTab = computed(() => route.query.tab || '');
const profile = useProfile().user;

const { data: guild, refresh } = useAsyncData(
  `guild_${id.value}`,
  async () => {
    const response = await $api.guild.getById(id.value);
    if ($api.utils.isSuccess(response)) {
      return response.data.guild;
    }
    return null;
  }
);

const isRuleModalOpened = ref(false);
const isChatModalOpened = ref(false);
const isTaskModalOpened = ref(false);
const taskModalType = ref<'create' | 'edit' | ''>('');

watch(isTaskModalOpened, () => {
  if (!isTaskModalOpened.value) {
    clearTaskModal();
  }
});

const rule = ref({
  title: '',
  description: ''
});
const startedDate = ref({
  date: '',
  time: ''
});

const endedDate = ref({
  date: '',
  time: ''
});

const refreshData = async () => {
  await refresh();
  await useProfile().loadProfile();
};

watch(
  startedDate,
  () => {
    console.log('startedDate', startedDate.value);
  },
  { deep: true }
);

const selectedMembers = ref<boolean[]>(
  guild.value?.members.map(() => false) || []
);

watch(guild, () => {
  selectedMembers.value =
    guild.value?.members.map(() => false) || [];
});

const chat = ref<{
  name: string;
  selectedMembers: boolean[];
}>({
  name: '',
  selectedMembers: []
});

const taskBody = ref<Omit<Task, 'taskId'>>({
  name: '',
  description: '',
  reward: '',
  members: [],
  startedAt: '',
  endedAt: '',
  missions: []
});

const openTask = (taskId: string) => {
  const task: Task | undefined = guild.value?.tasks.find(
    (task) => task.taskId === taskId
  );
  if (!task) {
    return;
  }
  taskBody.value = task;
  isTaskModalOpened.value = true;
  taskModalType.value = 'edit';
};
const createRule = async () => {
  /* isRuleModalOpened.value = true; */
  console.log('createRule');
  const response = await $api.guild.addRule(
    id.value,
    rule.value.title,
    rule.value.description
  );
  if ($api.utils.isSuccess(response)) {
    isRuleModalOpened.value = false;
    await refreshData();
  }
};

const createTask = async () => {
  if (taskBody.value.name.length <= 0) {
    return;
  }
  if (startedDate.value.date) {
    taskBody.value.startedAt = new Date(
      startedDate.value.date
    ).toISOString();
  }
  if (endedDate.value.date) {
    taskBody.value.endedAt = new Date(
      endedDate.value.date
    ).toISOString();
  }
  if (selectedMembers.value.length > 0) {
    const members =
      guild.value?.members.filter((elm, index) => {
        if (selectedMembers.value[index]) {
          return elm;
        }
      }) || [];
    taskBody.value.members = members;
  }
  const response = await $api.guild.createTask(
    id.value,
    taskBody.value
  );
  if ($api.utils.isSuccess(response)) {
    isTaskModalOpened.value = false;
    await refreshData();
  }
};

const updateTask = async () => {
  if (taskBody.value.name.length <= 0) {
    return;
  }
  if (startedDate.value.date) {
    taskBody.value.startedAt = new Date(
      startedDate.value.date
    ).toISOString();
  }
  if (endedDate.value.date) {
    taskBody.value.endedAt = new Date(
      endedDate.value.date
    ).toISOString();
  }
  if (selectedMembers.value.length > 0) {
    const members =
      guild.value?.members.filter((elm, index) => {
        if (selectedMembers.value[index]) {
          return elm;
        }
      }) || [];
    taskBody.value.members = members;
  }
  const response = await $api.guild.updateTask(
    id.value,
    (taskBody.value as Task)?.taskId || '',
    taskBody.value
  );
  if ($api.utils.isSuccess(response)) {
    isTaskModalOpened.value = false;
    await refreshData();
  }
};

const clearTaskModal = () => {
  taskBody.value = {
    name: '',
    description: '',
    reward: '',
    members: [],
    startedAt: '',
    endedAt: '',
    missions: []
  };
  startedDate.value = {
    date: '',
    time: ''
  };
  endedDate.value = {
    date: '',
    time: ''
  };
  selectedMembers.value =
    guild.value?.members.map(() => false) || [];
  rule.value = {
    title: '',
    description: ''
  };
};

const createChat = async () => {
  if (chat.value.selectedMembers.length <= 0) {
    return;
  }
  if (chat.value.name === '') {
    return;
  }
  let members: GuildMember[] = [];
  if (chat.value.selectedMembers.length > 0) {
    members =
      guild.value?.members.filter((elm, index) => {
        if (chat.value.selectedMembers[index]) {
          return elm;
        }
      }) || [];
  }
  const response = await $api.guild.createChat(
    id.value,
    chat.value.name,
    members
  );
  console.log(response);
};

const isInGuild = computed(() => {
  if (!profile.value) return false;
  return profile.value.guilds.some(
    (guild) => guild.guildId === id.value
  );
});

watch(
  id,
  () => {
    refresh();
  },
  { immediate: true }
);

const goToSettings = () => {
  if (!guild.value) return;
  useGuild().setCurrentGuild(guild.value);
  useRouter().push(`/guild/${id.value}/settings`);
};

/* console.log('guild', guild.value); */

definePageMeta({ layout: 'guild' });
</script>

<style lang="scss" scoped>
.guild-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17.75rem;
  gap: 1.25rem;

  .main-section {
    width: 100%;
    height: 100%;
  }
}
</style>
