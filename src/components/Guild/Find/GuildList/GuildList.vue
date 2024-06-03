<template>
  <section class="guild-list">
    <div class="search">
      <UIInput placeholder="Поиск гильдии" v-model="search" />
    </div>
    <div class="guilds">
      <GuildFindGuildListCard
        v-for="guild in guilds"
        :key="guild.id"
        :id="guild.id"
        :name="guild.name"
        :avatar-url="guild.avatarUrl"
        :banner-url="guild.bannerUrl"
        :games="guild.games"
        :types="guild.types"
        :genres="guild.genres"
        :members-count="guild.membersCount"
        :description="guild.description || ''"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Guild } from '@/ts/Guild';

defineProps<{
  guilds: Guild[];
}>();
const search = defineModel<string>('search');
</script>

<style lang="scss" scoped>
section.guild-list {
  width: 100%;
  margin-left: auto;
  max-width: 59rem;

  .search {
    width: 100%;
    background-color: $line-light;
    border-radius: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .guilds {
    display: grid;
    gap: 1.375rem;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
