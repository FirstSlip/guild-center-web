<template>
  <div class="opened-chat">
    <div class="chat-header">
      <nuxt-link class="chat-logo" to="">
        <WidgetsAvatar
          :type="chat.name ? 'Chat' : 'User'"
          :name="chat.name || chat.members[0]?.username || ''"
          :avatar-url="
            chat.avatar || chat.members[0]?.avatar || ''
          "
        />
      </nuxt-link>
      <div class="username">
        <span class="h5">
          {{ chat.name || chat.members[0]?.username || '' }}
        </span>
        <span class="p4">
          {{
            chat
              ? chat.name
                ? ''
                : `#${chat.members[0]?.tag}`
              : ''
          }}
        </span>
      </div>
      <div class="tools">
        <!-- <button class="delete"><SVGUserDelete /></button> -->
        <button class="notification">
          <SVGNotification />
        </button>
      </div>
    </div>
    <div class="body" ref="messagesConainer" @scroll="onScroll">
      <div class="list">
        <ChatOpenedChatMessage
          v-for="(message, index) in messages"
          :key="index"
          :is-my-message="message.sender.tag === myTag"
          :date="message.time"
          :message-status="message.status"
          :custom-status="message.customStatus"
          :text="message.data"
        />
      </div>
    </div>
    <div class="chat-footer">
      <button class="clip">
        <SVGClip />
      </button>
      <input
        class="message p3"
        type="text"
        placeholder="Напишите сообщение"
        v-model="message"
      />
      <button
        class="smile"
        @click="isSmilesOpened = !isSmilesOpened"
      >
        <SVGSmile />
      </button>
      <button class="send" @click="sendMessage(message)">
        <SVGSend />
      </button>
      <transition name="smiles">
        <ChatOpenedChatEmojiSelector
          v-if="isSmilesOpened"
          class="emojis"
          @select="sendEmoji"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Chat } from '@/ts/Chat';
import type { Message } from '@/ts/Message';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import type { Socket } from 'socket.io-client';

const props = defineProps<{
  chat: Chat;
  myTag: string;
}>();

const messagesConainer = ref<HTMLElement | null>(null);

/* const socket = useSocket().socket.value; */
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null =
  null;

const messages = ref<
  (Message & {
    customStatus?: 'pending' | 'failed';
  })[]
>([]);
const message = ref('');
const needToScroll = ref(true);

const getMessages = async () => {
  if (!socket) {
    return;
  }
  socket.emit('Chats', {
    event: 'getMessages',
    chatId: props.chat.chatId
  });
};

watch(
  () => props.chat.chatId,
  async () => {
    if (!props.chat.chatId) {
      return;
    }
    getMessages();
  }
);

onMounted(() => {
  socket = useSocket().socket.value;

  const interval = setInterval(() => {
    if (socket && socket.connected) {
      getMessages();

      socket.on(
        'messageSentSuccess',
        (res: {
          success: boolean;
          data: { messageId: string };
        }) => {
          const message = messages.value.find(
            (msg) => msg.messageId === res.data.messageId
          );
          if (!message) {
            return;
          }
          const index = messages.value.indexOf(message);
          if (index === -1) {
            return;
          }
          messages.value[index].status = false;
          messages.value[index].customStatus = undefined;
        }
      );

      socket.on('messages', (response) => {
        messages.value = response.data.messages;
        readMessage();
      });

      socket.on(
        'readMessage',
        (response: { chatId: string }) => {
          if (response.chatId === props.chat.chatId) {
            messages.value.forEach((message) => {
              if (
                message.sender.tag === props.myTag &&
                !message.status
              ) {
                message.status = true;
              }
            });
          }
        }
      );

      socket.on(
        'newMessage',
        (response: {
          chatId: string;
          message: string;
          date: string;
        }) => {
          if (response.chatId === props.chat.chatId) {
            messages.value.push({
              data: response.message,
              sender: {
                tag: ''
              },
              time: response.date,
              status: true,
              messageId: messages.value.length.toString(),
              customStatus: undefined
            });
          }
          readMessage();
        }
      );

      clearInterval(interval);
    }
  }, 100);
});

const isSmilesOpened = ref(false);

const sendMessage = async (messageToSend: string) => {
  if (messageToSend === '') {
    return;
  }
  if (!socket) {
    return;
  }
  messages.value.push({
    data: messageToSend,
    sender: {
      tag: props.myTag
    },
    time: new Date(Date.now()).toString(),
    status: false,
    messageId: messages.value.length.toString(),
    customStatus: 'pending'
  });
  socket.emit('Chats', {
    event: 'sendMessage',
    message: messageToSend,
    chatId: props.chat.chatId
  });
};

const sendEmoji = (emoji: string) => {
  isSmilesOpened.value = false;
  sendMessage(emoji);
};

const onScroll = () => {
  if (messagesConainer.value) {
    const scrollAtBottom =
      messagesConainer.value.scrollTop ===
      messagesConainer.value.scrollHeight -
        messagesConainer.value.clientHeight;
    if (scrollAtBottom) {
      needToScroll.value = true;
    } else {
      needToScroll.value = false;
    }
  }
};

onUpdated(() => {
  if (messagesConainer.value && needToScroll.value) {
    messagesConainer.value.scrollTo(
      0,
      messagesConainer.value?.scrollHeight
    );
  }
});

const readMessage = () => {
  const newMessages = useChats().newMessages;
  console.log('comp', newMessages.value);
  const newMessage = newMessages.value.find(
    (chat) => chat.chatId === props.chat.chatId
  );

  if (!newMessage) {
    return;
  }

  const newMessageIndex = newMessages.value.indexOf(newMessage);

  if (newMessageIndex === -1) {
    return;
  }

  newMessages.value.splice(newMessageIndex, 1);
  console.log('comp1', newMessages.value);
};
</script>

<style lang="scss" scoped>
.opened-chat {
  min-height: 85dvh;
  height: 85dvh;

  display: flex;
  flex-direction: column;

  background: #516682;
  border-radius: 0.25rem;

  overflow: hidden;

  .chat-header {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: $light-purple;

    .chat-logo {
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }

    .username {
      display: flex;
      flex-direction: column;
    }

    .tools {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 1.5rem;

      button {
        background: none;
        border: none;
        cursor: pointer;

        &.notification {
          height: 2rem;
          width: 2rem;
          min-width: 2rem;
          min-height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .body {
    height: 100%;
    padding: 1rem;

    overflow-y: auto;
    overscroll-behavior: contain;

    .list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  .chat-footer {
    position: relative;
    padding: 0.5rem 1rem;
    width: 100%;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    background: $light-purple;

    button {
      width: 1.875rem;
      height: 1.875rem;
      min-width: 1.875rem;
      min-height: 1.875rem;

      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;
    }

    input.message {
      width: 100%;
      padding: 0.25rem 1rem;

      background-color: $white;

      border: none;
      border-radius: 1rem;

      color: $text-dark;
    }

    .emojis {
      position: absolute;
      right: 1rem;
      bottom: calc(100% + 0.5rem);
    }
  }
}

.smiles-enter-active,
.smiles-leave-active {
  transition: all 0.3s ease-out;
}

.smiles-enter-from,
.smiles-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
