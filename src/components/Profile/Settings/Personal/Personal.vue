<template>
  <div class="settings">
    <div class="mail">
      <h2 class="h4">Электронная почта</h2>
      <p class="p2">mail</p>
    </div>
    <div class="change-password">
      <h2 class="h3">Обновить пароль</h2>
      <h3 class="h4">Текущий пароль</h3>
      <UIInputSecondary type="password" placeholder=" " fill />
      <h3 class="h4">Новый пароль</h3>
      <UIInputSecondary type="password" placeholder=" " fill />
      <h3 class="h4">Подтверждение нового пароля</h3>
      <UIInputSecondary type="password" placeholder=" " fill />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.settings {
  width: 100%;

  h2,
  h3 {
    padding: 0.5rem 0;
  }

  .mail {
    margin-bottom: 2.5rem;

    p.p2 {
      border-radius: 0.25rem;
      padding: 0.5rem;

      background-color: $gray;
    }
  }

  .change-password {
    h2.h3 {
      color: $main;
    }
  }
}
</style>
