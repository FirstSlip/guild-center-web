<template>
  <div class="tools">
    <UIButton
      type="blank"
      font-type="p1"
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
  align-items: center;
  gap: 0.5rem;

  @media (max-width: $adaptive-breakpoint-normal) {
    flex-direction: column;
  }
}
</style>
