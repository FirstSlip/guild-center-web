<template>
  <div class="friends">
    <h2 class="h4">
      <span>Друзья</span>
      <span class="h5">{{ friends.length }}</span>
    </h2>
    <ProfileSidebarFriendsCard
      v-for="(friend, index) in friends"
      :key="index"
      :name="friend.username"
      :tag="friend.tag"
      :avatar-url="friend.avatar"
    />
    <p v-if="friends.length <= 0" class="no-friends">
      <span v-if="isMyProfile" class="p2">
        У вас еще нет друзей
      </span>
      <span v-else class="p2">
        У этого пользователя еще нет друзей
      </span>
      <SVGSadSmile v-if="isMyProfile" />
      <UILink
        v-if="isMyProfile"
        :to="`/profile_${id}/friends?tab=search`"
        font-type="p2"
      >
        Поиск
      </UILink>
    </p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = computed(() => route.params.id);
import type { ShortUser } from '@/ts/shortUser';

defineProps<{
  friends: ShortUser[];
  isMyProfile?: boolean;
}>();
</script>

<style lang="scss" scoped>
.friends {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  h2.h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p.no-friends {
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
