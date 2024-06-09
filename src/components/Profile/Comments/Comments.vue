<template>
  <section class="comments">
    <label class="add-comment" @keydown="keyDown">
      <div class="user-avatar">
        <WidgetsAvatar
          type="User"
          :name="user?.username || 'Загрузка...'"
          :avatar-url="user?.avatar"
        />
      </div>
      <div class="line"></div>
      <input
        v-model="comment"
        class="input"
        type="text"
        placeholder="Оставьте комментарий"
      />
      <button class="send" @click="sendMessage">
        <SVGSend />
      </button>
    </label>
    <div
      v-for="comment in comments"
      :key="comment.commentId"
      class="comment"
    >
      <div class="info">
        <div class="user-avatar">
          <WidgetsAvatar
            type="User"
            :name="comment.sender.username"
            :avatar-url="comment.sender.avatar"
          />
        </div>
        <div class="user-name">
          {{ comment.sender.username }}
        </div>
        <div class="date">
          {{ formatDate(comment.createdAt, true) }}
        </div>
        <button
          v-if="
            comment.sender.tag === myProfile?.tag || isMyProfile
          "
          class="delete"
          @click="deleteComment(comment.commentId)"
        >
          <SVGTrash />
        </button>
      </div>
      <div class="text">{{ comment.text }}</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { formatDate } from '@/common/func/formatDate';
import type { User } from '@/ts/User';
import type { UserMe } from '@/ts/UserMe';

const props = defineProps<{
  user: User | null;
  id: string;
  isMyProfile: boolean;
  myProfile: UserMe | null;
}>();
const emit = defineEmits<{
  (e: 'comment-sent'): void;
}>();

const comment = ref('');

const comments = computed(
  () => props.user?.comments.reverse() || []
);

const sendMessage = async () => {
  if (!comment.value || comment.value.length <= 0) {
    return;
  }
  const response = await $api.user.comment.add(
    props.id,
    comment.value
  );
  if ('success' in response && response.success) {
    comment.value = '';
    emit('comment-sent');
    /* useProfile().loadProfile(); */
  }
};
const keyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

const deleteComment = async (commentId: string) => {
  const response =
    await $api.user.comment.deleteComment(commentId);
  console.log('res', response);
  if ('success' in response && response.success) {
    useProfile().loadProfile();
  }
};
</script>

<style lang="scss" scoped>
section.comments {
  width: 100%;
  height: min-content;
  /* background-color: $background-light-purple; */

  border-radius: 0.75rem;

  label.add-comment {
    height: 2.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    background-color: $light-purple;
    border-radius: 0.25rem;

    .user-avatar {
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
    }

    .line {
      height: 100%;
      width: 2px;
      background-color: $white;
    }

    input.input {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      outline: none;

      font-weight: 400;
      font-size: 1rem;
      line-height: 155%;
    }

    button.send {
      width: 1.5rem;
      height: 1.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;
    }
  }

  .comment {
    width: 100%;
    margin-bottom: 0.5rem;

    background: $light-purple;
    border-radius: 0.25rem;

    overflow: hidden;

    .info {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: space-between;

      padding: 0.5rem 1rem;

      &:has(:not(button.delete)) {
        justify-content: flex-start;
      }

      .user-avatar {
        width: 1.25rem;
        height: 1.25rem;
      }

      .user-name {
        height: 100%;
        margin-right: 0.25rem;

        font-weight: 400;
        font-size: 1rem;
        line-height: 155%;
        color: var(--text-white);
      }

      .date {
        height: 100%;
        font-weight: 400;
        font-size: 1rem;
        line-height: 155%;
        color: rgba(255, 255, 255, 0.75);
      }

      button.delete {
        height: 1.25rem;
        width: 1.25rem;
        margin-left: auto;

        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .text {
      padding: 1rem;
      width: 100%;

      background: $gray;

      font-weight: 400;
      font-size: 1rem;
      line-height: 155%;
    }
  }
}
</style>
