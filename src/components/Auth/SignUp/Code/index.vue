<template>
  <div class="email-code">
    <AuthFormWrapper>
      <template v-slot:header>
        Мы отправили код активации на вашу почту!
      </template>
      <template v-slot:inputs>
        <UICodeInput fill />
      </template>
      <template v-slot:buttons>
        <UIButton fill>Продолжить</UIButton>
        <UIButton fill type="back" @click="useRouter().back()">
          Отмена
        </UIButton>
      </template>
    </AuthFormWrapper>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
