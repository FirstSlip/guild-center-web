<template>
  <section class="games">
    <div class="info">
      <h2 class="h5">Добавьте игру!</h2>
      <p class="p3">
        Вы можете добавить игру в свой профиль из списка
        поддерживаемых сервисом игр.
      </p>
      <UIInput placeholder="Поиск игры" v-model="search">
        <template v-slot:before-icon>
          <SVGSearch />
        </template>
      </UIInput>
    </div>
    <div class="total-games">
      <div class="list">
        <div
          class="game"
          v-for="(game, index) in finalGames"
          :key="index"
        >
          <img
            :src="`/img/games/${game.replaceAll(' ', '_').replaceAll(':', '')}.png`"
            :alt="game"
          />
          <p class="h4">{{ game }}</p>
          <button
            v-if="isMyProfile && games.includes(game)"
            class="delete"
            @click="deleteGame(game)"
          >
            <SVGTrash />
          </button>
          <UIButton
            type="primary"
            v-else-if="isMyProfile"
            @click="addGame(game)"
          >
            Добавить
          </UIButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { gamesArray } from '@/common/data/gamesArray';

const props = defineProps<{
  games: string[];
  isMyProfile: boolean;
}>();
const emit = defineEmits<{
  (e: 'added', name: string): void;
  (e: 'deleted', name: string): void;
}>();

const search = ref('');

const finalGames = computed(() => {
  if (props.isMyProfile) {
    return gamesArray
      .map((game) => game.name)
      .filter((game) =>
        game.toLowerCase().includes(search.value.toLowerCase())
      )
      .sort((a, b) => (props.games.includes(a) ? -1 : 1));
  }
  return props.games.filter((game) =>
    game.toLowerCase().includes(search.value.toLowerCase())
  );
});

const addGame = async (name: string) => {
  const response = await $api.user.addGame(name);
  if ('success' in response && response.success) {
    emit('added', name);
  }
};
const deleteGame = async (name: string) => {
  const response = await $api.user.deleteGame(name);
  if ('success' in response && response.success) {
    emit('deleted', name);
  }
};
</script>

<style lang="scss" scoped>
section.games {
  .info {
    width: 100%;
    height: min-content;
    padding: 1rem;
    margin-bottom: 1.5rem;

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

  .total-games {
    max-height: 40dvh;
    overflow-y: auto;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .game {
        width: 100%;
        padding: 1rem;

        display: flex;
        align-items: center;
        gap: 1rem;

        background-color: $light-purple;
        border-radius: 0.25rem;

        img {
          width: 2.75rem;
          height: 2.75rem;
          min-width: 2.75rem;
          min-height: 2.75rem;
        }

        button {
          margin-left: auto;
        }

        button.delete {
          width: 2.75rem;
          height: 2.75rem;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;

          background: none;
          border: none;
          cursor: pointer;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
