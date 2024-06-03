<template>
  <section class="sidebar">
    <div class="members">
      <h2 class="h4">
        <span>Участники</span>
        <span class="h5">{{ members.length }}</span>
      </h2>
      <p class="p4">
        Администратор -
        {{ admins.length }}
      </p>
      <GuildMainMembersCard
        v-for="(admin, index) in admins"
        :key="index"
        :name="admin.name"
        :avatar-url="admin.avatarUrl"
        role="Администратор"
      />
      <div class="separator"></div>
      <p class="p4">
        Рекрут -
        {{ recruts.length }}
      </p>
      <GuildMainMembersCard
        v-for="(recrut, index) in recruts"
        :key="index"
        :name="recrut.name"
        :avatar-url="recrut.avatarUrl"
        role="Рекрут"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const members: {
  name: string;
  avatarUrl?: string;
  role: string;
}[] = [
  { name: 'Stepan00', role: 'Администратор' },
  { name: 'BelieveMePls', role: 'Администратор' },
  {
    name: 'Алексей',
    avatarUrl:
      'https://eso-hub.com/storage/uploads/user-avatars/PqUQC5gqHKXHX3jOIPhq1PAM8d7QIDwoEdT5j1KI.png',
    role: 'Рекрут'
  },
  { name: 'GITGUD', role: 'Рекрут' }
];

const admins = members.filter(
  (member) => member.role === 'Администратор'
);
const recruts = members.filter(
  (member) => member.role === 'Рекрут'
);
</script>

<style lang="scss" scoped>
section.sidebar {
  border-radius: 1rem;
  padding: 1rem 2.625rem;

  background: $background-light-purple;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .members {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    p.p4 {
      color: $text-white-60;
    }

    h2.h4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      span.h5 {
        color: $main;
      }
    }
  }

  .separator {
    width: 100%;
    height: 6px;
    background-color: $white;
    border-radius: 1rem;
    margin: 0.625rem 0;
  }
}
</style>
