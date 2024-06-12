<template>
  <div class="profile-page">
    <ProfileHeader
      :current-tab="selectedTab"
      :profile="finalUser"
      :id="id"
      :is-my-profile="isMyProfile"
    />
    <div
      :class="[
        'profile',
        selectedTab === 'calendar' && 'filled'
      ]"
    >
      <ProfileAccounts
        v-if="selectedTab === 'accounts'"
        :accounts="finalUser?.gameAccounts || []"
      />
      <ProfileGames
        v-else-if="selectedTab === 'games'"
        :games="finalUser?.games || []"
        :is-my-profile="isMyProfile"
        @added="addGame"
        @deleted="deleteGame"
      />
      <ProfileCalendar v-else-if="selectedTab === 'calendar'" />
      <ProfileComments
        v-else
        :user="finalUser"
        :id="id"
        :is-my-profile="isMyProfile"
        :my-profile="profile"
        @comment-sent="onCommentSent"
      />
      <ProfileSidebar
        v-if="selectedTab !== 'calendar'"
        :friends="finalUser?.friends || []"
        :guilds="finalUser?.guilds || []"
        :is-my-profile="isMyProfile"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = computed(() => route.params.id);
const selectedTab = computed(() => route.query.tab || '');

const profile = useProfile().user;
const { data: user, refresh } = useAsyncData(
  `user_${id.value}`,
  async () => {
    const response = await $api.user.getByTag(id.value);
    if ($api.utils.isSuccess(response)) {
      return response.data.user;
    }
    return null;
  }
);

watch(
  id,
  () => {
    refresh();
  },
  { immediate: true }
);

const isMyProfile = computed(
  () => profile.value?.tag === id.value
);

const isFriend = computed(() => {
  if (isMyProfile.value) {
    return false;
  }
  return (
    profile.value?.friends?.some(
      (friend) => friend.tag === id.value
    ) || false
  );
});

const finalUser = computed(() => {
  if (isMyProfile.value) {
    return profile.value;
  } else {
    return user.value;
  }
});

const addGame = (game: string) => {
  profile.value?.games?.push(game);
};

const deleteGame = (game: string) => {
  const index = profile.value?.games?.indexOf(game);
  if (index !== undefined && index > -1) {
    profile.value?.games?.splice(index, 1);
  }
};

const onCommentSent = () => {
  useProfile().loadProfile();
  refresh();
};
definePageMeta({
  layout: 'profile',
  pageTransition: { name: 'profile-fade', mode: 'out-in' }
});
</script>

<style lang="scss" scoped>
.profile {
  margin-top: 1.875rem;

  display: grid;
  grid-template-columns: calc(67% - 1rem) 33%;
  gap: 1rem;

  &.filled {
    display: block;
  }
}

.profile-fade-enter-active,
.profile-fade-leave-active {
  transition: all 0.3s ease;
}
.profile-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.profile-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
