<template>
  <section class="guilds">
    <h1 class="h3">Гильдии</h1>
    <div class="list">
      <ProfileGuildsCard
        v-for="guild in myGuilds"
        :key="guild.guildId"
        :guild="guild"
      />
    </div>
    <div class="buttons">
      <UIButton
        type="primary"
        fill
        transparent
        @click="$router.push('/guild/find')"
      >
        Найти гильдию
      </UIButton>
      <UIButton
        type="primary"
        fill
        transparent
        @click="$router.push(`/profile_${id}/guilds/create`)"
      >
        Создать гильдию
      </UIButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = computed(() => route.params.id);

const profile = useProfile().user;

const myGuilds = computed(() => profile.value?.guilds || []);
</script>

<style lang="scss" scoped>
.guilds {
  max-width: 53.12rem;
  min-height: 80dvh;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 1rem 2.5rem;

  overflow: hidden;

  background: $light-purple;

  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;

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
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .buttons {
    margin-top: auto;
    display: flex;
    gap: 0.625rem;
  }
}
</style>
