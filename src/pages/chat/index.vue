<template>
  <section class="chat-page">
    <ChatChats
      :chats="finalChats"
      :my-tag="profile?.tag || ''"
      :active-chat-id="activeChatId"
    />
    <ChatOpenedChat
      :chat="selectedChat"
      :my-tag="profile?.tag || ''"
    />
  </section>
</template>

<script lang="ts" setup>
import type { Chat } from '@/ts/Chat';

const route = useRoute();
const activeChatId = computed<string>(
  () => route.query.chatId || ''
);

const chats = useChats().chats;
const profile = useProfile().user;

/* const finalChats = computed<Required<Chat>[]>(() => {
  return chats.value.map((chat) => {
    if (chat.name) {
      if (chat.avatar) {
        return chat as Required<Chat>;
      }
      return {
        ...chat,
        avatar: ''
      } as Required<Chat>;
    }
    const member = chat.members.find(
      (member) => member.tag !== profile.value?.tag
    );
    const chatName = `${member?.username || ''} #${member?.tag || ''}`;
    const chatAvatar = member?.avatar || '';
    return {
      ...chat,
      name: chatName,
      avatar: chatAvatar
    };
  });
}); */

/* const finalChats = computed<
  (Chat & { chatWithUser: boolean })[]
>(() => {
  return chats.value.map((chat) => {
    if (chat.name) {
      return { ...chat, chatWithUser: false };
    }
    const member = chat.members.find(
      (member) => member.tag !== profile.value?.tag
    );
    return {
      ...chat,
      name: `${member?.username || ''} #${member?.tag || ''}`,
      avatar: member?.avatar || '',
      chatWithUser: true
    };
  });
}); */

const finalChats = computed(() => {
  return chats.value.map((chat) => {
    const members = chat.members.filter(
      (member) => member.tag !== profile.value?.tag
    );
    return {
      ...chat,
      members
    };
  });
});

const selectedChat = computed<Chat>(() => {
  return (
    finalChats.value.find(
      (chat) => chat.chatId === activeChatId.value
    ) || finalChats.value[0]
  );
});

definePageMeta({
  layout: 'chat'
});
</script>

<style lang="scss" scoped>
section.chat-page {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: max(18rem, 33%) minmax(0, 1fr);
}
</style>
