<template>
  <div class="sign-in">
    <AuthFormWrapper @submit="submit">
      <template v-slot:title>Вход</template>
      <template v-slot:inputs>
        <UIInput
          placeholder="Email"
          autocomplete="email"
          v-model="email"
        />
        <UIInput
          placeholder="Пароль"
          type="password"
          autocomplete="current-password"
          after-text-position="error-overflow"
        >
          <template v-slot:after-text>
            <UILink to="/auth/restore-password" font-type="p4">
              Забыли пароль?
            </UILink>
          </template>
        </UIInput>
      </template>
      <template v-slot:buttons>
        <UIButton fill>Войти</UIButton>
      </template>
      <template v-slot:bottom-text>
        Нет аккаунта?
        <UILink to="/auth/sign-up" font-type="inherited">
          Зарегистрироваться
        </UILink>
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/ts/User';

const email = ref('');
const submit = () => {
  useState<User | null>('user').value = {
    name: email.value,
    tag: '#22822',
    email: email.value
  };
  useRouter().push('/profile');
};
</script>
<style lang="scss" scoped></style>
