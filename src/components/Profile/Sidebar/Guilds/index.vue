<template>
  <div class="guilds">
    <h2 class="h4">
      <span>Гильдии</span>
      <span class="h5">{{ guilds.length }}</span>
    </h2>
    <ProfileSidebarGuildsCard
      v-for="(guild, index) in guilds"
      :key="index"
      :name="guild.name"
      :avatar-url="guild.avatarUrl"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  guilds: {
    name: string;
    avatarUrl?: string;
  }[];
}>();
</script>

<style lang="scss" scoped>
.guilds {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  h2.h4 {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
