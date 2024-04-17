<template>
  <section class="profile-header">
    <div class="banner"></div>
    <div class="main">
      <div class="user-info">
        <div class="user-avatar">
          <WidgetsAvatar
            :avatar-url="user?.avatar"
            :name="user?.name || 'Error'"
          />
        </div>
        <div class="info">
          <h1 class="h4">
            <span>{{ user?.name || 'Error' }}</span>
            <span>{{ user?.tag || 'Error' }}</span>
          </h1>
          <span class="h5">статус “обо мне”</span>
        </div>
        <UIButton
          font-type="h5"
          padding="0 1.25rem"
          border-radius="0.25rem"
        >
          Редактировать профиль
        </UIButton>
      </div>
      <div class="tabs">
        <UITabGroup
          :tabs="tabs.map((tab) => tab.title)"
          :activeTab="currentTabIndex"
          @click="switchTab"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { User } from '@/ts/User';

const user = computed(() => useState<User | null>('user').value);
/* const props = defineProps<{
  currentTab: string;
}>(); */
const currentTab = computed(() => useRoute().path);
const tabs = [
  { title: 'комментарии', href: '/profile' },
  { title: 'игровые аккаунты', href: '/profile/accounts' },
  { title: 'интеграции', href: '/profile/integrations' },
  { title: 'календарь', href: '/profile/calendar' }
];

const currentTabIndex = computed(() => {
  return tabs.findIndex(
    (tab) =>
      tab.href === currentTab.value ||
      tab.href === currentTab.value.slice(0, -1)
  );
});

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};
</script>

<style lang="scss" scoped>
section.profile-header {
  border-radius: 1.25rem;
  overflow: hidden;

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

  .main {
    height: 8.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2.5rem 1rem;

    background: $background-light-purple;

    .user-info {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      justify-content: space-between;

      position: relative;

      padding-top: 0.375rem;

      .user-avatar {
        width: 7.5rem;
        height: 7.5rem;
        min-width: 7.5rem;
        min-height: 7.5rem;

        position: absolute;
        top: -100%;

        border-radius: 100%;
        box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.4);
      }

      .info {
        margin-left: 8.125rem;

        h1 {
          display: flex;
          gap: 1rem;
        }
      }

      button {
        margin-top: 0.375rem;
      }
    }

    .tabs {
      align-self: center;
    }
  }
}
</style>
