<template>
  <div class="fifth-step">
    <h1 class="h4">Подтвердите создание гильдии!</h1>
    <div class="guild-preview">
      <div class="header">
        <div class="guild-avatar">
          <WidgetsAvatar
            type="Guild"
            :name="guildName"
            :avatar-url="avatarUrl"
          />
        </div>
        <h2 class="h3">{{ guildName }}</h2>
      </div>
      <div class="main">
        <div class="game-types">
          <h3 class="h4">Направления:</h3>
          <div class="types">
            <div
              v-for="(type, index) in selectedGameTypes"
              :key="index"
              :class="['tag', `c-${index}`]"
            >
              {{ type }}
            </div>
          </div>
        </div>
        <div class="games">
          <GuildGameCard
            v-for="game in selectedGames"
            :key="game"
            :gameName="game"
            :selected="false"
          />
        </div>
      </div>
    </div>
    <div class="buttons">
      <UIButton type="primary" fill @click="$emit('next')">
        Подтвердить
      </UIButton>
      <UIButton type="blank" fill @click="$emit('prev')">
        Назад
      </UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  guildName: string;
  selectedGames: string[];
  selectedGameTypes: string[];
  age: { to: number; from: number };
  avatarUrl?: string;
}>();

defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();
</script>

<style lang="scss" scoped>
.fifth-step {
  height: calc(100% - 2.5rem);
  max-height: calc(100% - 2.5rem);
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;

  flex-shrink: 1;

  .guild-preview {
    width: 100%;
    background: #303d4d;

    border: 2px solid $white;
    border-radius: 0.75rem;

    overflow: hidden;

    .header {
      width: 100%;
      padding: 1.875rem 0.5rem;
      aspect-ratio: 640 / 155;

      background-color: $header-background;

      display: flex;
      align-items: center;
      gap: 0.5rem;

      .guild-avatar {
        height: 100%;
      }
    }

    .main {
      padding: 0.5rem;

      .game-types {
        display: flex;
        gap: 0.5rem;

        .types {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .tag {
            border-radius: 0.81rem;
            padding: 0rem 0.38rem;
            background-color: #ffcd29;

            font-weight: 700;
            font-size: 0.94rem;
            line-height: 150%;
            text-align: center;

            color: black;
            height: 1.62rem;

            &.c-0 {
              background-color: #66fcf1;
            }
          }
        }
      }

      .games {
        display: flex;
        gap: 0.625rem;
      }
    }
  }
}
</style>
