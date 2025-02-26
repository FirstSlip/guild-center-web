<template>
  <div class="sign-up">
    <AuthFormWrapper @submit="submit">
      <template v-slot:title>Регистрация</template>
      <template v-slot:inputs>
        <UIInput
          placeholder="Email"
          autocomplete="email"
          v-model="fields.email.value"
          @blur="validate('email')"
          :error="
            fields.email.error ? 'Некорректная почта' : undefined
          "
          :validated="fields.email.validated"
        />
        <UIInput
          placeholder="Никнейм"
          autocomplete="nickname"
          v-model="fields.username.value"
          @blur="validate('username')"
          :error="
            fields.username.error
              ? 'Некорректное имя'
              : undefined
          "
          :validated="fields.username.validated"
        />
        <UIInput
          placeholder="Пароль"
          type="password"
          autocomplete="new-password"
          v-model="fields.password.value"
          @blur="validate('password')"
          :error="
            fields.password.error
              ? 'Некорректный пароль'
              : undefined
          "
          :validated="fields.password.validated"
        />
        <UIInput
          placeholder="Повторите пароль"
          type="password"
          autocomplete="new-password"
          v-model="fields.confirmPassword.value"
          @blur="validate('confirmPassword')"
          :error="
            fields.confirmPassword.error
              ? 'Пароль не совпадает'
              : undefined
          "
          :validated="fields.confirmPassword.validated"
        />
      </template>
      <template v-slot:buttons>
        <UIButton fill>Зарегистрироваться</UIButton>
      </template>
      <template v-slot:bottom-text>
        Есть аккаунт?
        <UILink to="/auth/sign-in" font-type="inherited">
          Войти
        </UILink>
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts">
type FieldsType = {
  [key: string]: {
    value: string;
    error: boolean;
    validated: boolean;
    validate: (...value: string[]) => boolean;
  };
};
const fields = ref<FieldsType>({
  username: {
    value: '',
    error: false,
    validated: false,
    validate: (username: string) =>
      username.length >= 4 && username.length <= 16
  },
  email: {
    value: '',
    error: false,
    validated: false,
    validate: (email: string) =>
      !!String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  },
  password: {
    value: '',
    error: false,
    validated: false,
    validate: (password: string) =>
      password.length > 8 && password.length < 16
  },
  confirmPassword: {
    value: '',
    error: false,
    validated: false,
    validate: (password: string, oldPassword: string) =>
      password === oldPassword
  }
});

const validate = (fieldName: keyof FieldsType) => {
  const field = fields.value[fieldName];
  if (field.value === '') {
    field.error = false;
    field.validated = false;
    return;
  }
  if (fieldName === 'confirmPassword') {
    const res = field.validate(
      field.value,
      fields.value.password.value
    );
    if (res) {
      field.error = false;
      field.validated = true;
    } else {
      field.validated = false;
      field.error = true;
    }
    return;
  }
  const res = field.validate(field.value);
  if (res) {
    field.error = false;
    field.validated = true;
  } else {
    field.validated = false;
    field.error = true;
  }
};

const submit = async () => {
  for (const field in fields.value) {
    if (fields.value[field].validated === false) {
      return;
    }
  }
  const response = await $api.auth.signUp({
    username: fields.value.username.value,
    email: fields.value.email.value,
    password: fields.value.password.value
  });
  if ('success' in response && response.success) {
    useRouter().push(`/auth/sign-up/code`);
  }
};
</script>
<style lang="scss" scoped></style>
