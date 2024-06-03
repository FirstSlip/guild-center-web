<template>
  <div class="fourth-step">
    <div class="title">
      <h1 class="h4">
        Какой игре или играм будет посвящена ваша гильдия?
      </h1>
    </div>
    <div
      class="cards-container"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove.stop="drag"
      @mouseleave="stopDragging"
    >
      <div class="cards" ref="cards">
        <GuildCreateGameTypeCard
          v-for="(gameType, index) in gameTypes"
          :key="index"
          :game-type-name="gameType.name"
          :game-type-url="`${gameType.shortName}.png`"
          :description-title="gameType.descriptionTitle"
          :description="gameType.description"
          v-model="gameType.selected"
        />
      </div>
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

const gameTypes = ref([
  {
    name: 'PvE',
    shortName: 'PVE',
    descriptionTitle: 'PvE (Игрок против Окружения)',
    description:
      'Гильдии, ориентированные на совместное прохождение подземелий, рейдов и сражениях с боссами. Основной фокус на командной работе, координации действий и достижении общих целей.',
    selected: false
  },
  {
    name: 'PvP',
    shortName: 'PVP',
    descriptionTitle: 'PvP (Игрок против Игрока)',
    description:
      'Специализация на различных видах PvP-активности, таких как арены, поля боя, войны гильдий и open-world PvP. Основной фокус на соревновательном аспекте игры, развитии навыков и достижении побед.',
    selected: false
  },
  {
    name: 'RP',
    shortName: 'RP',
    descriptionTitle: 'RP (Ролевая игра)',
    description:
      'Гильдии, ориентированные на ролевую игру. Участники вживаются в роли своих персонажей, следуют определенным правилам и взаимодействуют друг с другом, создавая уникальную атмосферу.',
    selected: false
  },
  {
    name: 'Торговля',
    shortName: 'Trade',
    descriptionTitle: 'Торговые',
    description:
      'Фокусируется на торговле, экономике и развитии внутриигрового бизнеса. Участники занимаются покупкой, продажей и обменом внутриигровых предметов.',
    selected: false
  },
  {
    name: 'Крафт',
    shortName: 'Craft',
    descriptionTitle: 'Крафт и собирательство',
    description:
      'Гильдии, специализирующиеся на сборе ресурсов и создании предметов. Участники занимаются добычей материалов, изучением рецептов и производством различных предметов, которые могут быть использованы ими самими или проданы другим игрокам.',
    selected: false
  },
  {
    name: 'Обучение',
    shortName: 'Education',
    descriptionTitle: 'Обучение и помощь новичкам',
    description:
      'Гильдии, предоставляющие помощь и поддержку новым игрокам. Участники делятся своим опытом, помогают освоиться в игре, отвечают на вопросы и проводят обучающие мероприятия.',
    selected: false
  },
  {
    name: 'Исследование',
    shortName: 'Explore',
    descriptionTitle: 'Исследование и приключения',
    description:
      'Объединение игроков, увлеченных исследованием игрового мира и поиском секретов и осуждения теорий. Участники открывают новые локации, разгадывают загадки, собирают коллекционные предметы и делятся своими открытиями с другими',
    selected: false
  },
  {
    name: 'Творчество',
    shortName: 'Creative',
    descriptionTitle: 'Творческие',
    description:
      'Фокусируется на создании контента, например: видео, скриншотов, фанфиков и рисунков. Участники делятся своими работами с сообществом, организуют конкурсы и вдохновляют друг друга на творчество',
    selected: false
  },
  {
    name: 'Киберспорт',
    shortName: 'Cybersport',
    descriptionTitle: 'Киберспортивные',
    description:
      'Гильдии, стремящиеся к участию в киберспортивных соревнованиях и турнирах. Основной фокус на тренировках, развитии командной игры и достижении высоких результатов.',
    selected: false
  }
]);

const model = defineModel<string[]>();
watch(
  gameTypes,
  () => {
    model.value = gameTypes.value
      .filter((game) => game.selected)
      .map((game) => game.name);
  },
  { deep: true }
);

let isDragging = false;
let startX: number;
let scrollLeft: number;

function startDragging(event: MouseEvent) {
  isDragging = true;
  startX =
    event.pageX - (<HTMLElement>event.currentTarget).offsetLeft;
  scrollLeft = (<HTMLElement>event.currentTarget).scrollLeft;
}

function stopDragging() {
  isDragging = false;
}

function drag(event: MouseEvent) {
  console.log(isDragging);
  if (!isDragging) return;
  event.preventDefault();
  const x =
    event.pageX - (<HTMLElement>event.currentTarget).offsetLeft;
  const walk = (x - startX) * 2;
  (<HTMLElement>event.currentTarget).scrollLeft =
    scrollLeft - walk;
}
</script>

<style lang="scss" scoped>
.fourth-step {
  height: calc(100% - 2.5rem);
  max-height: calc(100% - 2.5rem);
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;

  flex-shrink: 1;

  .title {
    text-align: center;

    h1 {
      margin-bottom: 0.5rem;
    }
  }

  .cards-container {
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .cards {
      display: flex;
      gap: 1rem;

      > * {
        flex-shrink: 0;
      }
    }
  }
}
</style>
