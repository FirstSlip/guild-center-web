<template>
  <section class="main-tab">
    <h2 class="h4">Название задачи</h2>
    <UIInputSecondary
      type="text"
      placeholder="Придумайте название задачи"
      fill
      v-model="name"
    />
    <h2 class="h4">Описание</h2>
    <UITextarea
      fill
      placeholder="Введите описание задачи"
      :rows="12"
      v-model="description"
    />
    <h2 class="h4">Награда</h2>
    <UIInputSecondary
      type="text"
      placeholder="Придумайте вознаграждение"
      fill
      v-model="reward"
    />
  </section>
</template>

<script lang="ts" setup>
const name = defineModel<string>('name', {
  default: ''
});
const description = defineModel<string>('description', {
  default: ''
});
const reward = defineModel<string>('reward', {
  default: ''
});
</script>

<style lang="scss" scoped>
section.main-tab {
  h2.h4 {
    padding: 0.5rem 0;
  }
}
</style>
