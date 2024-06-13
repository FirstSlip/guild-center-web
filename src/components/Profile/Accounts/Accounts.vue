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
    <nuxt-link
      class="account"
      v-for="account in finalAccounts"
      :key="account.id"
      :to="`https://steamcommunity.com/profiles/${account.id}`"
      target="_blank"
    >
      <div class="header">
        <img
          src="/img/Steam.png"
          alt="Steam"
          v-if="account.provider === 'steam'"
        />
        <p class="h4">
          {{
            account.provider.length > 0
              ? account.provider[0].toUpperCase() +
                account.provider.slice(1)
              : ''
          }}
        </p>
      </div>
      <div class="footer">
        <p class="p4">{{ account.name }}</p>
        <p class="p4">Кол-во игр: {{ account.games }}</p>
      </div>
    </nuxt-link>
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
import type { Account } from '@/ts/Account';

const props = defineProps<{
  isMyProfile?: boolean;
  accounts: Account[];
}>();

const finalAccounts = computed(() => {
  return props.accounts.filter((acc) => acc.verified);
});

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

  .account {
    width: 100%;
    background: $light-purple;
    border-radius: 0.25rem;
    overflow: hidden;
    text-decoration: none;

    .header {
      width: 100%;
      border-radius: 0.25rem;
      padding: 1rem;

      display: flex;
      gap: 1rem;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;
        min-height: 2rem;
      }
    }

    .footer {
      padding: 1rem;
      background-color: #4c5d75;

      display: flex;
      align-items: center;
      gap: 2.5rem;

      p {
        border-bottom: 1px solid $white;
        width: 7.5rem;
      }
    }
  }

  .possible-acc {
    background: $light-purple;
    width: 100%;
    height: min-content;
    padding: 1rem;
    border-radius: 0.25rem;

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
