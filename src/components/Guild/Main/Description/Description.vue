<template>
  <section class="description">
    <div class="games-types">
      <div class="games">
        <p class="h4">
          <span>Игры:</span>
          <img
            v-for="(game, index) in currentGuild?.games || []"
            :key="index"
            :src="`/img/games/${game.replaceAll(' ', '_')}.png`"
            :alt="game"
          />
        </p>
        <UIButton>Изменить</UIButton>
      </div>
      <div class="types">
        <p class="h4">
          <span class="title">Направления:</span>
          <span
            v-for="(type, index) in currentGuild?.types || []"
            :key="index"
            class="tag p2"
          >
            {{ type }}
          </span>
        </p>
      </div>
    </div>
    <div class="guild-description">
      <div class="info">
        <SVGEdit />
      </div>
      <div class="field h4">Описание гильдии!</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();

const currentGuildId = computed(
  () => Number(route.params.id) || null
);

const currentGuild = computed(() => {
  const guilds = useGuilds().value;
  console.log(guilds.map((guild) => guild.id));
  return guilds.find(
    (guild) => guild.id === currentGuildId.value
  );
});
</script>

<style lang="scss" scoped>
section.description {
  width: 100%;

  .games-types {
    width: 100%;
    margin-top: 1.875rem;
    padding: 0.5rem 1rem;

    background: $light-purple;
    border-radius: 0.81rem;

    .games {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0.5rem 0;
      border-bottom: 1px solid $line-light;

      p.h4 {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        span {
          margin-right: 0.25rem;
        }

        img {
          width: 4rem;
          height: 4rem;
        }
      }
    }

    .types {
      padding: 0.5rem 0;

      p.h4 {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        span.title {
          margin-right: 0.25rem;
        }

        span.tag {
          padding: 0.125rem 0.5rem;
          background-color: $main;

          border-radius: 0.81rem;
          color: $text-dark;
        }
      }
    }
  }

  .guild-description {
    width: 100%;
    margin-top: 1.875rem;
    padding: 0.5rem 1rem;

    background: $light-purple;
    border-radius: 0.81rem;

    .info {
      padding: 1rem 0;
      display: flex;
      justify-content: flex-end;
    }

    .field {
      border: 1px solid $white;
      border-radius: 0 0 0.25rem 0.25rem;
      padding: 1rem;
    }
  }
}
</style>
