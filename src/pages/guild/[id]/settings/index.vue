<template>
  <GuildSettingsWrapper
    :currentTab="currentTab"
    :tabs="tabs"
    :wasChanged="true"
    @switchTab="(index) => (currentTab = index)"
    @save="save"
  >
    <transition name="settings" mode="out-in">
      <GuildSettingsMain
        v-if="currentTab === 0"
        :current-name="guild?.name || ''"
        v-model:name="name"
        v-model:description="description"
        v-model:avatarSrc="avatarSrc"
        v-model:bannerSrc="bannerSrc"
      />
      <GuildSettingsMembers
        v-else-if="currentTab === 1"
        :members="guild?.members || []"
        @update-member="
          (tag, role) =>
            updatedMember.push({
              tag,
              role
            })
        "
        @delete-member="
          (tag) => {
            if (guild?.members) {
              guild.members = guild?.members.filter(
                (m) => m.user.tag !== tag
              );
            }
          }
        "
      />
      <GuildSettingsRequests
        v-else-if="currentTab === 2"
        :requests="[]"
      />
      <GuildSettingsPrivacy
        v-else-if="currentTab === 3"
        v-model:all="all"
        v-model:friends="friends"
        v-model:guilds="guilds"
        v-model:comments="comments"
        v-model:events="events"
      />
      <GuildSettingsPersonal v-else-if="currentTab === 2" />
    </transition>
  </GuildSettingsWrapper>
</template>

<script lang="ts" setup>
import type { GuildMember } from '@/ts/GuildMember';
import type { Role } from '@/ts/Role';

const guild = useGuild().currentGuild;
if (!guild.value) {
}
/* const wasChanged = ref(false); */
const wasChanged = computed(() => {
  if (guild.value?.name !== name.value) return true;
  if (guild.value?.description !== description.value)
    return true;
  if (guild.value?.avatar !== avatarSrc.value) return true;
  if (guild.value?.banner !== bannerSrc.value) return true;
  return false;
});
const tabs = [
  'Персонализация',
  'Участники',
  'Заявки',
  'Приватность'
];
const currentTab = ref(0);

const name = ref(guild.value?.name || '');
const description = ref(guild.value?.description || '');
const avatarSrc: Ref<string> = ref(guild.value?.avatar || '');
const bannerSrc: Ref<string> = ref(guild.value?.banner || '');
guild;
const all = ref(0);
const friends = ref(0);
const guilds = ref(0);
const comments = ref(0);
const events = ref(0);

const updatedMember = ref<
  {
    tag: string;
    role: string;
  }[]
>([]);

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
  console.log('save', updatedMember.value);
  const tags = updatedMember.value.map((m) => m.tag);
  let membersToChange: GuildMember[] = [];
  if (guild.value) {
    membersToChange = guild.value?.members.map((m) => {
      if (tags.includes(m.user.tag)) {
        return {
          ...m,
          role:
            (updatedMember.value.find(
              (u) => u.tag === m.user.tag
            )?.role as Role) || m.role
        };
      }
      return m;
    });
  }
  if (!guild.value) {
    return;
  }
  const response = await $api.guild.update(guild.value.guildId, {
    name: name.value,
    description: description.value,
    avatar: avatarSrc.value,
    banner: bannerSrc.value
  });
  const response1 = await $api.guild.changeMembers(
    guild.value.guildId,
    membersToChange
  );
  if (
    'success' in response &&
    response.success &&
    'success' in response1
  ) {
    await useProfile().loadProfile();
    useRouter().push(`/guild/${guild.value.guildId}`);
  }
};

definePageMeta({
  middleware: 'guild-settings'
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
