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
          v-model="password"
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
const email = ref('');
const password = ref('');
const submit = async () => {
  /* useState<User | null>('user').value = {
    name: email.value,
    tag: '#22822',
    email: email.value
  }; */
  const response = await $api.auth.signIn({
    username: email.value,
    password: password.value
  });
  if ($api.utils.isSuccess(response)) {
    /* const token = useCookie('token', {
      maxAge: 60 * 60 * 24 * 30
    });
    token.value = response.data.token; */
    await useProfile().loadProfile();
    useRouter().push('/profile');
  }
  /* useProfile().setUser({
    name: email.value,
    tag: '#22822',
    email: email.value
  }); */
};
</script>
<style lang="scss" scoped></style>
