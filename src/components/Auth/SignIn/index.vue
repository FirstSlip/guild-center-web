<template>
  <div class="sign-in">
    <AuthFormWrapper type="sign-in">
      <template v-slot:inputs>
        <UIInput placeholder="Email" autocomplete="email" />
        <UIInput
          placeholder="Пароль"
          type="password"
          autocomplete="current-password"
          after-text-position="error-overflow"
          error="asd"
        >
          <template v-slot:after-text>
            <UILink to="/auth/restore-password" font-type="p4">
              Забыли пароль?
            </UILink>
          </template>
        </UIInput>
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
