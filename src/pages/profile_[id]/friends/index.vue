<template>
  <ProfileFriendsWrapper
    :currentTab="currentTabIndex"
    :tabs="tabs.map((tab) => tab.title)"
    @switchTab="(index) => switchTab(index)"
  >
    <transition name="settings" mode="out-in">
      <ProfileFriendsMain
        :friends="mockFriends"
        v-if="currentTab === ''"
      />
      <ProfileFriendsRequests
        v-else-if="currentTab === 'requests'"
        :requests="mockRequests"
      />
      <ProfileFriendsBlocked
        v-else-if="currentTab === 'blocked'"
        :blocked-users="mockBlocked"
      />
      <ProfileFriendsSearch
        v-else-if="currentTab === 'search'"
      />
    </transition>
  </ProfileFriendsWrapper>
</template>

<script lang="ts" setup>
const route = useRoute();
const currentTab = computed<string>(() => route.query.tab || '');
const tabs = [
  {
    title: 'Ваши друзья',
    href: `/profile_${route.params.id}/friends`,
    tab: ''
  },
  {
    title: 'Запросы на дружбу',
    href: `/profile_${route.params.id}/friends?tab=requests`,
    tab: 'requests'
  },
  {
    title: 'Заблокированные',
    href: `/profile_${route.params.id}/friends?tab=blocked`,
    tab: 'blocked'
  },
  {
    title: 'Найти друга',
    href: `/profile_${route.params.id}/friends?tab=search`,
    tab: 'search'
  }
];

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};

const currentTabIndex = computed(() => {
  return tabs.findIndex((tab) => currentTab.value === tab.tab);
});

const mockFriends = ref([
  {
    tag: '123123',
    username: 'username',
    avatar: ''
  },
  {
    tag: '123123',
    username: 'Степан',
    avatar: ''
  },
  {
    tag: '123123',
    username: 'FFF',
    avatar: ''
  }
]);
const mockRequests = ref<
  {
    tag: string;
    username: string;
    avatar: string;
    requestType: 'incoming' | 'outcoming';
  }[]
>([
  {
    tag: '123123',
    username: 'chel_out',
    avatar: '',
    requestType: 'outcoming'
  },
  {
    tag: '123123',
    username: 'chel1123_out',
    avatar: '',
    requestType: 'outcoming'
  },
  {
    tag: '123123',
    username: 'chel3333_in',
    avatar: '',
    requestType: 'incoming'
  },
  {
    tag: '123123',
    username: 'chel310000000_out',
    avatar: '',
    requestType: 'outcoming'
  },
  {
    tag: '123123',
    username: 'chel310000000_in',
    avatar: '',
    requestType: 'incoming'
  }
]);
const mockBlocked = ref([
  {
    tag: '123123',
    username: 'username',
    avatar: ''
  },
  {
    tag: '123123',
    username: 'НеСтепан',
    avatar: ''
  },
  {
    tag: '123123',
    username: 'НеПавел',
    avatar: ''
  }
]);
</script>

<style></style>
