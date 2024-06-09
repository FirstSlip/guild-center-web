<template>
  <nuxt-link class="card" :to="`/guild/${guild.guildId}`">
    <div
      class="banner"
      :style="{ backgroundColor: bannerColor }"
    ></div>
    <div class="header">
      <div class="guild-avatar">
        <WidgetsAvatar
          type="Guild"
          :name="guild.name"
          :avatar-url="guild.avatar"
        />
      </div>
      <div class="info">
        <h2 class="h4">{{ guild.name }}</h2>
        <p class="p4">
          {{ guild.description }}
        </p>
        <p class="p4">
          Количество участников: {{ guild.members?.length || 0 }}
        </p>
      </div>
    </div>
    <div class="footer">
      <img
        v-for="(game, index) in guild.games"
        :key="index"
        class="game"
        :src="`/img/games/${game.name.replaceAll(' ', '_')}.png`"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';
import type { Guild } from '@/ts/Guild';

const props = defineProps<{
  guild: Guild;
}>();

console.log(props.guild);

const bannerColor = computed(() => {
  return generateAvatarColor(props.guild.name).bg;
});
</script>

<style lang="scss" scoped>
a.card {
  position: relative;
  width: 100%;
  height: 8.75rem;
  border-radius: 1.25rem;
  overflow: hidden;

  text-decoration: none;

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
    height: calc(8.75rem - 3.125rem);
    display: flex;
    gap: 0.625rem;
    padding: 0.5rem 1.25rem;

    z-index: 1;
    flex-flow: row;

    .guild-avatar {
      width: 4.375rem;
      height: 4.375rem;
      border: 3px solid $light-purple;
      border-radius: 100%;
      flex-shrink: 0;
    }

    .info {
      flex-shrink: 1;
      flex-grow: 0;
      max-width: calc(100% - 4.375rem - 0.625rem);

      h2,
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
