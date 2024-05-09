<template>
  <ProfileSettingsWrapper
    :currentTab="currentTab"
    :tabs="tabs"
    @switchTab="(index) => (currentTab = index)"
  >
    <transition name="settings" mode="out-in">
      <ProfileSettingsMain
        v-if="currentTab === 0"
        v-model:username="username"
        v-model:about="about"
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
const tabs = ['Профиль', 'Приватность', 'Личные данные'];
const currentTab = ref(0);

const username = ref('');
const about = ref('');
const avatarSrc = ref(null);
const bannerSrc = ref(null);

watch([username, about, avatarSrc, bannerSrc], () => {
  console.log(
    username.value,
    about.value,
    avatarSrc.value,
    bannerSrc.value
  );
});

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
