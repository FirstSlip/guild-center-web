<template>
  <nuxt-link class="guild-card" :to="`/guild/${guild.guildId}`">
    <div class="header">
      <img
        v-if="guild.banner"
        :src="guild.banner"
        :alt="guild.name"
        class="banner"
      />
      <div
        class="banner"
        v-else
        :style="{ backgroundColor: bannerColor }"
      ></div>
      <div class="guild-avatar">
        <WidgetsAvatar
          :avatar-url="guild.avatar || ''"
          :name="guild.name || ''"
          type="Guild"
        />
      </div>
      <div class="games">
        <img
          v-for="game in guild.games"
          :src="`/img/games/${game.name.replaceAll(' ', '_').replaceAll(':', '')}.png`"
          :alt="game.name"
        />
      </div>
    </div>
    <div class="main">
      <p class="h5">{{ guild.name }}</p>
      <p class="p4">{{ guild.description }}</p>
      <p class="p4">
        Количество участников: {{ guild.membersLength }}
      </p>
      <div class="types">
        <span v-for="guildType in guild.trends" class="type">
          {{ guildType }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';
import type { Guild } from '@/ts/Guild';

const props = defineProps<{
  guild: Guild;
}>();

const bannerColor = computed(
  () => generateAvatarColor(props.guild.name).bg
);
console.log(props.guild.name, props.guild.banner);
</script>

<style lang="scss" scoped>
a.guild-card {
  background-color: #202833;
  border: none;
  display: flex;
  flex-direction: column;
  border-radius: 0.94rem;
  overflow: hidden;

  text-decoration: none;

  cursor: pointer;
  user-select: none;

  .header {
    z-index: 1;
    position: relative;
    width: 100%;
    aspect-ratio: 5 / 1;
    padding: 0.5rem 1rem 0 1rem;

    .guild-avatar {
      position: absolute;
      width: 4.375rem;
      height: 4.375rem;
      top: calc(100% - 4.375rem / 2);
      left: 1rem;
      border: 3px solid #202833;
      border-radius: 100%;
    }

    .banner {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      object-position: center;
    }

    .games {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      z-index: 1;
      display: flex;
      gap: 0.5rem;

      img {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
  }

  .main {
    padding: calc(4.375rem / 2 + 0.5rem) 1rem 0.5rem 1rem;
    width: 100%;

    p {
      margin-bottom: 0.5rem;
    }

    .types {
      display: flex;
      gap: 0.25rem;
      margin-top: auto;

      .type {
        padding: 0.125rem 0.5rem;
        background-color: $main;
        border-radius: 0.625rem;

        color: $text-dark;
      }
    }
  }
}
</style>
