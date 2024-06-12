<template>
  <section class="accounts">
    <div class="info">
      <h2 class="h5">Добавьте игровой аккаунт!</h2>
      <p class="p3">
        Вы можете указать ссылку на свой игровой аккаунт, чтобы
        другие пользователи могли легко найти вас.
      </p>
      <UIInput placeholder="Поиск игры">
        <template v-slot:before-icon>
          <SVGSearch />
        </template>
      </UIInput>
    </div>
    <UIButton type="primary" fill @click="addSteam">
      Добавить аккаунт
    </UIButton>
  </section>
</template>

<script lang="ts" setup>
const addSteam = async () => {
  const response = await $api.user.addSteam();
};
</script>

<style lang="scss" scoped>
section.accounts {
  .info {
    width: 100%;
    height: min-content;
    padding: 1rem;

    background-color: $background-light-purple;

    border-radius: 1rem;

    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 0.25rem;
    }

    p {
      margin-bottom: 1rem;
    }
  }
}
</style>
