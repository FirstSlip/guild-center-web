<template>
  <button
    :class="['chat-element', active && 'active']"
    @click="$emit('click')"
  >
    <div class="chat-logo">
      <WidgetsAvatar
        :type="chatName ? 'Chat' : 'User'"
        :name="chatName || firstMember?.username || ''"
        :avatar-url="chatAvatar || firstMember?.avatar || ''"
      />
    </div>
    <div class="info">
      <div class="info-header">
        <div class="name h5">
          {{
            chatName ||
            `${firstMember?.username} #${firstMember?.tag}` ||
            ''
          }}
        </div>
        <div class="date p3">
          {{ lastMessageTime }}
        </div>
      </div>
      <div class="info-footer">
        <div class="message p4">{{ lastMessage?.data }}</div>
        <div class="unreaded-count">
          <span>1</span>
        </div>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { Message } from '@/ts/Message';
import type { ShortUser } from '@/ts/ShortUser';

const props = defineProps<{
  active: boolean;
  chatId: string;
  chatName: string | null;
  chatAvatar: string | null;
  lastMessage: Message | null;
  firstMember: ShortUser;
}>();
defineEmits<{
  (e: 'click'): void;
}>();

const lastMessageTime = computed(() => {
  if (!props.lastMessage) {
    return '';
  } else {
    const dateTime = new Date(props.lastMessage.time);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
  }
});
</script>

<style lang="scss" scoped>
button.chat-element {
  width: 100%;
  height: 3.75rem;
  padding: 0.5rem 1rem;

  background: #303d4d;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  border: none;
  border-radius: 0.25rem;

  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: #415167;
    box-shadow: 4px 4px 4px 0 #07c6bf;
  }

  &:hover {
    background: #415167;
  }

  .chat-logo {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .info {
    width: 100%;

    .info-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: space-between;
    }

    .info-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: space-between;

      .unreaded-count {
        border-radius: 0.5rem;
        width: 1rem;
        height: 1rem;
        min-width: 1rem;
        min-height: 1rem;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: $main;

        span {
          font-weight: 600;
          font-size: 0.69rem;
          line-height: 109%;
          text-align: center;
          color: $text-dark;
        }
      }
    }
  }
}
</style>
