<template>
  <section class="calendar">
    <ProfileCalendarHeader
      :months="months"
      v-model="selectedDate"
    />
    <ProfileCalendarBody :selected-date="selectedDate" />
  </section>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
const month = new Date().getMonth();
const selectedDate = ref({
  year: year,
  month: month
});

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
</script>

<style></style>
