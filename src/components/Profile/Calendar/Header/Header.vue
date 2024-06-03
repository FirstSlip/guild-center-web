<template>
  <div class="calendar-header">
    <div class="date">
      <button class="prev" @click="prevMonth">
        <SVGArrowLeft />
      </button>
      <span class="year">{{ selectedDate.year }}</span>
      <span class="month">{{ months[selectedDate.month] }}</span>
      <button class="next" @click="nextMonth">
        <SVGArrowRight />
      </button>
    </div>
    <button class="filter">Фильтры</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  months: string[];
}>();

const selectedDate = defineModel<{
  year: number;
  month: number;
}>({
  default: {
    year: 2000,
    month: 0
  }
});

const nextMonth = () => {
  if (selectedDate.value.month === 11) {
    selectedDate.value.year++;
    selectedDate.value.month = 0;
  } else {
    selectedDate.value.month++;
  }
};
const prevMonth = () => {
  if (selectedDate.value.month === 0) {
    selectedDate.value.year--;
    selectedDate.value.month = 11;
  } else {
    selectedDate.value.month--;
  }
};

function getMonthInfo(year: number, month: number) {
  // Создаем объект Date для первого дня месяца
  const firstDayOfMonth = new Date(year, month, 1);
  // Создаем объект Date для последнего дня месяца
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Получаем количество дней в месяце
  const numberOfDays = lastDayOfMonth.getDate();

  // Получаем день недели первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  return { numberOfDays, firstDayOfWeek };
}
</script>

<style lang="scss" scoped>
.calendar-header {
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;

  .date {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .year {
      font-weight: 700;
      font-size: 1rem;
      line-height: 155%;
      color: $main;
    }

    .month {
      font-weight: 700;
      font-size: 1rem;
      line-height: 155%;
      color: $white;
    }

    button {
      height: 100%;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;
    }
  }

  button.filter {
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
