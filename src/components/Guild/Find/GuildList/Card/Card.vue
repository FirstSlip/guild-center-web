<template>
  <nuxt-link class="guild-card" :to="`/guild/${id}`">
    <div class="header">
      <img
        v-if="bannerUrl"
        :src="bannerUrl"
        :alt="name"
        class="banner"
      />
      <div
        class="banner"
        v-else
        :style="{ backgroundColor: bannerColor }"
      ></div>
      <div class="guild-avatar">
        <WidgetsAvatar
          :avatar-url="avatarUrl"
          :name="name"
          type="Guild"
        />
      </div>
      <div class="games">
        <img
          v-for="game in games"
          :src="`/img/games/${game.replaceAll(' ', '_')}.png`"
          :alt="game"
        />
      </div>
    </div>
    <div class="main">
      <p class="h5">{{ name }}</p>
      <p class="p4">{{ description }}</p>
      <p class="p4">Количество участников: {{ membersCount }}</p>
      <div class="types">
        <span v-for="guildType in types" class="type">
          {{ guildType }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { generateAvatarColor } from '@/common/func/generateAvatarColor';

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  membersCount: number;
  avatarUrl?: string;
  bannerUrl?: string;
  games: string[];
  types: string[];
}>();

const bannerColor = computed(
  () => generateAvatarColor(props.name).bg
);
console.log(props.name, props.bannerUrl);
</script>

<style lang="scss" scoped>
button.guild-card {
  background-color: #202833;
  border: none;
  display: flex;
  flex-direction: column;
  border-radius: 0.94rem;
  overflow: hidden;

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
