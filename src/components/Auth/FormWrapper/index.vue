<template>
  <form class="auth" @submit.prevent="submit">
    <h1 class="h4" v-if="$slots.header">
      <slot name="header"></slot>
    </h1>
    <h1 class="h4" v-else>
      Добро пожаловать в сервис GuildCenter!
    </h1>
    <h2 class="h2">
      <slot name="title"></slot>
    </h2>
    <div class="form-body">
      <div class="inputs">
        <slot name="inputs"></slot>
      </div>
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
    <p class="bottom-text h5">
      <slot name="bottom-text"></slot>
    </p>
  </form>
</template>
<script setup lang="ts">
const emits = defineEmits(['submit']);
defineSlots<{
  ['header']: [];
  ['title']: [];
  ['inputs']: [];
  ['buttons']: [];
  ['bottom-text']: [];
}>();

const submit = () => emits('submit');
</script>
<style lang="scss" scoped>
form.auth {
  width: 43.75rem;

  padding: 3.125rem 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid $stroke-white;
  border-radius: 3.12rem;

  background: $background-dark-purple;

  margin: 5% auto;

  .form-body {
    margin-top: 1.5rem;
    width: 22rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  p.bottom-text {
    margin-top: 1.25rem;
    text-align: center;
  }
}
</style>
