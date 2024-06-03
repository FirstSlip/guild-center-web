<template>
  <div class="card">
    <div class="image">
      <img
        :src="`/img/game_type/${gameTypeUrl}`"
        :alt="gameTypeName"
        draggable="false"
      />
    </div>
    <transition name="info">
      <div class="info-section" v-if="infoVisible">
        <h2 class="h4">{{ descriptionTitle }}</h2>
        <p class="h5">{{ description }}</p>
      </div>
    </transition>
    <div class="name">
      <h2 class="h1">{{ gameTypeName }}</h2>
      <button
        class="info"
        @click="infoVisible = !infoVisible"
        @mousedown.stop
      >
        <SVGInfo />
      </button>
      <UICheckbox v-model="selected" @mousedown.stop />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  gameTypeName: string;
  gameTypeUrl: string;
  descriptionTitle: string;
  description: string;
}>();

const infoVisible = ref(false);
const selected = defineModel<boolean>({ default: false });
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  z-index: 1;
  width: 90%;
  aspect-ratio: 640 / 440;

  border: 1px solid white;
  border-radius: 0.25rem;
  overflow: hidden;
  background: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  user-select: none;

  .image {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    z-index: -1;
    /* height: 100%; */

    overflow: hidden;
    img {
      width: 100%;
      height: 100%;

      /* object-fit: cover; */
      object-fit: scale-down;

      user-select: none;
    }
  }

  .info-section {
    width: 100%;
    height: 100%;
    padding: 1.25rem;

    background: rgba(48, 61, 77, 0.8);

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.625rem;
  }

  .name {
    margin-top: auto;
    width: 100%;
    padding: 0.375rem 1.25rem 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    flex-shrink: 1;
    background: #303d4d;

    button.info {
      background: none;
      border: none;

      padding: 0.675rem;
      margin-right: auto;
      margin-top: -2rem;

      cursor: pointer;
    }
  }
}

.info-enter-active,
.info-leave-active {
  transition: opacity 0.3s ease;
}
.info-enter-from,
.info-leave-to {
  opacity: 0;
}
</style>
