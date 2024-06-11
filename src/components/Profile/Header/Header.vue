<template>
  <section class="profile-header">
    <div
      class="banner"
      :style="
        profile?.banner
          ? `background-image: url(${profile.banner})`
          : `background: ${bannerColor}`
      "
    ></div>
    <div class="main">
      <div class="user-info">
        <div class="user-avatar">
          <WidgetsAvatar
            :avatar-url="profile?.avatar"
            :name="profile?.username || 'Загрузка...'"
          />
        </div>
        <div class="info">
          <h1 class="h4">
            <span>
              {{ profile?.username || 'Загрузка...' }}
            </span>
            <span>#{{ id || 'Загрузка...' }}</span>
            <UIButton
              v-if="isMyProfile"
              class="edit-profile"
              font-type="h5"
              padding="0 1.25rem"
              border-radius="0.25rem"
              @click="$router.push(`/profile_${id}/settings`)"
            >
              Редактировать профиль
            </UIButton>
          </h1>
          <span class="h5">
            {{ profile?.description || '' }}
          </span>
        </div>
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
import { generateAvatarColor } from '@/common/func/generateAvatarColor';
import type { User } from '@/ts/User';
const props = defineProps<{
  currentTab: 'accounts' | 'integrations' | 'calendar' | '';
  profile: User | null;
  id: string;
  isMyProfile: boolean;
}>();

const bannerColor = computed(() => {
  return generateAvatarColor(
    props.profile?.username || 'Загрузка...'
  ).bg;
});
/* const currentTab = computed(() => useRoute().path); */
const tabs = [
  {
    title: 'комментарии',
    href: `/profile_${props.id}`,
    tab: ''
  },
  {
    title: 'игровые аккаунты',
    href: `/profile_${props.id}?tab=accounts`,
    tab: 'accounts'
  },
  {
    title: 'интеграции',
    href: `/profile_${props.id}?tab=integrations`,
    tab: 'integrations'
  },
  {
    title: 'календарь',
    href: `/profile_${props.id}?tab=calendar`,
    tab: 'calendar'
  }
];

const currentTabIndex = computed(() => {
  return tabs.findIndex((tab) => props.currentTab === tab.tab);
});

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};
</script>

<style lang="scss" scoped>
section.profile-header {
  border-radius: 1rem;
  overflow: hidden;

  .banner {
    width: 100%;
    /* height: 12.5rem; */
    aspect-ratio: 5 / 1;

    background: linear-gradient(
      235deg,
      #07c6bf 0%,
      #98537e 50%,
      #ff0050 98%
    );
    background-size: 100% 100%;
    background-position: center;
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

      position: relative;

      padding-top: 0.375rem;

      .user-avatar {
        width: 7.5rem;
        height: 7.5rem;
        min-width: 7.5rem;
        min-height: 7.5rem;

        position: absolute;
        top: calc(-100% + 0.375rem);

        border: 6px solid $background-light-purple;
        border-radius: 100%;
      }

      .info {
        width: 100%;
        margin-left: 8.125rem;

        h1 {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;

          .edit-profile {
            margin-left: auto;
          }
        }

        span.h5 {
          text-overflow: ellipsis;
          word-wrap: break-word;

          display: block;
          min-height: calc(1rem * 1.55);
          min-width: 1rem;
        }
      }
    }

    .tabs {
      align-self: center;
    }
  }
}
</style>
