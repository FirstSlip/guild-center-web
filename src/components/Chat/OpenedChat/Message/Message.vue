<template>
  <ChatOpenedChatMessageEmoji
    v-if="emojisArray.some((emoji) => text.includes(emoji))"
    :is-my-message="isMyMessage"
    :message-status="messageStatus"
    :custom-status="customStatus"
    :displayed-date="displayedDate"
  >
    {{ text }}
  </ChatOpenedChatMessageEmoji>
  <ChatOpenedChatMessageText
    v-else
    :is-my-message="isMyMessage"
    :message-status="messageStatus"
    :custom-status="customStatus"
    :displayed-date="displayedDate"
  >
    {{ text }}
  </ChatOpenedChatMessageText>
</template>

<script lang="ts" setup>
import { emojisArray } from '@/common/data/emojisArray';

const props = defineProps<{
  isMyMessage: boolean;
  date: string;
  messageStatus: boolean;
  customStatus?: 'pending' | 'failed';
  text: string;
}>();

const displayedDate = computed(() => {
  const date = new Date(props.date);

  return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
});
</script>

<style></style>
