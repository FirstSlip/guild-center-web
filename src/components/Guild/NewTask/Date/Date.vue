<template>
  <section class="date-tab">
    <div class="task-calendar">
      <GuildNewTaskDateCalendar @selectRange="selectRange" />
    </div>
    <div class="task-dates">
      <div class="all-day">
        <SVGClock />
        <p>Весь день</p>
        <UIRadio v-model="isEveryDay" />
      </div>
      <div class="started-at">
        <UICheckbox v-model="hasStartedDate" />
        <p>Начало</p>
        <input
          type="date"
          placeholder="Дата"
          class="input p3"
          v-model="startedDate.date"
        />
        <input
          v-if="!isEveryDay"
          type="time"
          placeholder="Время"
          class="input p3"
          v-model="startedDate.time"
        />
      </div>
      <div class="ended-at">
        <UICheckbox v-model="hasEndedDate" />
        <p>Конец</p>
        <input
          type="date"
          placeholder="Дата"
          class="input p3"
          v-model="endedDate.date"
        />
        <input
          v-if="!isEveryDay"
          type="time"
          placeholder="Время"
          class="input p3"
          v-model="endedDate.time"
        />
      </div>
      <div class="repeat">
        <p class="p2">Установить повтор</p>
        <UISelect
          type="secondary"
          :titles="repeatTitles"
          v-model="selectedRepeat"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const repeatTitles = [
  'Только один раз',
  'Каждый день',
  'Каждый неделю',
  'Каждый месяц'
];
const selectedRepeat = ref(0);

const isEveryDay = ref(false);
const hasStartedDate = ref(false);
const hasEndedDate = ref(false);
const startedDate = defineModel('started', {
  default: {
    date: '',
    time: ''
  }
});

const endedDate = defineModel('ended', {
  default: {
    date: '',
    time: ''
  }
});

watch(
  startedDate,
  () => {
    console.log('startedDate', startedDate.value);
  },
  { deep: true }
);

const selectRange = (
  startedDay: number,
  endedDay: number,
  month: number,
  year: number
) => {
  hasStartedDate.value = true;
  hasEndedDate.value = true;
  startedDate.value.date = `${year}-${month < 10 ? '0' + month : month}-${startedDay < 10 ? '0' + startedDay : startedDay}`;
  endedDate.value.date = `${year}-${month < 10 ? '0' + month : month}-${endedDay < 10 ? '0' + endedDay : endedDay}`;
  console.log(startedDate.value, endedDate.value);
};
</script>

<style lang="scss" scoped>
section.date-tab {
  height: 60dvh;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;

  .task-calendar {
    height: fit-content;
    padding: 1.25rem;

    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;
  }

  .task-dates {
    height: fit-content;
    padding: 0.5rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: 0.5rem;

    .all-day {
      padding: 0.5rem 0rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      border-bottom: 1px solid rgba(255, 255, 255, 0.5);

      p {
        margin-right: 0.25rem;

        font-weight: 400;
        font-size: 1rem;
        line-height: 155%;
      }
    }

    .started-at,
    .ended-at {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0rem;

      p {
        width: 6rem;
      }

      input.input {
        background: none;
        text-align: center;

        border: 2px solid $white;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
        width: 6.69rem;
        height: 2rem;

        outline: none;

        &::-webkit-inner-spin-button {
          display: none;
          -webkit-appearance: none;
        }
        &::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
      }
    }

    .repeat {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 0 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
