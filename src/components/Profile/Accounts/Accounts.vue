<template>
  <section class="accounts">
    <div class="info">
      <h2 class="h5">Добавьте игровой аккаунт!</h2>
      <p class="p3">
        Вы можете указать ссылку на свой игровой аккаунт, чтобы
        другие пользователи могли легко найти вас.
      </p>
      <UIInput placeholder="Поиск аккаунта">
        <template v-slot:before-icon>
          <SVGSearch />
        </template>
      </UIInput>
    </div>
    <div class="possible-acc">
      <img src="/img/Steam.png" alt="Steam" />
      <span class="h5">Steam</span>
      <input
        type="text"
        class="input"
        placeholder="Введите ваш SteamId"
        v-model="steamId"
      />
      <UIButton
        type="primary"
        font-type="h5"
        padding="0.25rem 1rem"
        @click="addSteam"
      >
        Добавить аккаунт
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
const steamId = ref<string>('');
const addSteam = async () => {
  if (!steamId.value) {
    return;
  }
  const response = await $api.user.addSteam(steamId.value);
  if (response) {
    console.log(response);
    window.open(response);
  }
};
</script>

<style lang="scss" scoped>
section.accounts {
  display: flex;
  flex-direction: column;
  gap: 1rem;

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

  .possible-acc {
    background: $light-purple;
    width: 100%;
    height: min-content;
    padding: 1rem;
    border-radius: 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
    }

    input.input {
      margin-left: 0.5rem;
      background: none;
      border: none;
      outline: none;

      border-bottom: 1px solid $white;
      width: 11rem;
      text-align: center;
    }

    button {
      margin-left: auto;
    }
  }
}
</style>
