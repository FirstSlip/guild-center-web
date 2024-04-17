<template>
  <section class="welcome">
    <h1 class="h2">
      Добро пожаловать на главную страницу
      <br />
      веб-сервиса "GuildCenter"
    </h1>
    <p class="p2">
      Веб-сервис создан для нахождения, создания, управления
      игровыми гильдиями
    </p>
    <div class="guild-buttons">
      <UIButton
        type="primary"
        @click="useRouter().push('/auth/sign-up')"
        transparent
      >
        Найти гильдию
      </UIButton>
      <UIButton
        type="primary"
        @click="useRouter().push('/auth/sign-up')"
      >
        Создать гильдию
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
section.welcome {
  h1 {
    text-align: center;
  }

  p {
    margin-top: 1rem;

    text-align: center;
  }

  .guild-buttons {
    width: 100%;
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    gap: 5.625rem;
  }
}
</style>
