<template>
  <p class="h3">Контакты</p>
  <div class="contacts">
    <div class="email">
      <p class="title h4">Email:</p>
      <UILink to="mailto:9cTqW@example.com">
        9cTqW@example.com
      </UILink>
    </div>
    <div class="socials">
      <p class="title h4">Социальные сети</p>
      <div class="icons">
        <UILink
          v-for="(contact, index) in contacts"
          :to="contact.to"
          padding=".75rem"
        >
          <component :is="contact.logo"></component>
        </UILink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Vk from '@/components/SVG/Logo/Vk.vue';
import YouTube from '@/components/SVG/Logo/YouTube.vue';
import Discord from '@/components/SVG/Logo/Discord.vue';
import Twitch from '@/components/SVG/Logo/Twitch.vue';
const contacts = [
  {
    logo: Vk,
    to: 'https://vk.com/'
  },
  {
    logo: YouTube,
    to: 'https://www.youtube.com/'
  },
  {
    logo: Discord,
    to: 'https://discord.com/'
  },
  {
    logo: Twitch,
    to: 'https://www.twitch.tv/'
  }
];
</script>

<style lang="scss" scoped>
.contacts {
  width: 100%;
  margin: 2.125rem 0 2.5rem;
  padding-bottom: 2rem;
  display: flex;
  gap: 3.25rem;

  border-bottom: 2px solid #e2e2e2;

  .email {
    p.title {
      margin-bottom: 1rem;
    }

    a {
      user-select: text;
      padding-right: 2rem;
    }
  }

  .socials {
    p.title {
      margin-bottom: 1rem;
    }
  }
}
</style>
