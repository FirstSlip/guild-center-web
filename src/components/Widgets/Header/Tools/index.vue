<template>
  <div class="tools">
    <UIButton
      transparent
      @click="useRouter().push('/auth/sign-in')"
    >
      Вход
    </UIButton>
    <UIButton @click="useRouter().push('/auth/sign-up')">
      Регистрация
    </UIButton>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.tools {
  display: flex;
  gap: 0.5rem;
}
</style>
