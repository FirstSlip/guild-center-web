<template>
  <section class="guild-header">
    <div
      class="banner"
      :style="
        guild?.banner
          ? `background-image: url(${guild.banner})`
          : `background: ${bannerColor}`
      "
    ></div>
    <div class="main">
      <div class="guild-info">
        <div class="guild-avatar">
          <WidgetsAvatar
            :avatar-url="guild?.avatar"
            :name="guild?.name || 'Загрузка...'"
          />
        </div>
        <div class="info">
          <h1 class="h4">
            <span>
              {{ guild?.name || 'Загрузка...' }}
            </span>
          </h1>
          <span class="h5">{{ guild?.description || '' }}</span>
        </div>
        <UIButton
          v-if="!isInGuild"
          font-type="h5"
          padding="0 1.25rem"
          border-radius="0.25rem"
          @click="joinGuild"
        >
          Вступить в гильдию
        </UIButton>
        <div v-else class="other-tools">
          <UIButton
            font-type="h5"
            padding="0 1.25rem"
            border-radius="0.25rem"
            @click="$router.push('/profile/settings')"
          >
            Покинуть гильдию
          </UIButton>
          <button class="settings" @click="$emit('settings')">
            <SVGSettings />
          </button>
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
import type { Guild } from '@/ts/Guild';
const props = defineProps<{
  currentTab:
    | ''
    | 'rules'
    | 'discussions'
    | 'tasks'
    | 'calendar';
  guild: Guild | null;
  guildId: string;
  isInGuild: boolean;
}>();
const emit = defineEmits<{
  (e: 'settings'): void;
  (e: 'refresh'): void;
}>();

const route = useRoute();
const currentGuildId = computed(
  () => Number(route.params.id) || null
);

const bannerColor = computed(() => {
  return generateAvatarColor(props.guild?.name || 'Загрузка...')
    .bg;
});

const tabs = [
  {
    title: 'описание',
    href: `/guild/${currentGuildId.value}`,
    tab: ''
  },
  {
    title: 'правила',
    href: `/guild/${currentGuildId.value}?tab=rules`,
    tab: 'rules'
  },
  {
    title: 'обсуждения',
    href: `/guild/${currentGuildId.value}?tab=discussions`,
    tab: 'discussions'
  },
  {
    title: 'задания',
    href: `/guild/${currentGuildId.value}?tab=tasks`,
    tab: 'tasks'
  },
  {
    title: 'календарь',
    href: `/guild/${currentGuildId.value}?tab=calendar`,
    tab: 'calendar'
  }
];

const currentTabIndex = computed(() => {
  return tabs.findIndex((tab) => props.currentTab === tab.tab);
});

const joinGuild = async () => {
  const response = await $api.guild.joinGuild(props.guildId);
  if ('success' in response) {
    emit('refresh');
  }
};

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};
</script>

<style lang="scss" scoped>
section.guild-header {
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

    .guild-info {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      justify-content: space-between;

      position: relative;

      padding-top: 0.375rem;

      .guild-avatar {
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
        margin-left: 8.125rem;

        h1 {
          display: flex;
          gap: 1rem;
        }

        span.h5 {
          display: block;
          width: 5rem;
          height: calc(1rem * 1.55);
          min-width: 5rem;
          min-height: calc(1rem * 1.55);
        }
      }

      button {
        margin-top: 0.375rem;
      }

      .other-tools {
        margin-top: 0.375rem;
        display: flex;
        align-items: center;
        gap: 0.625rem;

        button {
          margin: 0;
        }

        .settings {
          width: 1.5rem;
          height: 1.5rem;
          padding: 0.25rem;

          background: $light-gray;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;

          transition: opacity 0.3s ease;

          svg {
            width: 100%;
            height: 100%;
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .tabs {
      align-self: center;
    }
  }
}
</style>
