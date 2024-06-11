<template>
  <div class="chats">
    <div class="search">
      <UIInput placeholder="Найти чат" />
    </div>
    <div class="body">
      <div class="list">
        <ChatChatsElement
          v-for="chat in chats"
          :key="chat.chatId"
          :active="chat.chatId === activeChatId"
          :chat-id="chat.chatId"
          :chat-name="chat.name || null"
          :chat-avatar="chat.avatar || null"
          :first-member="chat.members[0]"
          :last-message="chat.messages[0] || null"
          @click="selectChat(chat.chatId)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Chat } from '@/ts/Chat';

defineProps<{
  chats: Chat[];
  myTag: string;
  activeChatId: string;
}>();

const selectChat = (chatId: string) => {
  useRouter().push(`/chat?chatId=${chatId}`);
};
</script>

<style lang="scss" scoped>
.chats {
  min-height: 85dvh;
  height: 85dvh;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  background: $light-purple;
  border-radius: 0.25rem;

  .search {
    margin-bottom: 0.75rem;
  }

  .body {
    max-height: 100%;
    padding-bottom: 7px;
    padding-right: 7px;
    margin-right: -7px;
    overflow-y: auto;

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }
  }
}
</style>
