<template>
  <section class="filters">
    <UIButton
      type="primary"
      transparent
      font-type="h4"
      fill
      @click="resetFilters"
    >
      Сбросить фильр
    </UIButton>
    <div class="age">
      <p class="h5">Возрастной диапазон</p>
      <UIDualRangeSlider :from="12" :to="90" />
    </div>
    <div class="genre">
      <p class="h5">Жанр</p>
      <UICheckbox
        v-for="(genre, index) in genresComputed"
        :key="index"
        v-model="genre.selected"
      >
        <template #after-text>{{ genre.name }}</template>
      </UICheckbox>
      <button
        class="show h5"
        @click="isGenresOpened = !isGenresOpened"
      >
        {{ isGenresOpened ? 'Скрыть' : 'Показать все' }}
      </button>
    </div>
    <div class="game">
      <p class="h5">Игра</p>
      <UICheckbox
        v-for="(game, index) in gamesComputed"
        :key="index"
        v-model="game.selected"
      >
        <template #after-text>{{ game.name }}</template>
      </UICheckbox>
      <button
        class="show h5"
        @click="isGamesOpened = !isGamesOpened"
      >
        {{ isGamesOpened ? 'Скрыть' : 'Показать все' }}
      </button>
    </div>
    <div class="type">
      <p class="h5">Направление</p>
      <UICheckbox
        v-for="(type, index) in typesComputed"
        :key="index"
        v-model="type.selected"
      >
        <template #after-text>{{ type.name }}</template>
      </UICheckbox>
      <button
        class="show h5"
        @click="isTypesOpened = !isTypesOpened"
      >
        {{ isTypesOpened ? 'Скрыть' : 'Показать все' }}
      </button>
    </div>
    <div class="time">
      <p class="h5">Время активности</p>
      <UIRadio v-model="everyDay">
        <template #before-text>Каждый день</template>
      </UIRadio>
      <div class="days">
        <button
          v-for="(day, index) in days"
          :key="index"
          :class="['day', 'p4', day.selected && 'active']"
          @click="day.selected = !day.selected"
        >
          {{ day.name }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (
    e: 'filter',
    filter: {
      genres: string[];
      games: string[];
      types: string[];
      days: string[];
    }
  ): void;
}>();
const isGenresOpened = ref(false);
const genres = ref([
  {
    name: 'RPG',
    selected: false
  },
  {
    name: 'MOBA',
    selected: false
  },
  {
    name: 'MMORPG',
    selected: false
  },
  {
    name: 'Action',
    selected: false
  },
  {
    name: 'Survival',
    selected: false
  },
  {
    name: 'Strategy',
    selected: false
  }
]);
const genresComputed = computed(() => {
  return isGenresOpened.value
    ? genres.value
    : genres.value.slice(0, 3);
});

const isGamesOpened = ref(false);
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
    name: 'League of Legends',
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
const gamesComputed = computed(() => {
  return isGamesOpened.value
    ? games.value
    : games.value.slice(0, 3);
});

const isTypesOpened = ref(false);
const types = ref([
  {
    name: 'PvE',
    selected: false
  },
  {
    name: 'PvP',
    selected: false
  },
  {
    name: 'RP',
    selected: false
  },
  {
    name: 'Торговля',
    selected: false
  },
  {
    name: 'Крафт',
    selected: false
  },
  {
    name: 'Обучение',
    selected: false
  },
  {
    name: 'Исследование',
    selected: false
  },
  {
    name: 'Творчество',
    selected: false
  },
  {
    name: 'Киберспорт',
    selected: false
  }
]);
const typesComputed = computed(() => {
  return isTypesOpened.value
    ? types.value
    : types.value.slice(0, 3);
});

const days = ref([
  {
    name: 'Пн',
    selected: false
  },
  {
    name: 'Вт',
    selected: false
  },
  {
    name: 'Ср',
    selected: false
  },
  {
    name: 'Чт',
    selected: false
  },
  {
    name: 'Пт',
    selected: false
  },
  {
    name: 'Сб',
    selected: false
  },
  {
    name: 'Вс',
    selected: false
  }
]);
const everyDay = ref(false);

const resetFilters = () => {
  genres.value.forEach((genre) => {
    genre.selected = false;
  });
  games.value.forEach((game) => {
    game.selected = false;
  });
  types.value.forEach((type) => {
    type.selected = false;
  });
  days.value.forEach((day) => {
    day.selected = false;
  });
  everyDay.value = false;
};

watch(
  [genres, games, types, days],
  () => {
    console.log('emit');
    emit('filter', {
      genres: genres.value
        .filter((genre) => genre.selected)
        .map((genre) => genre.name),
      games: games.value
        .filter((game) => game.selected)
        .map((game) => game.name),
      types: types.value
        .filter((type) => type.selected)
        .map((type) => type.name),
      days: days.value
        .filter((day) => day.selected)
        .map((day) => day.name)
    });
  },
  {
    deep: true
  }
);
</script>

<style lang="scss" scoped>
section.filters {
  width: 100%;
  padding: 1.25rem;
  margin-top: -1rem;
  margin-bottom: -1rem;
  background: $light-purple;

  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .age {
    margin-bottom: 0.75rem;

    p.h5 {
      margin-bottom: 0.5rem;
    }
  }

  .genre {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.h5 {
      margin-bottom: 0.25rem;
    }
  }

  .game {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.h5 {
      margin-bottom: 0.25rem;
    }
  }

  .type {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.h5 {
      margin-bottom: 0.25rem;
    }
  }

  .time {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p.h5 {
      margin-bottom: 0.25rem;
    }

    .days {
      display: flex;
      gap: 0.75rem;

      button.day {
        width: 1.875rem;
        height: 1.875rem;
        background: none;
        border: 2px solid $main;
        border-radius: 100%;

        transition: all 0.3s ease;

        cursor: pointer;
        user-select: none;

        &.active {
          background-color: $main;
          color: $text-dark;
        }
      }
    }
  }

  button.show {
    background: none;
    border: none;
    align-self: flex-start;

    color: $main;
    padding-top: 0.25rem;

    cursor: pointer;
    user-select: none;
  }
}
</style>
