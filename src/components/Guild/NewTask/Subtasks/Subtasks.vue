<template>
  <section class="subtasks-tab">
    <div class="subtasks">
      <div class="progress" v-if="model.length !== 0">
        <p class="h5">{{ selectedInPercent }}</p>
        <div class="bar">
          <span
            :style="{
              width: selectedInPercent
            }"
          ></span>
        </div>
      </div>
      <h2 class="h4" v-if="model.length === 0">Список пуст</h2>
      <div class="check-list" v-for="(task, index) in model">
        <UICheckbox v-model="task.done" />
        <p class="h5">{{ task.name }}</p>
        <button class="delete" @click="removeCheckbox(index)">
          <SVGCross />
        </button>
      </div>
      <UIInputSecondary
        type="text"
        placeholder="Ввести заголовок списока"
        fill
        v-model="input"
      />
      <UIButton
        font-type="h5"
        class="add"
        html-type="button"
        @click="addCheckbox"
      >
        Добавить список
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Mission } from '@/ts/Mission';

const input = ref('');
const model = defineModel<Mission[]>({
  default: {
    name: '',
    done: false
  }
});

const selectedInPercent = computed(() => {
  return (
    Math.round(
      (model.value.filter((task) => task.done).length /
        model.value.length) *
        100
    ) + '%'
  );
});

const addCheckbox = () => {
  if (!input.value) {
    return;
  }
  model.value.push({
    name: input.value,
    done: false
  });
  input.value = '';
};

const removeCheckbox = (index: number) => {
  console.log(model.value);
  model.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
section.subtasks-tab {
  width: 100%;
  min-height: 60dvh;

  .check-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    button.delete {
      margin-left: auto;

      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;
    }
  }

  .subtasks {
    width: 100%;
    border-radius: 0.5rem;
    padding: 1.25rem;

    background: #303d4d;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      p {
        min-width: 2.5rem;
      }

      .bar {
        border-radius: 62.5rem;
        width: 100%;
        height: 0.5rem;
        background-color: #5d728e;
        overflow: hidden;

        span {
          display: block;
          height: 100%;
          width: 0;
          background-color: $main;
        }
      }
    }

    h2 {
      padding: 0.625rem 0;
    }

    .add {
      align-self: flex-end;
    }
  }
}
</style>
