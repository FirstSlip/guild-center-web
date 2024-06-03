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
      {{ day }}
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
const props = defineProps<{
  selectedDate: {
    year: number;
    month: number;
  };
}>();

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
  }
}
</style>
