<template>
  <section class="chats">
    <div class="header">
      <SVGChat stroke="#FFF" />
      <h1 class="h3">Обсуждение</h1>
      <UIButton
        font-type="h5"
        padding="0.25rem 1.25rem"
        @click="$emit('createChat')"
      >
        <SVGPlus color="#19191d" />
        Создать обсуждение
      </UIButton>
    </div>
    <div class="guild-chats">
      <div class="list">
        <GuildMainChatsChat
          v-for="(chat, index) in chats"
          :key="index"
          :chat="chat"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Chat } from '@/ts/Chat';

defineProps<{
  chats: Chat[];
}>();
defineEmits<{
  (e: 'createChat'): void;
}>();
</script>

<style lang="scss" scoped>
.chats {
  border-radius: 1rem;
  padding: 1.25rem;

  margin-top: 1.875rem;
  background-color: $light-purple;

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    > svg {
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }

    button.button {
      height: 2rem;
      margin-left: auto;

      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .guild-chats {
    margin-top: 1.25rem;

    max-height: 40dvh;

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
  }
}
</style>
