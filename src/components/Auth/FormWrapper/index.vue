<template>
  <form class="auth">
    <h1 class="h4">Добро пожаловать в сервис GuildCenter!</h1>
    <h2 class="h2">
      {{ formType === 'sign-in' ? 'Вход' : 'Регистрация' }}
    </h2>
    <div class="form-body">
      <div class="inputs">
        <slot name="inputs"></slot>
      </div>
      <UIButton fill>
        {{ formBottomText[formType].buttonText }}
      </UIButton>
    </div>
    <p class="auth-switch h5">
      {{ formBottomText[formType].text }}
      <UILink
        :to="formBottomText[formType].link.to"
        inherit-font
      >
        {{ formBottomText[formType].link.text }}
      </UILink>
    </p>
  </form>
</template>
<script setup lang="ts">
type AuthFormType = 'sign-in' | 'sign-up';
const props = defineProps<{ type?: AuthFormType }>();
defineSlots<{
  ['after-icon']: [];
  ['inputs']: [];
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
  }
}
</style>
