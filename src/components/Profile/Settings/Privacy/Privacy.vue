<template>
  <div class="privacy" @click="() => closeMenu()">
    <p class="p1">
      Настройки приватности помогут вам контролировать, какая
      информация о вас видна другим пользвателям на платформе
      GuildCenter.
    </p>
    <div class="elements">
      <ProfileSettingsPrivacyOption
        :options="privacyOptions"
        v-model="settings[0].selectedOption"
        v-model:opened="settings[0].opened"
        @select-click="() => closeMenu(0)"
      >
        <template #title>{{ settings[0].title }}</template>
      </ProfileSettingsPrivacyOption>
      <p class="p1">Настраиваемые элементы приватности:</p>
      <ProfileSettingsPrivacyOption
        v-for="(setting, index) in settings.slice(1)"
        :key="index"
        :options="privacyOptions"
        v-model="setting.selectedOption"
        v-model:opened="setting.opened"
        @select-click="() => closeMenu(index + 1)"
      >
        <template #title>{{ setting.title }}</template>
        <template #description>
          {{ setting.description }}
        </template>
      </ProfileSettingsPrivacyOption>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* const mainOption = ref({
  opened: false,
  selectedOption: 0
}); */
const privacyOptions = ['Открытый', 'Для друзей', 'Закрытый'];
const settings = ref([
  {
    title: 'Мой профиль:',
    description: '',
    opened: false,
    selectedOption: 0
  },
  {
    title: 'Список друзей:',
    description:
      'Укажите, кому в вашем профиле будет виден список друзей.',
    opened: false,
    selectedOption: 0
  },
  {
    title: 'Список гильдий:',
    description:
      'Укажите, кому в вашем профиле будет виден список гильдий.',
    opened: false,
    selectedOption: 0
  },
  {
    title: 'Раздел комментариев:',
    description:
      'Укажите, кто может оставлять комментарии в вашем профиле.',
    opened: false,
    selectedOption: 0
  },
  {
    title: 'Календарь событий:',
    description:
      'Укажите, кто может видеть ваше расписание событий и приглашение на мероприятия.',
    opened: false,
    selectedOption: 0
  }
]);
const all = defineModel<number>('all', { default: 0 });
const friends = defineModel<number>('friends', { default: 0 });
const guilds = defineModel<number>('guilds', { default: 0 });
const comments = defineModel<number>('comments', { default: 0 });
const events = defineModel<number>('events', { default: 0 });

watch(
  settings,
  () => {
    all.value = settings.value[0].selectedOption;
    friends.value = settings.value[1].selectedOption;
    guilds.value = settings.value[2].selectedOption;
    comments.value = settings.value[3].selectedOption;
    events.value = settings.value[4].selectedOption;
  },
  { deep: true }
);

const closeMenu = (index: number | null = null) => {
  if (index !== null) {
    for (const setting of settings.value) {
      if (index !== settings.value.indexOf(setting)) {
        setting.opened = false;
      }
    }
    return;
  }
  for (const setting of settings.value) {
    setting.opened = false;
  }
};
</script>

<style lang="scss" scoped>
.privacy {
  width: 100%;

  > p.p1 {
    padding: 0.75rem 0 0.5rem;
  }

  .elements {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.p1 {
      padding: 0.5rem;
      margin-top: 0.75rem;
    }
  }
}
</style>
