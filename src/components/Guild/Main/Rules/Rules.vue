<template>
  <section class="rules">
    <div class="no-rules" v-if="!rules">
      <span class="h5">
        У гильдии гильдии отсутствуют правила. Наслаждайтесь
        АНАРХИЕЙ!!!
      </span>
      <UIButton
        type="primary"
        font-type="h5"
        @click="$emit('createRule')"
      >
        <SVGPlus color="#19191d" />
        <span class="h5">Добавить правило</span>
      </UIButton>
    </div>
    <div class="guild-rules" v-else>
      <div class="user">
        <div class="user-avatar">
          <WidgetsAvatar
            type="User"
            :avatar-url="rules.user.avatar || ''"
            :name="rules.title"
          />
        </div>
        <p class="p2">
          {{ rules.user.username }} #{{ rules.user.tag }}
        </p>
        <p class="date p2">{{ date }}</p>
        <button
          class="edit"
          @click="
            $emit(
              'editRule',
              rules?.title || '',
              rules?.description || ''
            )
          "
        >
          <SVGEdit />
        </button>
      </div>
      <div class="info">
        <SVGHammer />
        <span class="h3">{{ rules.title }}</span>
      </div>
      <div class="field p2">{{ rules.description }}</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Rule } from '@/ts/Rule';

const props = defineProps<{
  rules: Rule | null;
}>();
defineEmits<{
  (e: 'createRule'): void;
  (e: 'editRule', title: string, description: string): void;
}>();

const date = computed(() => {
  if (!props.rules) return '';
  return formatDate(props.rules.updatedAt);
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Получаем компоненты даты и времени
  const day = date.getDate();
  const month = date.getMonth() + 1; // Месяцы начинаются с 0
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Форматируем день и месяц с ведущим нулем, если нужно
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth =
    month < 10 ? `0${month}` : month.toString();

  // Форматируем часы и минуты с ведущим нулем, если нужно
  const formattedHours =
    hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes =
    minutes < 10 ? `0${minutes}` : minutes.toString();

  // Формируем строку в нужном формате
  return `${formattedDay}.${formattedMonth}.${year} в ${formattedHours}:${formattedMinutes}`;
};
</script>

<style lang="scss" scoped>
.rules {
  .no-rules {
    margin-top: 1.875rem;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    background: $light-purple;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      span {
        color: $text-dark;
      }
    }
  }

  .guild-rules {
    width: 100%;
    margin-top: 1.875rem;
    padding: 0.5rem 1rem;

    background: $light-purple;
    border-radius: 0.81rem;

    .user {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .user-avatar {
        width: 1.25rem;
        height: 1.25rem;
        min-width: 1.25rem;
        min-height: 1.25rem;
      }

      .date {
        color: rgba(255, 255, 255, 0.75);
      }

      button.edit {
        margin-left: auto;
        display: flex;
        align-items: center;

        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .info {
      padding: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .field {
      border: 1px solid $white;
      border-radius: 0.5rem;
      padding: 1rem;
    }
  }
}
</style>
