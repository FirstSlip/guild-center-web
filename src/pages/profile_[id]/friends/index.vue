<template>
  <ProfileFriendsWrapper
    :currentTab="currentTabIndex"
    :tabs="tabs.map((tab) => tab.title)"
    @switchTab="(index) => switchTab(index)"
  >
    <transition name="settings" mode="out-in">
      <ProfileFriendsMain
        :friends="profile?.friends || []"
        v-if="currentTab === ''"
      />
      <ProfileFriendsRequests
        v-else-if="currentTab === 'requests'"
        :requests="profile?.friendRequests || []"
        :my-tag="profile?.tag || ''"
        @accepted="onAccepted"
        @declined="onDeclined"
      />
      <ProfileFriendsBlocked
        v-else-if="currentTab === 'blocked'"
        :blocked-users="mockBlocked"
      />
      <ProfileFriendsSearch
        v-else-if="currentTab === 'search'"
        :my-friends="profile?.friends || []"
        :requests="profile?.friendRequests || []"
        :my-tag="profile?.tag || ''"
      />
    </transition>
  </ProfileFriendsWrapper>
</template>

<script lang="ts" setup>
const profile = useProfile().user;
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

const onAccepted = async (code: string) => {
  await useProfile().loadProfile();
};

const onDeclined = (code: string) => {
  if (!profile.value) return;
  const requestsWithoutDeclined =
    profile.value.friendRequests.filter(
      (request) => request.code !== code
    );
  profile.value.friendRequests = requestsWithoutDeclined;
};

const switchTab = (index: number) => {
  useRouter().push(tabs[index].href);
};

const currentTabIndex = computed(() => {
  return tabs.findIndex((tab) => currentTab.value === tab.tab);
});
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
