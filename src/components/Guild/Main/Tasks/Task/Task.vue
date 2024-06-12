<template>
  <button class="task" @click="$emit('click')">
    <p class="title h5">{{ task.name }}</p>
    <div class="footer">
      <div class="date" v-if="taskDate">
        {{ taskDate }}
      </div>
      <div class="checks">
        <div class="check-wrapper">
          <SVGCheck color="#000" />
        </div>
        <span class="p4">
          {{
            task.missions.filter((mission) => mission.done)
              .length
          }}/{{ task.missions.length }}
        </span>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { Task } from '@/ts/Task';

const props = defineProps<{
  task: Task;
}>();
defineEmits<{
  (e: 'click'): void;
}>();

const taskDate = computed(() => {
  if (!props.task.startedAt) {
    return '';
  }
  const date = new Date(props.task.startedAt);
  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`;
});
</script>

<style lang="scss" scoped>
.task {
  background: none;
  border: 1px solid $white;
  border-radius: 0.5rem;
  padding-top: 1.125rem;

  cursor: pointer;
  overflow: hidden;

  .title {
    padding: 0 0.5rem;
    text-align: left;
  }

  .footer {
    min-height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    background-color: #5d728e;

    .date {
      background-color: #ffcd29;
      color: $dark;
      border-radius: 0.25rem;
      padding: 0.125rem 0.25rem;
    }

    .checks {
      background-color: $main;
      border-radius: 0.25rem;
      padding: 0.125rem 0.25rem;

      display: flex;
      gap: 0.5rem;

      .check-wrapper {
        width: 1rem;
        height: 1rem;
        min-width: 1rem;
        min-height: 1rem;
        border-radius: 0.25rem;
        border: 1px solid #000;

        svg {
          width: 100%;
          height: 100%;
        }
      }

      span {
        color: $dark;
      }
    }
  }
}
</style>
