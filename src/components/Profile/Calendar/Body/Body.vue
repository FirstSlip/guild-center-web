<template>
  <div class="calendar-body">
    <div
      v-for="(day, index) in daysOfWeek"
      :key="index"
      class="thead-cell"
    >
      {{ day }}
    </div>
    <div
      v-for="(day, index) in prevMonthDays"
      :key="index"
      class="tbody-cell prev"
    >
      {{ day }}
    </div>
    <div
      v-for="(day, index) in days.numberOfDays"
      :key="index"
      class="tbody-cell current"
    >
      <div class="p3">{{ day }}</div>
      <div
        v-if="
          taskDates.find(
            (date) =>
              date.day === day &&
              date.month === selectedDate.month + 1 &&
              date.year === selectedDate.year
          )
        "
        class="task-time"
      >
        <span class="circle"></span>
        <span class="p4">
          {{
            taskDates.find(
              (date) =>
                date.day === day &&
                date.month === selectedDate.month &&
                date.year === selectedDate.year
            )?.time || '00:00'
          }}
        </span>
      </div>
    </div>
    <div
      v-for="(day, index) in nextMonthDays"
      :key="index"
      class="tbody-cell next"
    >
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/ts/Task';

const props = defineProps<{
  selectedDate: {
    year: number;
    month: number;
  };
  tasks: Task[];
}>();

const taskDates = computed(() =>
  props.tasks.map((task) => {
    if (!task.startedAt)
      return {
        day: 0,
        month: 0,
        year: 0,
        time: '00:00'
      };
    return parseDateString(task.startedAt);
  })
);

const daysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

const days = computed(() =>
  getMonthInfo(props.selectedDate.year, props.selectedDate.month)
);
const prevMonthDays = computed(() => {
  let year = props.selectedDate.year;
  let month = props.selectedDate.month;
  if (props.selectedDate.month === 0) {
    year--;
    month = 11;
  } else {
    month--;
  }
  const neededDays = getMonthInfo(
    props.selectedDate.year,
    props.selectedDate.month
  ).firstDayOfWeek;

  console.log(
    'x',
    getMonthInfo(year, month).numberOfDays,
    neededDays
  );
  return Array.from({ length: neededDays }, (_, index) => {
    return (
      getMonthInfo(year, month).numberOfDays -
      neededDays +
      index +
      1
    );
  });
});

const nextMonthDays = computed(() => {
  let year = props.selectedDate.year;
  let month = props.selectedDate.month;
  if (props.selectedDate.month === 11) {
    year++;
    month = 0;
  } else {
    month++;
  }
  const neededDays = getMonthInfo(
    props.selectedDate.year,
    props.selectedDate.month
  ).lastDayOfWeek;

  return Array.from({ length: 6 - neededDays }, (_, index) => {
    return index + 1;
  });
});

function getMonthInfo(year: number, month: number) {
  // Создаем объект Date для первого дня месяца
  const firstDayOfMonth = new Date(year, month, 1);
  // Создаем объект Date для последнего дня месяца
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Получаем количество дней в месяце
  const numberOfDays = lastDayOfMonth.getDate();

  // Получаем день недели первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
  let firstDayOfWeek = firstDayOfMonth.getDay();
  if (firstDayOfWeek === 0) {
    firstDayOfWeek = 6; // Воскресенье
  } else {
    firstDayOfWeek -= 1; // Смещаем на один день назад, чтобы начать с понедельника
  }

  let lastDayOfWeek = lastDayOfMonth.getDay();
  // Если последний день недели - воскресенье, переносим его на понедельник (по европейскому стандарту)
  if (lastDayOfWeek === 0) {
    lastDayOfWeek = 6; // Воскресенье
  } else {
    lastDayOfWeek -= 1; // Смещаем на один день назад, чтобы начать с понедельника
  }

  return { numberOfDays, firstDayOfWeek, lastDayOfWeek };
}

function parseDateString(dateString: string): {
  day: number;
  month: number;
  year: number;
  time: string;
} {
  // Создаем объект Date из строки
  const date = new Date(dateString);

  // Получаем компоненты даты и времени
  const day = date.getDate();
  const month = date.getMonth() + 1; // Месяцы начинаются с 0
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Форматируем часы и минуты с ведущим нулем, если нужно
  const formattedHours =
    hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes =
    minutes < 10 ? `0${minutes}` : minutes.toString();

  // Формируем строку времени
  const time = `${formattedHours}:${formattedMinutes}`;

  // Возвращаем объект в нужном формате
  return { day, month, year, time };
}
</script>

<style lang="scss" scoped>
.calendar-body {
  width: 100%;
  height: 100%;

  display: grid;
  gap: 1px;
  grid-template-columns: repeat(7, 1fr);

  background: $line-light;
  border: 1px solid $line-light;
  border-radius: 0.5rem;
  overflow: hidden;

  .thead-cell {
    background: $light-purple;
    height: 2.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 400;
    font-size: 0.75rem;
    line-height: 155%;
  }

  .tbody-cell {
    height: 6.25rem;
    padding: 0.25rem;

    font-weight: 400;
    font-size: 0.88rem;
    line-height: 155%;

    &.prev {
      background: #292b32;
    }

    &.current {
      background: #32343d;
    }

    &.next {
      background: #292b32;
    }

    .task-time {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .circle {
        width: 0.5rem;
        height: 0.5rem;

        background-color: #d9d9d9;
        border-radius: 100%;
      }
    }
  }
}
</style>
