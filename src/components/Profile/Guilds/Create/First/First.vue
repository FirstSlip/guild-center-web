<template>
  <div class="first-step">
    <div class="title">
      <h1 class="h3">Персонализируйте вашу Гильдию!</h1>
      <p class="p1">
        Придумайте назавние Гильдии и загрузить аватар, вы
        сможете сменить их в любой момент.
      </p>
    </div>
    <div class="avatar">
      <div class="description">
        <SVGCamera />
        <p class="h4">Загрузить</p>
      </div>
    </div>
    <div class="name">
      <UIInput
        placeholder="Придумайте название гильдии"
        v-model="name"
      />
      <UIButton type="primary" fill @click="$emit('next')">
        Продолжить
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'next'): void;
}>();
const name = defineModel<string>('name', { default: '' });
</script>

<style lang="scss" scoped>
.first-step {
  height: 100%;
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    text-align: center;

    h1 {
      margin-bottom: 0.5rem;
    }
  }

  .avatar {
    width: 16.5rem;
    height: 16.5rem;
    margin: 0 auto;

    display: flex;
    align-items: center;

    border: 4px dashed $white;

    .description {
      margin: auto;
      text-align: center;
    }
  }

  .name {
    margin: 0 auto;
    width: 22rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
