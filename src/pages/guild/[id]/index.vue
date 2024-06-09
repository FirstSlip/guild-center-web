<template>
  <div class="guild-page">
    <div class="main-section">
      <GuildMainHeader
        :current-tab="selectedTab"
        :guild="guild"
        :guild-id="id"
      />
      <GuildMainDescription />
    </div>
    <GuildMainMembers :members="guild?.members || []" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = computed(() => route.params.id);
const selectedTab = computed(() => route.query.tab || '');

const { data: guild, refresh } = useAsyncData(
  `user_${id.value}`,
  async () => {
    const response = await $api.guild.getById(id.value);
    if ($api.utils.isSuccess(response)) {
      return response.data.guild;
    }
    return null;
  }
);

/* console.log('guild', guild.value); */

definePageMeta({ layout: 'guild' });
</script>

<style lang="scss" scoped>
.guild-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17.75rem;
  gap: 1.25rem;

  .main-section {
    width: 100%;
    height: 100%;
  }
}
</style>
