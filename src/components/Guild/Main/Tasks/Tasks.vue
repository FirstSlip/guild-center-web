<template>
  <section class="tasks">
    <div class="header">
      <SVGSword stroke="#FFF" />
      <h1 class="h3">Задачи</h1>
    </div>
    <div class="guild-tasks">
      <div class="list">
        <div class="status">
          <div class="circle"></div>
          <span class="h5">В процессе</span>
        </div>
        <GuildMainTasksTask
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @click="$emit('openTask', task.taskId)"
        />
        <button class="create-task" @click="$emit('createTask')">
          <SVGPlus color="#b5b5b5" />
          Создать задачу
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Task } from '@/ts/Task';

defineProps<{
  tasks: Task[];
}>();
defineEmits<{
  (e: 'createTask'): void;
  (e: 'openTask', taskId: string): void;
}>();
</script>

<style lang="scss" scoped>
.tasks {
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

  .guild-tasks {
    background: #303d4d;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-top: 1.25rem;

    max-height: 40dvh;

    width: 20rem;

    .status {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      .circle {
        width: 1rem;
        height: 1rem;
        min-width: 1rem;
        min-height: 1rem;
        border-radius: 50%;
        background-color: #ffcd29;
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;

      button.create-task {
        background-color: #5d728e;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;

        margin-top: 1.5rem;

        font-weight: 400;
        font-size: 0.81rem;
        color: $white-60;
      }
    }
  }
}
</style>
