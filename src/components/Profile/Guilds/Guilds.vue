<template>
  <section class="guilds">
    <h1 class="h3">Гильдии</h1>
    <div class="list">
      <ProfileGuildsCard
        v-for="(guild, index) in Array(15)"
        :guild="{
          name: `Test ${index}`,
          id: 123,
          games: []
        }"
      />
    </div>
    <div class="buttons">
      <UIButton type="primary" fill transparent>
        Найти гильдию
      </UIButton>
      <UIButton type="primary" fill transparent>
        Создать гильдию
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
const guilds = ref([{}, {}]);
</script>

<style lang="scss" scoped>
.guilds {
  max-width: 53.12rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 1rem 2.5rem;

  overflow: hidden;

  background: $light-purple;

  border-radius: 0.5rem;

  h1 {
    padding: 0.5rem 0.625rem;
    border-bottom: 1px solid $white;
    margin-bottom: 1rem;
  }

  .list {
    max-height: 60dvh;
    margin-bottom: 1rem;
    display: grid;
    gap: 1.875rem 0.625rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow-y: scroll;
    overscroll-behavior: contain;
  }

  .buttons {
    display: flex;
    gap: 0.625rem;
  }
}
</style>
