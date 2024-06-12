<template>
  <section class="settings-wrapper">
    <h1 class="h3">Настройки</h1>
    <div class="tabs">
      <UITabGroup
        :tabs="tabs"
        tabsType="secondary"
        :activeTab="currentTab"
        @click="(index) => $emit('switchTab', index)"
      />
      <UIButton font-type="h5">Удалить гильдию</UIButton>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="buttons">
      <UIButton
        type="primary"
        fontType="h5"
        :disabled="!wasChanged"
        @click="$emit('save')"
      >
        Сохранить изменения
      </UIButton>
      <UIButton type="blank" fontType="h5">
        Вернуться в профиль
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  currentTab: number;
  tabs: string[];
  wasChanged?: boolean;
}>();
defineEmits<{
  (e: 'switchTab', index: number): void;
  (e: 'save'): void;
}>();
/* const currentTab = computed(() => useRoute().path); */
/* const tabs = [
  { title: 'Профиль', href: '/profile/settings' },
  { title: 'Приватность', href: '/profile/settings/privacy' },
  {
    title: 'Личные данные',
    href: '/profile/settings/personal-data'
  }
]; */

/* const currentTabIndex = computed(() => {
  return props.tabs.findIndex(
    (tab) =>
      tab.href === currentTab.value ||
      tab.href === currentTab.value.slice(0, -1)
  );
}); */

/* const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
}; */
</script>

<style lang="scss" scoped>
section.settings-wrapper {
  max-width: 58.125rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 1.5rem 2.5rem;

  overflow: hidden;

  background: $light-purple;

  h1.h3 {
    padding-bottom: 1rem;
  }

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
