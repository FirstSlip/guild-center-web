<template>
  <div class="guild-find">
    <GuildFindFilters @filter="(filt) => filter(filt)" />
    <GuildFindGuildList
      :guilds="filteredGuilds"
      v-model:search="search"
    />
  </div>
</template>

<script lang="ts" setup>
/* const guilds = useGuilds(); */
const search = ref('');

const { data: guilds } = useAsyncData('all-guilds', async () => {
  const response = await $api.guild.getAll();
  if ($api.utils.isSuccess(response)) {
    return response.data.guilds;
  }
  return [];
});

const filteredGuilds = computed(() => {
  if (!guilds.value) return [];
  const filtered = guilds.value.filter((guild) => {
    return (
      (guild.games.some((game) =>
        genres.value.some((genre) => game.genre.includes(genre))
      ) ||
        !genres.value.length) &&
      (guild.games.some((game) =>
        games.value.includes(game.name)
      ) ||
        !games.value.length) &&
      (guild.trends.some((trend) =>
        types.value.includes(trend)
      ) ||
        !types.value.length)
    );
  });
  return filtered.filter((guild) =>
    guild.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const genres: Ref<string[]> = ref([]);
const games: Ref<string[]> = ref([]);
const types: Ref<string[]> = ref([]);
const days: Ref<string[]> = ref([]);

const filter = (filter: {
  genres: string[];
  games: string[];
  types: string[];
  days: string[];
}) => {
  console.log('filter');
  genres.value = filter.genres;
  games.value = filter.games;
  types.value = filter.types;
  days.value = filter.days;
};

watch(
  () => games,
  () => {
    console.log(games.value);
  }
);
</script>

<style lang="scss" scoped>
.guild-find {
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 21.25rem minmax(0, 1fr);
}
</style>
