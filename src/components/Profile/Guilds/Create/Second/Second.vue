<template>
  <div class="second-step">
    <div class="title">
      <h1 class="h4">
        Какой игре или играм будет посвящена ваша гильдия?
      </h1>
      <UIInput
        fill
        placeholder="Введите название игры"
        bg-color="#5d728e"
        v-model="search"
      >
        <template #before-icon>
          <SVGSearch />
        </template>
        <template #after-text>
          {{ totalGamesSelected }}
          выбрано
        </template>
      </UIInput>
    </div>
    <div class="games">
      <transition-group name="games">
        <GuildGameCard
          v-for="(game, index) in filteredGames"
          :key="index"
          :gameName="game.name"
          :selected="game.selected"
          @click="game.selected = !game.selected"
        />
      </transition-group>
    </div>
    <div class="buttons">
      <UIButton type="primary" fill @click="next">
        Продолжить
      </UIButton>
      <UIButton type="blank" fill @click="$emit('prev')">
        Назад
      </UIButton>
      <p v-if="isError" class="error">
        Вы должны выбрать хотя бы одну игру
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gamesArray } from '@/common/data/gamesArray';

const emit = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const isError = ref(false);
const search = ref('');
const games = ref(
  gamesArray.map((game) => ({ ...game, selected: false }))
);

const model = defineModel<string[]>();
watch(
  games,
  () => {
    model.value = games.value
      .filter((game) => game.selected)
      .map((game) => game.name);
    isError.value = false;
  },
  { deep: true }
);

(model.value || []).forEach((game) => {
  const selected = games.value.find((g) => g.name === game);
  if (selected) {
    selected.selected = true;
  }
});

const totalGamesSelected = computed(() =>
  games.value.reduce((acc, game) => acc + +game.selected, 0)
);
const filteredGames = computed(() =>
  games.value.filter((game) =>
    game.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const next = () => {
  if (totalGamesSelected.value <= 0) {
    isError.value = true;
    return;
  }
  emit('next');
};
</script>

<style lang="scss" scoped>
.second-step {
  height: calc(100% - 2.5rem);
  max-height: calc(100% - 2.5rem);
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  flex-shrink: 1;

  .title {
    text-align: center;

    h1 {
      margin-bottom: 0.5rem;
    }
  }

  .games {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.125rem;

    overflow: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      border-radius: 0.375rem;
    }
  }

  .buttons {
    position: relative;
    margin: auto auto 0;
    width: 22rem;

    flex-shrink: 1;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.error {
      position: absolute;
      top: 100%;
      width: 100%;
      margin-top: 0.25rem;
      color: $red;
      text-align: center;
    }
  }
}

.games-enter-active,
.games-leave-active {
  transition: all 0.3s ease;
}
.games-enter-from,
.games-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
