<template>
  <form class="auth" @submit.prevent="submit">
    <h1 class="h4">Добро пожаловать в сервис GuildCenter!</h1>
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
type AuthFormType = 'sign-in' | 'sign-up';
const props = defineProps<{ type?: AuthFormType }>();
const emits = defineEmits(['submit']);
defineSlots<{
  ['title']: [];
  ['inputs']: [];
  ['buttons']: [];
  ['bottom-text']: [];
}>();

const formBottomText = {
  'sign-in': {
    text: 'Нет аккаунта?',
    link: {
      to: '/auth/sign-up',
      text: 'Зарегистрироваться'
    },
    buttonText: 'Войти'
  },
  'sign-up': {
    text: 'Есть аккаунт?',
    link: {
      to: '/auth/sign-in',
      text: 'Войти'
    },
    buttonText: 'Зарегистрироваться'
  }
};

const formType = computed(() => props.type || 'sign-in');
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
