<template>
  <ProfileSettingsWrapper
    :currentTab="currentTab"
    :tabs="tabs"
    :wasChanged="wasChanged"
    @switchTab="(index) => (currentTab = index)"
    @save="save"
  >
    <transition name="settings" mode="out-in">
      <ProfileSettingsMain
        v-if="currentTab === 0"
        :shownUsername="profile?.shownUsername || ''"
        v-model:username="username"
        v-model:description="description"
        v-model:avatarSrc="avatarSrc"
        v-model:bannerSrc="bannerSrc"
      />
      <ProfileSettingsPrivacy
        v-else-if="currentTab === 1"
        v-model:all="all"
        v-model:friends="friends"
        v-model:guilds="guilds"
        v-model:comments="comments"
        v-model:events="events"
      />
      <ProfileSettingsPersonal v-else-if="currentTab === 2" />
    </transition>
  </ProfileSettingsWrapper>
</template>

<script lang="ts" setup>
const profile = useProfile().user;
/* const wasChanged = ref(false); */
const wasChanged = computed(() => {
  if (profile.value?.shownUsername !== username.value)
    return true;
  if (profile.value?.description !== description.value)
    return true;
  if (profile.value?.avatar !== avatarSrc.value) return true;
  if (profile.value?.banner !== bannerSrc.value) return true;
  return false;
});
const tabs = ['Профиль', 'Приватность', 'Личные данные'];
const currentTab = ref(0);

const username = ref(profile.value?.shownUsername || '');
const description = ref(profile.value?.description || '');
const avatarSrc: Ref<string> = ref(profile.value?.avatar || '');
const bannerSrc: Ref<string> = ref(profile.value?.banner || '');

const all = ref(0);
const friends = ref(0);
const guilds = ref(0);
const comments = ref(0);
const events = ref(0);

watch([all, friends, guilds, comments, events], () => {
  console.log(
    all.value,
    friends.value,
    guilds.value,
    comments.value,
    events.value
  );
});

const save = async () => {
  const user = useProfile().user;
  /* if (user.value) {
    user.value.shownUsername = username.value;
    if (avatarSrc.value) user.value.avatar = avatarSrc.value;
    if (bannerSrc.value) user.value.banner = bannerSrc.value;
  } */
  const response = await $api.user.update({
    shownUsername: username.value,
    description: description.value,
    avatar: avatarSrc.value,
    banner: bannerSrc.value
  });
  if ('success' in response && response.success) {
    await useProfile().loadProfile();
    useRouter().push('/profile');
  }
};
</script>

<style>
.settings-enter-active,
.settings-leave-active {
  transition: opacity 0.3s ease;
}
.settings-enter-from,
.settings-leave-to {
  opacity: 0;
}
</style>
