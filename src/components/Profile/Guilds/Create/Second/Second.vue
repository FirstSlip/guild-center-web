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
      <UIButton type="primary" fill @click="$emit('next')">
        Продолжить
      </UIButton>
      <UIButton type="blank" fill @click="$emit('prev')">
        Назад
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const search = ref('');
const games = ref([
  {
    name: 'World of Warcraft',
    selected: false
  },
  {
    name: 'Final Fantasy XIV',
    selected: false
  },
  {
    name: 'Lost Ark',
    selected: false
  },
  {
    name: 'Black Desert',
    selected: false
  },
  {
    name: 'Dota 2',
    selected: false
  },
  {
    name: 'League of Legends',
    selected: false
  },
  {
    name: 'Smite',
    selected: false
  },
  {
    name: 'Destiny 2',
    selected: false
  },
  {
    name: 'Warframe',
    selected: false
  },
  {
    name: 'Escape from Tarkov',
    selected: false
  }
]);

const model = defineModel<string[]>();
watch(
  games,
  () => {
    model.value = games.value
      .filter((game) => game.selected)
      .map((game) => game.name);
  },
  { deep: true }
);
const totalGamesSelected = computed(() =>
  games.value.reduce((acc, game) => acc + +game.selected, 0)
);
const filteredGames = computed(() =>
  games.value.filter((game) =>
    game.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
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
    margin: auto auto 0;
    width: 22rem;

    flex-shrink: 1;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
