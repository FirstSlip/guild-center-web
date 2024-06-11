<template>
  <div :class="['message', isMyMessage && 'my-message']">
    <div class="date p4" v-if="isMyMessage">
      {{ displayedDate }}
    </div>
    <SVGMessageLeftCorner v-else class="corner" />
    <div class="content">
      <div class="text p3">
        <slot></slot>
      </div>
      <div class="status">
        <SVGMessagePending v-if="customStatus === 'pending'" />
        <SVGMessageRead v-else-if="messageStatus" />
        <SVGMessageSent v-else />
      </div>
    </div>
    <SVGMessageRightCorner v-if="isMyMessage" class="corner" />
    <div class="date p4" v-else>{{ displayedDate }}</div>
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  .content {
    min-width: 17.5rem;
    max-width: 50%;
    padding: 0.5rem;

    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    background-color: #3f4b5c;
    border-radius: 0.75rem 0.75rem 0.75rem 0;

    font-weight: 400;
    font-size: 0.88rem;
    line-height: 155%;

    .status {
      margin-left: auto;
      height: calc(0.875rem * 1.55);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .date {
    margin-left: 0.5rem;
    margin-bottom: 0.125rem;
  }

  &.my-message {
    justify-content: flex-end;

    .content {
      background-color: #223c62;
      border-radius: 0.75rem 0.75rem 0 0.75rem;
    }

    .date {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }

  .corner {
    width: fit-content;
    height: fit-content;
  }
}
</style>
