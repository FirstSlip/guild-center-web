<template>
  <nuxt-link class="chat" :to="`/chat?chatId=${chat.chatId}`">
    <div class="chat-avatar">
      <WidgetsAvatar
        type="Chat"
        :name="chat.name || ''"
        :avatar-url="chat.avatar || ''"
      />
    </div>
    <div class="info">
      <p class="name h5">{{ chat.name || '' }}</p>
      <p class="p4">
        {{ chat.messages.length > 0 && chat.messages[0].data }}
      </p>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Chat } from '@/ts/Chat';

defineProps<{
  chat: Chat;
}>();
</script>

<style lang="scss" scoped>
.chat {
  background: #303d4d;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  text-decoration: none;

  .chat-avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .info {
    display: flex;
    flex-direction: column;

    width: 100%;

    p.p4 {
      height: calc(0.75rem * 1.55);
    }
  }
}
</style>
