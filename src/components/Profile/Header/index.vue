<template>
  <div class="profile-header">
    <div class="user-info">
      <div class="banner"></div>
      <div class="info"></div>
    </div>
    <div class="tabs">
      <UITabGroup
        :tabs="tabs.map((tab) => tab.title)"
        :activeTab="currentTabIndex"
        @click="switchTab"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentTab: string;
}>();
const tabs = [
  { title: 'комментарии', href: '/profile' },
  { title: 'игровые аккаунты', href: '/profile/accounts' },
  { title: 'интеграции', href: '/profile/integrations' },
  { title: 'календарь', href: '/profile/calendar' }
];

const currentTabIndex = computed(() => {
  return tabs.findIndex((tab) => tab.href === props.currentTab);
});

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};
</script>

<style lang="scss" scoped>
.profile-header {
  border-radius: 1.25rem;
  overflow: hidden;

  .user-info {
    .banner {
      width: 100%;
      height: 12.5rem;

      background: linear-gradient(
        235deg,
        #07c6bf 0%,
        #98537e 50%,
        #ff0050 98%
      );
    }
  }

  .tabs {
    height: 7.5rem;

    background: $background-light-purple;
  }
}
</style>
