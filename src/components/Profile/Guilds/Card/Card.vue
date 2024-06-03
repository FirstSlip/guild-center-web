<template>
  <div class="card">
    <div
      class="banner"
      :style="{ backgroundColor: bannerColor }"
    ></div>
    <div class="header">
      <div class="guild-avatar">
        <WidgetsAvatar type="Guild" :name="guild.name" />
      </div>
      <div class="info">
        <h2 class="h4">{{ guild.name }}</h2>
        <p class="p4">Краткое описание гильдии {{}}</p>
        <p class="p4">Количество участников: {{}}</p>
      </div>
    </div>
    <div class="footer">
      <div v-for="game in guild.games" class="game"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';

const props = defineProps<{
  guild: {
    id: number;
    name: string;
    avatarUrl?: string;
    bannerUrl?: string;
    games: [];
  };
}>();

const bannerColor = computed(() => {
  return generateAvatarColor(props.guild.name).bg;
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  height: 8.75rem;
  border-radius: 1.25rem;
  overflow: hidden;

  .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.625rem;

    opacity: 0.4;
  }

  .header {
    position: relative;
    width: 100%;
    display: flex;
    gap: 0.625rem;
    padding: 0.5rem 1.25rem;

    z-index: 1;

    .guild-avatar {
      width: 4.375rem;
      height: 4.375rem;
      border: 3px solid $light-purple;
      border-radius: 100%;
    }
  }

  .footer {
    width: 100%;
    height: 3.125rem;

    background-color: $dark-purple;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
