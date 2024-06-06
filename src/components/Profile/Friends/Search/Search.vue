<template>
  <div class="friends-search">
    <div class="search-input">
      <UIInputWithButton
        fill
        placeholder="Вы может найти друга по его никнейму"
        v-model="search"
        @click="findUsers"
      />
    </div>
    <div class="finded-users-count">
      <span class="p1">Найденные пользователи</span>
      <span class="number p1">{{ users.length }}</span>
    </div>
    <div class="list">
      <ProfileFriendsSearchUser
        v-for="user in users"
        :key="user.tag"
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const users = ref([
  {
    tag: '1234',
    username: 'test',
    avatar: 'https://i.pravatar.cc/300'
  }
]);
const search = ref('');

const findUsers = async () => {
  if (search.value.length <= 0) {
    return;
  }
  let searchTerms: string[];
  if (search.value.includes(' #')) {
    searchTerms = search.value
      .toLowerCase()
      .split(' #')
      .filter(Boolean);
  } else if (search.value.includes('#')) {
    searchTerms = search.value
      .toLowerCase()
      .split('#')
      .filter(Boolean);
  } else {
    searchTerms = [search.value.toLowerCase()].filter(Boolean);
  }
  const username = searchTerms[0];
  const tag = searchTerms[1] || '';
  const response = await $api.user.findByUsername(username, tag);
  if ($api.utils.isSuccess(response)) {
    users.value = response.data.users;
  }
};
</script>

<style lang="scss" scoped>
.friends-search {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .search-input {
    width: 100%;
  }

  .finded-users-count {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    .number {
      color: $main;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
