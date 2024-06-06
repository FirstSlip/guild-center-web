<template>
  <div class="guilds">
    <h2 class="h4">
      <span>Гильдии</span>
      <span class="h5">{{ guilds.length }}</span>
    </h2>
    <ProfileSidebarGuildsCard
      v-for="(guild, index) in guilds"
      :key="index"
      :name="guild.name"
      :avatar-url="guild.avatar"
    />
    <p v-if="guilds.length <= 0" class="no-guilds">
      <span v-if="isMyProfile" class="p2">
        У вас еще нет гильдий
      </span>
      <span v-else class="p2">
        У этого пользователя еще нет гильдий
      </span>
      <SVGSadSmile v-if="isMyProfile" />
      <UILink v-if="isMyProfile" to="/guild/find" font-type="p2">
        Поиск
      </UILink>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { ShortGuild } from '@/ts/ShortGuild';

defineProps<{
  guilds: ShortGuild[];
  isMyProfile?: boolean;
}>();
</script>

<style lang="scss" scoped>
.guilds {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  h2.h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p.no-guilds {
    margin: 1rem 0;
    display: flex;
    gap: 0.75rem;
    flex-direction: column;
    align-items: center;

    span {
      color: $text-white-60;
      text-align: center;
    }
  }
}
</style>
