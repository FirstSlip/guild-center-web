<template>
  <div class="fourth-step">
    <div class="title">
      <h1 class="h4">
        Укажите параметры приватности вашей гильдии.
      </h1>
      <UISelectPrivacy v-model="privacy" />
    </div>
    <div class="years">
      <h2 class="h4">Возрастной диапазон</h2>
      <UIDualRangeSlider :from="12" :to="90" v-model="slider" />
    </div>
    <div class="buttons">
      <UIButton type="primary" fill @click="$emit('next')">
        Продолжить
      </UIButton>
      <UIButton type="blank" fill @click="$emit('prev')">
        Назад
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const privacy = defineModel<0 | 1>('privacy', { default: 0 });

const slider = defineModel<{ to: number; from: number }>('age', {
  default: { from: 12, to: 90 }
});
</script>

<style lang="scss" scoped>
.fourth-step {
  height: calc(100% - 2.5rem);
  max-height: calc(100% - 2.5rem);
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;

  flex-shrink: 1;

  .title {
    text-align: center;

    h1 {
      margin-bottom: 0.5rem;
    }
  }

  .years {
    border-radius: 0.75rem;
    padding: 1.25rem 1rem;
    background-color: #303d4d;

    h2 {
      margin-bottom: 1.25rem;
    }
  }
}
</style>
