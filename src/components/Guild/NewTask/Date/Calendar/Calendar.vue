<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="prev" @click="prevMonth">
        <SVGArrowLeft />
      </button>
      <span class="month h4">
        {{ months[selectedDate.month] }}
      </span>
      <button class="next" @click="nextMonth">
        <SVGArrowRight />
      </button>
    </div>
    <div class="calendar-body">
      <div
        v-for="(day, index) in daysOfWeek"
        :key="index"
        class="thead-cell"
      >
        <span>{{ day }}</span>
      </div>
      <div
        v-for="(day, index) in prevMonthDays"
        :key="index"
        class="tbody-cell prev"
      >
        <span>{{ day }}</span>
      </div>
      <div
        v-for="(day, index) in days.numberOfDays"
        :key="index"
        :class="[
          'tbody-cell',
          'current',
          day === startedDay && 'started',
          day !== startedDay &&
            day < endedDay &&
            day > startedDay &&
            'between',
          day === endedDay && 'ended'
        ]"
        @mousedown="onMouseDown(day)"
        @mouseover="onMouseOver(day)"
        @mouseup="onMouseUp(day)"
      >
        <span>{{ day }}</span>
      </div>
      <div
        v-for="(day, index) in nextMonthDays"
        :key="index"
        class="tbody-cell next"
      >
        <span>{{ day }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (
    e: 'select-range',
    startedDay: number,
    endedDay: number,
    month: number,
    year: number
  ): void;
}>();
const year = new Date().getFullYear();
const month = new Date().getMonth();
const selectedDate = ref({
  year: year,
  month: month
});

const mousePressed = ref(false);
const startedDay = ref(0);
const endedDay = ref(0);

const onMouseOver = (day: number) => {
  if (mousePressed.value) {
    endedDay.value = day;
  }
};
const onMouseDown = (day: number) => {
  endedDay.value = 0;
  mousePressed.value = true;
  startedDay.value = day;
};

const onMouseUp = (day: number) => {
  mousePressed.value = false;
  emit(
    'select-range',
    startedDay.value,
    endedDay.value,
    selectedDate.value.month + 1,
    selectedDate.value.year
  );
};

const nextMonth = () => {
  if (selectedDate.value.month === 11) {
    selectedDate.value.year++;
    selectedDate.value.month = 0;
  } else {
    selectedDate.value.month++;
  }
  startedDay.value = 0;
  endedDay.value = 0;
};
const prevMonth = () => {
  if (selectedDate.value.month === 0) {
    selectedDate.value.year--;
    selectedDate.value.month = 11;
  } else {
    selectedDate.value.month--;
  }
  startedDay.value = 0;
  endedDay.value = 0;
};

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const days = computed(() =>
  getMonthInfo(selectedDate.value.year, selectedDate.value.month)
);
const prevMonthDays = computed(() => {
  let year = selectedDate.value.year;
  let month = selectedDate.value.month;
  if (selectedDate.value.month === 0) {
    year--;
    month = 11;
  } else {
    month--;
  }
  const neededDays = getMonthInfo(
    selectedDate.value.year,
    selectedDate.value.month
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
  let year = selectedDate.value.year;
  let month = selectedDate.value.month;
  if (selectedDate.value.month === 11) {
    year++;
    month = 0;
  } else {
    month++;
  }
  const neededDays = getMonthInfo(
    selectedDate.value.year,
    selectedDate.value.month
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
.calendar {
  width: fit-content;

  .calendar-header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;

    .month {
      color: $main;
    }

    button {
      width: 1.25rem;
      height: 1.25rem;
      min-width: 1.25rem;
      min-height: 1.25rem;

      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 80%;
        height: 80%;
      }
    }
  }
  .calendar-body {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(7, 2.5rem);

    border-radius: 0.5rem;
    overflow: hidden;

    .thead-cell {
      width: 2.5rem;
      height: 2.5rem;
      min-width: 2.5rem;
      min-height: 2.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 140%;
        text-align: center;
        color: #8a8a8a;
      }
    }

    .tbody-cell {
      width: 2.5rem;
      height: 2.5rem;

      font-weight: 400;
      font-size: 0.88rem;
      line-height: 155%;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 0.25rem;

      cursor: cell;
      user-select: none;

      &:hover {
        background: $light-purple;
      }

      span {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 155%;
        text-align: center;
        border-bottom: 2px solid transparent;

        width: min(1.5rem, 60%);
      }

      &.prev span {
        color: $white-60;
      }

      &.current span {
        color: $main;
      }

      &.next span {
        color: $white-60;
      }

      &.started {
        background: $main-60;

        span {
          border-bottom: 2px solid $main;
        }
      }

      &.between {
        background: $main-60;
      }

      &.ended {
        background: $main-60;

        span {
          border-bottom: 2px solid #f04451;
        }
      }
    }
  }
}
</style>
