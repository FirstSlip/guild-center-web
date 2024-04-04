<template>
  <div class="sign-in">
    <AuthFormWrapper type="sign-up">
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
      username.length > 8 && username.length < 16
  },
  email: {
    value: '',
    error: false,
    validated: false,
    validate: (email: string) =>
      !!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
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
console.log(fields.value);
watch(fields, () => {
  console.log(fields.value);
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
</script>
<style lang="scss" scoped></style>
