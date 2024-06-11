<template>
  <div :class="['message', isMyMessage && 'my-message']">
    <div class="emoji">
      <slot></slot>
    </div>
    <div class="info">
      <div class="date p4">{{ displayedDate }}</div>
      <div class="status">
        <SVGMessagePending v-if="customStatus === 'pending'" />
        <SVGMessageRead v-else-if="messageStatus" />
        <SVGMessageSent v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isMyMessage: boolean;
  messageStatus: boolean;
  customStatus?: 'pending' | 'failed';
  displayedDate: string;
}>();
</script>

<style lang="scss" scoped>
.message {
  position: relative;

  &.my-message {
    margin-left: auto;
  }

  .emoji {
    font-size: 12rem;
    line-height: 100%;
    letter-spacing: 0;
  }

  .info {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    padding: 0.125rem 0.25rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    border-radius: 6.25rem;

    background: rgba(44, 44, 44, 0.7);

    .date {
      margin-left: 0.5rem;
    }

    .status {
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
      padding: 0.25rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
