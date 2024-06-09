<template>
  <div class="fourth-step">
    <div class="title">
      <h1 class="h4">
        На чем будет фокусироваться ваша гильдия?
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
      <UIButton type="primary" fill @click="next">
        Продолжить
      </UIButton>
      <UIButton type="blank" fill @click="$emit('prev')">
        Назад
      </UIButton>
      <p v-if="isError" class="error">
        Вы должны выбрать хотя бы один тип
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gameTypesArray } from '@/common/data/gameTypesArray';

const emit = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const isError = ref(false);
const gameTypes = ref(
  gameTypesArray.map((game) => ({ ...game, selected: false }))
);

const model = defineModel<string[]>();
watch(
  gameTypes,
  () => {
    model.value = gameTypes.value
      .filter((game) => game.selected)
      .map((game) => game.name);
    isError.value = false;
  },
  { deep: true }
);

(model.value || []).forEach((type) => {
  const selected = gameTypes.value.find((g) => g.name === type);
  if (selected) {
    selected.selected = true;
  }
});

let isDragging = false;
let startX: number;
let scrollLeft: number;
let velocity = 0;
let lastX: number;
let animationFrameId: number | null = null;
let lastTimestamp: number | null = null;

function startDragging(event: MouseEvent) {
  isDragging = true;
  startX =
    event.pageX -
    (event.currentTarget as HTMLElement).offsetLeft;
  scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  velocity = 0; // обнуляем скорость при начале перетаскивания
  lastX = startX;
  lastTimestamp = event.timeStamp;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}

function stopDragging(event: MouseEvent) {
  isDragging = false;
  const target = event.currentTarget as HTMLElement;
  if (Math.abs(velocity) > 0.5) {
    // применяем инерцию только если скорость больше порога
    applyInertia(target);
  }
}

function drag(event: MouseEvent) {
  if (!isDragging) return;
  event.preventDefault();
  const x =
    event.pageX -
    (event.currentTarget as HTMLElement).offsetLeft;
  const walk = (x - startX) * 0.5; // уменьшили чувствительность
  const target = event.currentTarget as HTMLElement;
  target.scrollLeft = scrollLeft - walk;

  const deltaX = x - lastX;
  const deltaTime =
    event.timeStamp - (lastTimestamp ?? event.timeStamp);
  velocity = -(deltaX / deltaTime) * 20; // вычисляем скорость
  lastX = x;
  lastTimestamp = event.timeStamp;
}

function applyInertia(target: HTMLElement) {
  const friction = 0.95; // уменьшили трение для плавности замедления
  function step() {
    if (Math.abs(velocity) > 0.5) {
      target.scrollLeft += velocity;
      velocity *= friction;
      animationFrameId = requestAnimationFrame(step);
    } else {
      animationFrameId = null;
    }
  }
  step();
}

const next = () => {
  if (model.value?.length === 0) {
    isError.value = true;
    return;
  }
  emit('next');
};
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

    cursor: grab;

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
</style>
