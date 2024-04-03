<template>
  <div class="sign-in">
    <AuthFormWrapper type="sign-in">
      <template v-slot:inputs>
        <UIInput placeholder="Email" />
        <UIInput placeholder="Пароль" type="password" />
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
