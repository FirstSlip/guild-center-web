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
const guilds = useGuilds();
const search = ref('');

const filteredGuilds = computed(() => {
  const filtered = guilds.value.filter((guild) => {
    return (
      (guild.genres?.some((genre) =>
        genres.value.includes(genre)
      ) ||
        !genres.value.length) &&
      (guild.games.some((game) => games.value.includes(game)) ||
        !games.value.length) &&
      (guild.types.some((type) => types.value.includes(type)) ||
        !types.value.length)
    );
  });
  console.log(filtered);
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
